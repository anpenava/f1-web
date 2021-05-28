import Controller from "@ember/controller";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

/**
 * @public
 *
 * @class BaseController
 * @extends Controller
 *
 * @since 1.0.0
 */
export default Controller.extend({
  /**
   * @protected
   * @return {WebsiteService}
   *
   * @since 1.22.0
   */
  website: service(),

  /**
   * @protected
   * @return {Transition[]}
   *
   * @since 1.0.0
   */
  get scrollTransitions() {
    return this.website.scrollTransitions;
  },

  /**
   * @protected
   * @type {String}
   *
   * @since 1.0.0
   */
  classAlignColumn: "text--left",

  /**
   * @protected
   * @type {String}
   *
   * @since 1.0.0
   */
  classColOrder1: "",

  /**
   * @protected
   * @type {String}
   *
   * @since 1.0.0
   */
  classColOrder2: "",

  /**
   * @protected
   * @type {String}
   *
   * @since 1.0.0
   */
  destinationUrl: "login"
});
