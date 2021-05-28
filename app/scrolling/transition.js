import ScrollObject from "./object";
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
  transform: null,

  /**
   * @protected
   *
   * @return {ScrollMagic.Scene}
   *
   * @since 1.0.0
   */
  buildScene() {
    const scene = this._super(...arguments);
    const element = document.querySelector(this.element);

    scene.setTween(element, 1, this.transform);

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

    if (element && this.transform) {
      const keys = A(Object.keys(this.transform));
      keys.forEach((key) => (element.style[key] = ""));
    }
  },
});
