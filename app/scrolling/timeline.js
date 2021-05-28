import ScrollObject from './object';
import { A } from "@ember/array";

/**
 * @public
 *
 * @class Transition
 * @extends ScrollObject
 *
 * @since 1.0.0
 */
export default ScrollObject.extend({
  /**
   * @public
   * @type {Object}
   *
   * @since 1.0.0
   */
  fromTransform: null,

  /**
   * @public
   * @type {Object}
   *
   * @since 1.0.0
   */
  toTransform: null,

  /**
   * @protected
   *
   * @return {ScrollMagic.Scene}
   *
   * @since 1.0.0
   */
  buildScene() {
    const scene = this._super(...arguments);
    const from = TweenLite.fromTo(this.element, 1, this.fromTransform, this.toTransform);

    scene.setTween(from);

    return scene;
  },

  /**
   * @public
   *
   * @since 1.0.0
   */
  destroy() {
    this._super(...arguments);

    const element = document.querySelector(this.element);

    if (element && this.fromTransform.css && this.toTransform.css) {
      const keys = A(Object.keys(this.fromTransform.css)).pushObjects(Object.keys(this.toTransform.css));
      keys.forEach(key => element.style[key] = "");
    }
  }
});
