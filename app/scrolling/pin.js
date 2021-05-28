import ScrollObject from "./object";

/**
 * @public
 *
 * @class Pin
 * @extends ScrollObject
 *
 * @since 1.0.0
 */
export default ScrollObject.extend({
  /**
   * @public
   * @type {String}
   *
   * @since 1.0.0
   */
  className: null,

  /**
   * @public
   * @type {Object}
   *
   * @since 1.0.0
   */
  options: null,

  /**
   * @protected
   *
   * @return {Object}
   *
   * @since 1.0.0
   */
  buildScene() {
    const scene = this._super(...arguments);
    const element = document.querySelector(this.element);
    const options = this.options || {
      spacerClass: this.className,
    };

    scene.setPin(element, options);

    return scene;
  },
});
