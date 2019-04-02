import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('board',{path:'/'});
  this.route('view-board',{path:'/view-board/:board_id'});
});

export default Router;
