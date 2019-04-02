import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
  actions: {
    addComment(cardComment) {
      if (!Ember.isEmpty(cardComment)) {
        let card = this.get('card');
        let comment = {};
        comment.content = cardComment.slice(0);
        comment.commented_on = (new Date()).toDateString();
        if(Ember.isEmpty(card.comments)){
          Ember.set(card,'comments',[comment]);
        }else{
          card.comments.pushObject(comment);
        }
        this.sendAction('cardUpdateAction', card);
      }
      this.set('cardComment', '');
    },
    editCard(title, value) {
      let card = this.get('card');
      this.set('newListName', card.cardTitle);
      this.set('newDesc', card.cardDesc);
      this.set('isEdit' + title, value);
    },
    updateCard(title, value) {
      let card = this.get('card');
      Ember.set(card, title, value);
      this.sendAction('cardUpdateAction', card);
    },
  }
});
