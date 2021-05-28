import Mixin from '@ember/object/mixin';

/**
 * @public
 * @mixin ScrollableComponent
 *
 * @since 1.0.0
 */
export default Mixin.create({
  /**
   * @protected
   *
   * @since 1.0.0
   */
  init() {
    this._super(...arguments);
    this.registerScrollable?.(this);
  },

  /**
   * @public
   *
   * @since 1.0.0
   */
  scrollToTop() {
    if (this.element) {
      this.element.scrollTop = 0;
      this.element.scrollLeft = 0;
    }
  },
});
