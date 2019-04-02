import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
  isEdit: false,
  actions: {
    createCard(cardTitle, cardDesc, cardComment) {
      let card = {};
      card.cardId = Ember.isEmpty(this.get('list.cards')) ? 0 : this.get('list.cards').length;
      card.cardTitle = cardTitle;
      card.cardDesc = cardDesc;
      if (!Ember.isEmpty(cardComment)) {
        let comment = {};
        comment.content = cardComment;
        comment.commented_on = (new Date()).toDateString();
        card.comments = [comment];
      }
      let list = this.get('list');
      if (Ember.isEmpty(list.cards)) {
        list.cards = [card];
      } else {
        list.cards.pushObject(card);
      }
      this.sendAction('updateListAction', list, this.get('boardId'));
    },
    cardUpdateAction(newCard) {
      let list = this.get('list');
      list.cards.filterBy('cardId', newCard.cardId).forEach(function(card) {
        card = newCard;
      });
      this.sendAction('updateListAction', list, this.get('boardId'));
    },
    deleteCard(card, list) {
      list.cards.removeObject(card);
      list.cards.forEach(function(card, index) {
        Ember.set(card,'cardId',index);
      })
      this.sendAction('updateListAction', list, this.get('boardId'));
    },
    listUpdate(newListName, list) {
      this.set('isEdit', false);
      Ember.set(list, 'name', newListName);
      this.sendAction('updateListAction', list, this.get('boardId'));
    },
    listUpdateCards(list) {
      this.sendAction('updateListAction', list, this.get('boardId'));
    },
    editList(val) {
      this.set('isEdit', val);
    },
    deleteList(list) {
      this.sendAction('deleteListAction', list, this.get('boardId'));
    },
  }
});
