import EmberRouter from '@ember/routing/router';
import { mount } from '@playon/web-framework/routing';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  mount(this, config.WEB.router.routes);
  this.route('404', { path: '/*path' });
});
