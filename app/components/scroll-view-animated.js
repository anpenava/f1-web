import Component from '@ember/component';
import { Modifiable, Scrollable, Themeable } from '../mixins/components';
import { next } from "@ember/runloop";
import { A } from "@ember/array";
import { observer } from "@ember/object";
import { flatten } from "../array";
import "../scrolling/animation.gsap";
import ScrollMagic from "scrollmagic";

/**
 * @public
 *
 * @class ScrollViewAnimated
 * @extends Component
 * @mixes Modifiable
 * @mixes Scrollable
 * @mixes Themeable
 *
 * @since 1.0.0
 */
export default Component.extend(Modifiable, Scrollable, Themeable, {
  /**
   * @protected
   * @type {String[]}
   *
   * @since 1.0.0
   */
  classNames: ["scroll-view"],

  /**
   * @public
   * @type {Array}
   *
   * @since 1.0.0
   */
  transitions: null,

  /**
   * @public
   * @type {Array}
   *
   * @since 1.0.0
   */
  pins: null,

  /**
   * @private
   * @type {Array}
   *
   * @since 1.0.0
   */
  scrollElements: null,

  /**
   * @public
   * @type {Number}
   *
   * @since 1.0.0
   */
  bottomOffset: 300,

  /**
   * @private
   * @type {ScrollMagic.Controller}
   *
   * @since 1.0.0
   */
  scrollController: null,

  /**
   * @public
   * @callback onReachTheBottom
   *
   * @since 1.0.0
   */

  /**
   * @protected
   *
   * @since 1.0.0
   */
  didUpdateScrollElements: observer("transitions", "pins", function () {
    this.removeScenes();
    this.setupScenes();
  }),

  /**
   * @public
   *
   * @since 1.0.0
   */
  refresh() {
    this.onReachTheBottomScene.update();
  },

  /**
   * @public
   *
   * @since 1.0.0
   */
  updateScenes() {
    this.removeScenes(true);
    this.setupScenes();
  },

  /**
   * @private
   *
   * @since 1.0.0
   */
  setupScenes() {
    next(() => {
      this.scrollToTop();

      this.scrollElements = A(flatten(this.transitions)).pushObjects(flatten(this.pins));

      this.scrollController = new ScrollMagic.Controller({ container: this.element });
      this.addScrollListeners();

      if (this.scrollElements.length) {
        this.scrollElements.invoke("attachTo", this.scrollController, this.element.scrollHeight - this.element.clientHeight);
      }
    });
  },

  /**
   * @private
   *
   * @param {Boolean} destroy
   *
   * @since 1.0.0
   */
  removeScenes(destroy = false) {
    if (this.scrollElements && this.scrollElements.length) {
      const scenes = this.scrollElements.getEach("scrollMagicScene");
      this.scrollController.removeScene(scenes);

      if (destroy) {
        this.scrollElements.invoke("destroy");
      }

      this.scrollElements = null;
    }
  },

  /**
   * @protected
   *
   * @since 1.0.0
   */
  didInsertElement() {
    this._super(...arguments);
    this.setupScenes();
  },

  /**
   * @protected
   *
   * @since 1.0.0
   */
  willDestroyElement() {
    this._super(...arguments);

    if (this.scrollController) {
      this.scrollController.destroy(true);
      this.scrollController = null;
    }

    if (this.scrollElements) {
      this.scrollElements.invoke("destroy");
      this.scrollElements = null;
    }
  },

  /**
   * @private
   *
   * @since 1.0.0
   */
  addScrollListeners() {
    if (this.onReachTheBottom) {
      const sceneOptions =  {
        //offset: -this.bottomOffset, // TODO ?
        triggerElement: this.element.querySelector(".scroll-view__bottom"),
        triggerHook: "onEnter"
      };

      this.onReachTheBottomScene = new ScrollMagic.Scene(sceneOptions).on("enter", event => {
        this.onReachTheBottom?.(this, event);
      });

      this.scrollController.addScene(this.onReachTheBottomScene);
    }
  },
});
