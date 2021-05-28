import Mixin from "@ember/object/mixin";
import { bool } from "@ember/object/computed";

/**
 * @public
 * @mixin Themeable
 *
 * @since 1.0.0
 */
export default Mixin.create({
  /**
   * @protected
   * @type {Array}
   *
   * @since 1.0.0
   */
  modifierNameBindings: ["theme:theme-*", "themed"],

  /**
   * @public
   * @type {String}
   *
   * @since 1.0.0
   */
  theme: null,

  /**
   * @public
   * @readonly
   * @type {Boolean}
   *
   * @since 1.0.0
   */
  themed: bool("theme"),
});
