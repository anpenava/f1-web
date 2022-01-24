import Service from '@playon/web-framework/services/website';
import { get } from '@ember/object';
import { Transition } from '@playon/web-framework/scrolling';

/**
 * @public
 *
 * @class WebsiteService
 * @extends Service
 *
 * @since 1.22.0
 */
class WebsiteService extends Service {
  /**
   * @protected
   * @return {Transition[]}
   *
   * @since 1.22.0
   */
  get scrollTransitions() {
    return [
      Transition.create({
        element: '.app-bar--top',
        transform: {
          backgroundColor: get(this, 'web.theme.navigationBarBackground'),
        }, // TODO
        duration: 300,
      }),

      Transition.create({
        element: '.app-bar--top .app-bar__item--signup',
        transform: { opacity: 0.0, width: '0px' },
        duration: 250,
        offset: 300,
      }),

      Transition.create({
        element: '.app-bar--top .app-bar__signup-form',
        transform: { opacity: 1.0, width: '342px' },
        duration: 250,
        offset: 300,
      }),
    ];
  }
}

export default WebsiteService;
