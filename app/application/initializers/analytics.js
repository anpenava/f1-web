/* global fbq, gtag, hj */

import AppInitializer from '@playon/web-framework/application/initializer';
import { inject as service } from '@ember/service';

/**
 * @public
 *
 * @class AnalyticsAppInitializer
 * @extends AppInitializer
 *
 * @since 1.0.0
 */
export default class AnalyticsAppInitializer extends AppInitializer {
  /**
   * @private
   * @type {AnalyticsService}
   *
   * @since 1.0.0
   */
  @service analytics;

  /**
   * @private
   * @type {RouterService}
   *
   * @since 1.0.0
   */
  @service router;

  /**
   * @private
   * @type {RadioService}
   *
   * @since 1.0.0
   */
  @service radio;

  /**
   * @protected
   *
   * @since 1.0.0
   */
  initialize() {
    if (this.application.environment === 'production') {
      // Each page view
      this.router.on('routeDidChange', this, 'routeDidChange');

      // Active optimize experiment
      this.radio.on('optimizeActivationEvent', this, 'optimizeActivationEvent');

      // Before user redirected to auth page
      this.radio.on('auth:redirect-to', this, 'authWillRedirectUser');
    }

    return super.initialize();
  }

  /**
   * @private
   *
   * @since 1.0.0
   */
  routeDidChange() {
    this.analytics.sendPageView();
  }

  /**
   * @private
   *
   * @since 1.0.0
   */
  optimizeActivationEvent() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'optimize.activate' });
  }

  /**
   * @private
   *
   * @since 1.0.0
   */
  authWillRedirectUser(type) {
    this.analytics.sendEvent('auth', 'user-redirected', type);
  }

  /**
   * @private
   */
  hj() {
    if ('hj' in window) {
      hj(...arguments);
    }
  }

  /**
   * @private
   */
  fbq() {
    if ('fbq' in window) {
      fbq(...arguments);
    }
  }

  /**
   * @private
   */
  gtag() {
    if ('gtag' in window) {
      gtag(...arguments);
    }
  }
}
