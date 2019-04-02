import DS from 'ember-data';

export default DS.Model.extend({
  boardId:DS.attr('number'),
  name:DS.attr('string'),
  lists:DS.attr()
});
