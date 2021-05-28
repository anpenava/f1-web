import Mixin from '@ember/object/mixin';
import { computed, defineProperty } from '@ember/object';
import { isBlank, isEmpty, typeOf } from '@ember/utils';
import { alias } from '@ember/object/computed';
import { dasherize } from '@ember/string';

/**
 * @public
 * @mixin Modifiable
 *
 * @since 1.0.0
 */
export default Mixin.create({
  /**
   * @protected
   * @since 1.0.0
   * @type {string[]}
   */
  concatenatedProperties: ["classNameBindings", "modifierNames", "modifierNameBindings"],

  /**
   * @protected
   * @since 1.0.0
   * @type {string[]}
   */
  classNameBindings: ["classNamesFromModifierNames", "classNamesFromModifier"],

  /**
   * @protected
   * @type {String}
   *
   * @since 1.0.0
   */
  mainClassName: computed("classNames", {
    get() {
      return this.customMainClassName || this.firstClassName();
    },

    set(key, value) {
      this.customMainClassName = value;
      return value;
    }
  }),

  /**
   * @private
   * @type {String}
   *
   * @since 1.0.0
   */
  customMainClassName: null,

  /**
   * @protected
   * @since 1.0.0
   * @type {String[]}
   */
  modifierNames: [],

  /**
   * @protected
   * @since 1.0.0
   * @type {string[]}
   */
  modifierNameBindings: [],

  /**
   * @protected
   * @since 1.0.0
   * @type {String}
   */
  allModifiers: computed("modifiers", "nestedModifiers", function () {
    return [this.modifiers, this.nestedModifiers].compact().join(" ").trim();
  }),

  /**
   * @public
   * @since 1.0.0
   * @type {String}
   */
  nestedModifiers: "",

  /**
   * @public
   * @since 1.0.0
   * @type {String}
   */
  modifiers: alias("modifier"),

  /**
   * @public
   * @since 1.0.0
   * @type {String}
   */
  modifier: "",

  /**
   * @protected
   * @since 1.0.0
   * @type {String}
   */
  classNamesFromModifierNames: computed("mainClassName", "modifierNames.[]", function () {
    const className = this.get("mainClassName");
    const modifiers = this.get("modifierNames");

    return modifiers.reduce((previous, item) => previous + className + "--" + item + " ", "").trim();
  }),

  /**
   * @protected
   * @since 1.0.0
   * @type {String}
   */
  classNamesFromModifier: computed("mainClassName", "allModifiers", function () {
    const className = this.get("mainClassName");
    let modifiers = this.get("allModifiers");

    if (!isBlank(modifiers)) {
      modifiers = modifiers.trim().split(" ");
      return modifiers.reduce((previous, item) => previous + className + "--" + item + " ", "").trim();
    }

    return "";
  }),

  /**
   * @protected
   * @since 1.0.0
   */
  init() {
    this._super(...arguments);
    this.modifierNameBindingsToClassNameBindings();
  },

  /**
   * @private
   *
   * @return {String}
   * @throws Error
   *
   * @since 1.0.0
   */
  firstClassName() {
    const classes = this.get("classNames");

    if (classes && classes.length > 0) {
      return classes[0];
    }

    throw new Error("Your component must have at least a className in your classNames or you must set a mainClassName.");
  },

  /**
   * @private
   * @since 1.0.0
   */
  modifierNameBindingsToClassNameBindings() {
    const modifierNameBindings = this.get("modifierNameBindings");
    const classNameBindings = [];

    this.get("classNameBindings").forEach(item => classNameBindings.push(item));

    if (modifierNameBindings && modifierNameBindings.length > 0) {
      modifierNameBindings.forEach((binding) => {
        binding = binding.split(":");
        const property = `${binding[0].replace(/\./g, "_")}Modifier`;

        defineProperty(this, property, computed(binding[0], {
          get: () => this.modifierBindingToClassName(binding)
        }));

        classNameBindings.push(property);
      });
    }

    this.set("classNameBindings", classNameBindings);
  },

  /**
   * @private
   *
   * @param {Array} binding
   * @return {String}
   *
   * @since 1.0.0
   */
  modifierBindingToClassName(binding) {
    const mainClassName = this.get("mainClassName");
    let className = "";
    const property = binding[0];
    const value = this.get(property);

    if (!isEmpty(value) && value !== false) {
      const modifier = this.modifierFromBindingParts(binding, value, 1);
      className = this.generateModifierClassName(modifier, property, value);
    } else {
      className = this.modifierFromBindingParts(binding, value, 2);
    }

    return className ? mainClassName + "--" + className : null;
  },

  /**
   * @private
   *
   * @param {String} modifier
   * @param {String} property
   * @param {*} value
   *
   * @return {String}
   *
   * @since 1.0.0
   */
  generateModifierClassName(modifier, property, value) {
    const type = typeOf(value);
    let className = modifier;

    if (!className) {
      if (value === true) {
        const parts = property.split(".");
        className = dasherize(parts.pop());
      } else if (type === "number") {
        const parts = property.split(".");
        className = dasherize(parts.pop()) + "-" + value;
      } else {
        className = value;
      }
    }

    return className;
  },

  /**
   * @private
   *
   * @param {String[]} parts
   * @param {*} value
   * @param {Number} index
   *
   * @return {String|Boolean}
   *
   * @since 1.0.0
   */
  modifierFromBindingParts(parts, value, index) {
    return (parts.length > index) ? parts[index].replace("*", value) : false;
  }
});
