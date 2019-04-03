import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('board', params.board_id);
  },
  afterModel() {
    let self = this;
    Ember.run.schedule('afterRender', this, function() {
      var nestedSortables = [].slice.call(document.querySelectorAll('.nested-sortable'));
      for (var i = 0; i < nestedSortables.length; i++) {
        new Sortable(nestedSortables[i], {
          group: 'nested',
          handle: '.move-card',
          draggable: '.handle-card',
          animation: 150,
          onAdd: function(event) {
            let toDataSet = event.to.dataset;
            let dataSet = event.item.dataset;
            self.store.findRecord('board', event.item.dataset.boardid).then(function(board) {
              let cardId = event.item.dataset.cardid;
              let lists = board.get('lists');
              let card = lists.findBy('listId', parseInt(dataSet.listid)).cards.findBy('cardId', parseInt(cardId));
              lists.findBy('listId', parseInt(dataSet.listid)).cards.removeObject(card);
              if (Ember.isEmpty(lists.findBy('listId', parseInt(toDataSet.listid)).cards)) {
                Ember.set(lists.findBy('listId', parseInt(toDataSet.listid)),'cards',[card]);
              } else {
                lists.findBy('listId', parseInt(toDataSet.listid)).cards.push(card);
              }
              lists.forEach(function(list) {
                if ((list.listId == dataSet.listid || list.listId == toDataSet.listid) && !Ember.isEmpty(list.cards)) {
                  list.cards.forEach(function(card, index) {
                    Ember.set(card, 'cardId', index);
                  });
                }
              });
              board.set('lists', lists);
              board.save();
            });
          },
          onUpdate: function(event) {
            self.onUpdate(event);
          }
        });
      }
      var boardList = [].slice.call(document.querySelectorAll('.board-list'));
      for (var i = 0; i < boardList.length; i++) {
        new Sortable(boardList[i], {
          draggable: '.handleList',
          handle: '.move-list',
          animation: 150,
          onUpdate: function(event) {
            self.onUpdate(event);
          }
        });
      }
    });
  },
  onUpdate(event) {
    let self = this;
    self.store.findRecord('board', event.item.dataset.boardid).then(function(board) {
      let lists = board.get('lists');
      if (Ember.isEmpty(event.item.dataset.cardid)) {
        lists.forEach(function(list) {
          if (list.listId == event.oldIndex) {
            Ember.set(list, 'listId', event.newIndex);
          } else if (event.newIndex > event.oldIndex && list.listId <= event.newIndex && list.listId > event.oldIndex) {
            Ember.set(list, 'listId', parseInt(list.listId) - 1);
          } else if (event.newIndex < event.oldIndex && list.listId >= event.newIndex && list.listId < event.oldIndex) {
            Ember.set(list, 'listId', parseInt(list.listId) + 1);
          }
        });
        self.sort(lists, "listId");
      } else {
        lists.filterBy('listId', parseInt(event.item.dataset.listid)).forEach(function(list) {
          list.cards.forEach(function(card) {
            if (event.oldIndex == card.cardId) {
              Ember.set(card, 'cardId', event.newIndex);
            } else if (event.newIndex > event.oldIndex && card.cardId <= event.newIndex && card.cardId > event.oldIndex) {
              Ember.set(card, 'cardId', parseInt(card.cardId) - 1);
            } else if (event.newIndex < event.oldIndex && card.cardId >= event.newIndex && card.cardId < event.oldIndex) {
              Ember.set(card, 'cardId', parseInt(card.cardId) + 1);
            }
          });
          self.sort(list.cards, "cardId");
        });
      }
      board.set('lists', lists);
      board.save();
    });
  },
  sort(array, element) {
    array.sort(function(a, b) {
      return b[element] - a[element]
    });
  },
  actions: {
    createList(newListName, boardId) {
      let list = {};
      list.name = newListName;
      list.cards = [];
      let self=this;
      this.store.findRecord('board', boardId).then(function(board) {
        let lists = board.get('lists')
        if (Ember.isEmpty(board.get('lists'))) {
          list.listId = 0;
          lists = [list];
        } else {
          list.listId = board.get('lists').length;
          lists.push(list);
        }
        self.sort(lists,"listId");
        board.set('lists', lists);
        board.save();
      });
    },
    deleteListAction(deleteList, boardId) {
      this.store.findRecord('board', boardId).then(function(board) {
        let boardList = board.get('lists');
        boardList.removeObject(deleteList);
        boardList.forEach(function(list, index) {
          Ember.set(list, 'listId', index);
        });
        board.set('lists', boardList);
        board.save();
      });
    },
    updateListAction(newList, boardId) {
      this.store.findRecord('board', boardId).then(function(board) {
        board.get('lists').filterBy('listId', newList.listId).forEach(function(list) {
          list = newList;
        });
        board.save();
      });
    },
  }
});
