import "./animation.gsap";
import EmberObject from "@ember/object";
import ScrollMagic from "scrollmagic";

/**
 * @package
 * @abstract
 *
 * @class ScrollObject
 * @extends EmberObject
 *
 * @since 1.0.0
 */
export default EmberObject.extend({
  /**
   * @public
   * @type {String}
   *
   * @since 1.0.0
   */
  element: null,

  /**
   * @public
   * @type {Number}
   *
   * @since 1.0.0
   */
  duration: 0,

  /**
   * @public
   * @type {Number}
   *
   * @since 1.0.0
   */
  offset: 0,

  /**
   * @public
   * @type {Object}
   *
   * @since 1.0.0
   */
  scene: null,

  /**
   * @package
   * @type {ScrollMagic.Scene}
   *
   * @since 1.0.0
   */
  scrollMagicScene: null,

  /**
   * @package
   *
   * @return {ScrollMagic.Scene}
   *
   * @since 1.0.0
   */
  buildScene() {
    const scene = this.scene || {
      duration: this.duration,
      offset: this.offset,
    };

    this.scrollMagicScene = new ScrollMagic.Scene(scene);

    return this.scrollMagicScene;
  },

  /**
   * @package
   *
   * @param {ScrollMagic.Controller} controller
   * @param {Number} scrollOffset
   *
   * @since 1.0.0
   */
  attachTo(controller, scrollOffset) {
    if (scrollOffset >= this.duration) {
      controller.addScene(this.buildScene());
    }
  },

  /**
   * @package
   *
   * @param {ScrollMagic.Controller} controller
   *
   * @since 1.0.0
   */
  removeFrom(controller) {
    if (this.scrollMagicScene) {
      controller.removeScene(this.scrollMagicScene);
      this.scrollMagicScene = null;
    }
  },
});
