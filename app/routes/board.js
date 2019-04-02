import Ember from 'ember';
import Route from '@ember/routing/route';

export default Route.extend({
  model:function(){
    return this.store.findAll('board');
  },
  actions:{
    createBoard(newListName){
      if(!Ember.isEmpty(newListName)){
        let board={};
        board.boardId=this.modelFor('board').get('length');
        board.name=newListName.slice(0);
        board.lists=[];
        let newBoard=this.store.createRecord('board',board);
        newBoard.save();
        this.controller.set('newBoardName','');
      }
    },
    viewBoard(boardId){
      this.transitionTo('view-board', boardId);
    }
  }
});
