'use strict';



;define("f1-web/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("f1-web/app", ["exports", "ember-resolver", "ember-load-initializers", "f1-web/config/environment"], function (_exports, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends Ember.Application {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("f1-web/array/index", ["exports", "lodash-es"], function (_exports, _lodashEs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "flatten", {
    enumerable: true,
    get: function () {
      return _lodashEs.flatten;
    }
  });
});
;define("f1-web/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
});
;define("f1-web/components/scroll-view-animated", ["exports", "f1-web/mixins/components", "f1-web/array", "f1-web/scrolling/animation.gsap", "scrollmagic"], function (_exports, _components, _array, _animation, _scrollmagic) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

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
  var _default = Ember.Component.extend(_components.Modifiable, _components.Scrollable, _components.Themeable, {
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
    didUpdateScrollElements: Ember.observer("transitions", "pins", function () {
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
      Ember.run.next(() => {
        this.scrollToTop();
        this.scrollElements = Ember.A((0, _array.flatten)(this.transitions)).pushObjects((0, _array.flatten)(this.pins));
        this.scrollController = new _scrollmagic.default.Controller({
          container: this.element
        });
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
        const sceneOptions = {
          //offset: -this.bottomOffset, // TODO ?
          triggerElement: this.element.querySelector(".scroll-view__bottom"),
          triggerHook: "onEnter"
        };
        this.onReachTheBottomScene = new _scrollmagic.default.Scene(sceneOptions).on("enter", event => {
          var _this$onReachTheBotto;

          (_this$onReachTheBotto = this.onReachTheBottom) === null || _this$onReachTheBotto === void 0 ? void 0 : _this$onReachTheBotto.call(this, this, event);
        });
        this.scrollController.addScene(this.onReachTheBottomScene);
      }
    }

  });

  _exports.default = _default;
});
;define("f1-web/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("f1-web/controllers/fantasy", ["exports", "f1-web/controllers/web/base"], function (_exports, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   *
   * @class FantasyController
   * @extends BaseController
   *
   * @since 1.0.0
   */
  var _default = _base.default.extend({});

  _exports.default = _default;
});
;define("f1-web/controllers/index", ["exports", "f1-web/controllers/web/base"], function (_exports, _base) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   *
   * @class IndexController
   * @extends BaseController
   *
   * @since 1.0.0
   */
  var _default = _base.default.extend({});

  _exports.default = _default;
});
;define("f1-web/controllers/web/base", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   *
   * @class BaseController
   * @extends Controller
   *
   * @since 1.0.0
   */
  var _default = Ember.Controller.extend({
    /**
     * @protected
     * @return {WebsiteService}
     *
     * @since 1.22.0
     */
    website: Ember.inject.service(),

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

  _exports.default = _default;
});
;define("f1-web/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
});
;define("f1-web/helpers/app-version", ["exports", "f1-web/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("f1-web/helpers/loc", ["exports", "@ember/string/helpers/loc"], function (_exports, _loc) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _loc.default;
    }
  });
  Object.defineProperty(_exports, "loc", {
    enumerable: true,
    get: function () {
      return _loc.loc;
    }
  });
});
;define("f1-web/helpers/page-title", ["exports", "ember-page-title/helpers/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pageTitle.default;
  _exports.default = _default;
});
;define("f1-web/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("f1-web/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("f1-web/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "f1-web/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("f1-web/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("f1-web/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setup.default;
    }
  });
});
;define("f1-web/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This code initializes EmberData in an Ember application.
  
    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("f1-web/initializers/export-application-global", ["exports", "f1-web/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("f1-web/instance-initializers/ember-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* exists only for things that historically used "after" or "before" */
  var _default = {
    name: 'ember-data',

    initialize() {}

  };
  _exports.default = _default;
});
;define("f1-web/mixins/components/index", ["exports", "f1-web/mixins/modifiable", "f1-web/mixins/components/scrollable", "f1-web/mixins/themeable"], function (_exports, _modifiable, _scrollable, _themeable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "Modifiable", {
    enumerable: true,
    get: function () {
      return _modifiable.default;
    }
  });
  Object.defineProperty(_exports, "Scrollable", {
    enumerable: true,
    get: function () {
      return _scrollable.default;
    }
  });
  Object.defineProperty(_exports, "Themeable", {
    enumerable: true,
    get: function () {
      return _themeable.default;
    }
  });
});
;define("f1-web/mixins/components/scrollable", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   * @mixin ScrollableComponent
   *
   * @since 1.0.0
   */
  var _default = Ember.Mixin.create({
    /**
     * @protected
     *
     * @since 1.0.0
     */
    init() {
      var _this$registerScrolla;

      this._super(...arguments);

      (_this$registerScrolla = this.registerScrollable) === null || _this$registerScrolla === void 0 ? void 0 : _this$registerScrolla.call(this, this);
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
    }

  });

  _exports.default = _default;
});
;define("f1-web/mixins/modifiable", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   * @mixin Modifiable
   *
   * @since 1.0.0
   */
  var _default = Ember.Mixin.create({
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
    mainClassName: Ember.computed("classNames", {
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
    allModifiers: Ember.computed("modifiers", "nestedModifiers", function () {
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
    modifiers: Ember.computed.alias("modifier"),

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
    classNamesFromModifierNames: Ember.computed("mainClassName", "modifierNames.[]", function () {
      const className = this.get("mainClassName");
      const modifiers = this.get("modifierNames");
      return modifiers.reduce((previous, item) => previous + className + "--" + item + " ", "").trim();
    }),

    /**
     * @protected
     * @since 1.0.0
     * @type {String}
     */
    classNamesFromModifier: Ember.computed("mainClassName", "allModifiers", function () {
      const className = this.get("mainClassName");
      let modifiers = this.get("allModifiers");

      if (!Ember.isBlank(modifiers)) {
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
        modifierNameBindings.forEach(binding => {
          binding = binding.split(":");
          const property = `${binding[0].replace(/\./g, "_")}Modifier`;
          Ember.defineProperty(this, property, Ember.computed(binding[0], {
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

      if (!Ember.isEmpty(value) && value !== false) {
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
      const type = Ember.typeOf(value);
      let className = modifier;

      if (!className) {
        if (value === true) {
          const parts = property.split(".");
          className = Ember.String.dasherize(parts.pop());
        } else if (type === "number") {
          const parts = property.split(".");
          className = Ember.String.dasherize(parts.pop()) + "-" + value;
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
      return parts.length > index ? parts[index].replace("*", value) : false;
    }

  });

  _exports.default = _default;
});
;define("f1-web/mixins/themeable", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   * @mixin Themeable
   *
   * @since 1.0.0
   */
  var _default = Ember.Mixin.create({
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
    themed: Ember.computed.bool("theme")
  });

  _exports.default = _default;
});
;define("f1-web/router", ["exports", "f1-web/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends Ember.Router {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    this.route('fantasy');
  });
});
;define("f1-web/scrolling/animation.gsap", ["scrollmagic", "gsap"], function (_scrollmagic, _gsap) {
  "use strict";

  /*!
   * ScrollMagic v2.0.8 (2020-08-14)
   * The javascript library for magical scroll interactions.
   * (c) 2020 Jan Paepke (@janpaepke)
   * Project Website: http://scrollmagic.io
   *
   * @version 2.0.8
   * @license Dual licensed under MIT license and GPL.
   * @author Jan Paepke - e-mail@janpaepke.de
   *
   * @file ScrollMagic GSAP Animation Plugin.
   *
   * requires: GSAP ~1.14
   * Powered by the Greensock Animation Platform (GSAP): http://www.greensock.com/js
   * Greensock License info at http://www.greensock.com/licensing/
   */

  /**
   * This plugin is meant to be used in conjunction with the Greensock Animation Plattform.
   * It offers an easy API to trigger Tweens or synchronize them to the scrollbar movement.
   *
   * Both the `lite` and the `max` versions of the GSAP library are supported.
   * The most basic requirement is `TweenLite`.
   *
   * To have access to this extension, please include `plugins/animation.gsap.js`.
   * @requires {@link http://greensock.com/gsap|GSAP ~1.14.x}
   * @mixin animation.GSAP
   */
  const Tween = _gsap.default;
  const Timeline = _gsap.default;
  var NAMESPACE = "animation.gsap";
  var GSAP3_OR_GREATER = _gsap.default && parseFloat(_gsap.default.version) >= 3;
  var console = window.console || {},
      err = Function.prototype.bind.call(console.error || console.log || function () {}, console);

  if (!_scrollmagic.default) {
    err("(" + NAMESPACE + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
  }

  if (!Tween) {
    err("(" + NAMESPACE + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs.");
  }
  /*
   * ----------------------------------------------------------------
   * Extensions for Scene
   * ----------------------------------------------------------------
   */

  /**
   * Every instance of ScrollMagic.Scene now accepts an additional option.
   * See {@link ScrollMagic.Scene} for a complete list of the standard options.
   * @memberof! animation.GSAP#
   * @method new ScrollMagic.Scene(options)
   * @example
   * var scene = new ScrollMagic.Scene({tweenChanges: true});
   *
   * @param {object} [options] - Options for the Scene. The options can be updated at any time.
   * @param {boolean} [options.tweenChanges=false] - Tweens Animation to the progress target instead of setting it.
   Does not affect animations where duration is `0`.
   */

  /**
   * **Get** or **Set** the tweenChanges option value.
   * This only affects scenes with a duration. If `tweenChanges` is `true`, the progress update when scrolling will not be immediate, but instead the animation will smoothly animate to the target state.
   * For a better understanding, try enabling and disabling this option in the [Scene Manipulation Example](../examples/basic/scene_manipulation.html).
   * @memberof! animation.GSAP#
   * @method Scene.tweenChanges
   *
   * @example
   * // get the current tweenChanges option
   * var tweenChanges = scene.tweenChanges();
   *
   * // set new tweenChanges option
   * scene.tweenChanges(true);
   *
   * @fires {@link Scene.change}, when used as setter
   * @param {boolean} [newTweenChanges] - The new tweenChanges setting of the scene.
   * @returns {boolean} `get` -  Current tweenChanges option value.
   * @returns {Scene} `set` -  Parent object for chaining.
   */
  // add option (TODO: DOC (private for dev))


  _scrollmagic.default.Scene.addOption("tweenChanges", // name
  false, // default
  function (val) {
    // validation callback
    return !!val;
  }); // extend scene


  _scrollmagic.default.Scene.extend(function () {
    var Scene = this,
        _tween;

    var log = function () {
      if (Scene._log) {
        // not available, when main source minified
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ")", "->");

        Scene._log.apply(this, arguments);
      }
    }; // set listeners


    Scene.on("progress.plugin_gsap", function () {
      updateTweenProgress();
    });
    Scene.on("destroy.plugin_gsap", function (e) {
      Scene.removeTween(e.reset);
    });
    /**
     * Update the tween progress to current position.
     * @private
     */

    var updateTweenProgress = function () {
      if (_tween) {
        var progress = Scene.progress(),
            state = Scene.state();

        if (_tween.repeat && _tween.repeat() === -1) {
          // infinite loop, so not in relation to progress
          if (state === 'DURING' && _tween.paused()) {
            _tween.play();
          } else if (state !== 'DURING' && !_tween.paused()) {
            _tween.pause();
          }
        } else if (progress != _tween.progress()) {
          // do we even need to update the progress?
          // no infinite loop - so should we just play or go to a specific point in time?
          if (Scene.duration() === 0) {
            // play the animation
            if (progress > 0) {
              // play from 0 to 1
              _tween.play();
            } else {
              // play from 1 to 0
              _tween.reverse();
            }
          } else {
            // go to a specific point in time
            if (Scene.tweenChanges() && _tween.tweenTo) {
              // go smooth
              _tween.tweenTo(progress * _tween.duration());
            } else {
              // just hard set it
              _tween.progress(progress).pause();
            }
          }
        }
      }
    };
    /**
     * Add a tween to the scene.
     * If you want to add multiple tweens, add them into a GSAP Timeline object and supply it instead (see example below).
     *
     * If the scene has a duration, the tween's duration will be projected to the scroll distance of the scene, meaning its progress will be synced to scrollbar movement.
     * For a scene with a duration of `0`, the tween will be triggered when scrolling forward past the scene's trigger position and reversed, when scrolling back.
     * To gain better understanding, check out the [Simple Tweening example](../examples/basic/simple_tweening.html).
     *
     * Instead of supplying a tween this method can also be used as a shorthand for `TweenMax.to()` (see example below).
     * @memberof! animation.GSAP#
     *
     * @example
     * // add a single tween directly
     * scene.setTween(TweenMax.to("obj"), 1, {x: 100});
     *
     * // add a single tween via variable
     * var tween = TweenMax.to("obj"), 1, {x: 100};
     * scene.setTween(tween);
     *
     * // add multiple tweens, wrapped in a timeline.
     * var timeline = new TimelineMax();
     * var tween1 = TweenMax.from("obj1", 1, {x: 100});
     * var tween2 = TweenMax.to("obj2", 1, {y: 100});
     * timeline
     *		.add(tween1)
     *		.add(tween2);
     * scene.addTween(timeline);
     *
     * // short hand to add a TweenMax.to() tween
     * scene.setTween("obj3", 0.5, {y: 100});
     *
     * // short hand to add a TweenMax.to() tween for 1 second
     * // this is useful, when the scene has a duration and the tween duration isn't important anyway
     * scene.setTween("obj3", {y: 100});
     *
     * @param {(object|string)} TweenObject - A TweenMax, TweenLite, TimelineMax or TimelineLite object that should be animated in the scene. Can also be a Dom Element or Selector, when using direct tween definition (see examples).
     * @param {(number|object)} duration - A duration for the tween, or tween parameters. If an object containing parameters are supplied, a default duration of 1 will be used.
     * @param {object} params - The parameters for the tween
     * @returns {Scene} Parent object for chaining.
     */


    Scene.setTween = function (TweenObject, duration, params) {
      var newTween;

      if (arguments.length > 1) {
        var durationIsSet = typeof arguments['1'] === 'number';

        if (GSAP3_OR_GREATER) {
          // If we're using gsap 3 with proper gsap 3 syntax of 2 arguments
          if (!durationIsSet) {
            params = duration;
          } // Add a duration is there isn't one


          if (!params.hasOwnProperty('duration')) {
            params.duration = durationIsSet ? duration : 1;
          }
        } else {
          // If we're using gsap 2 or earlier syntax
          if (arguments.length < 3) {
            params = duration;
            duration = 1;
          }
        } // 2 arguments should be gsap 3 syntax, and 3 arguments for


        TweenObject = GSAP3_OR_GREATER ? Tween.to(TweenObject, params) : Tween.to(TweenObject, duration, params);
      }

      try {
        // wrap Tween into a Timeline Object if not gsap 3 or greater and available to include delay and repeats in the duration and standardize methods.
        if (Timeline && !GSAP3_OR_GREATER) {
          newTween = new Timeline({
            smoothChildTiming: true
          }).add(TweenObject);
        } else {
          newTween = TweenObject;
        }

        newTween.pause();
      } catch (e) {
        log(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject");
        return Scene;
      }

      if (_tween) {
        // kill old tween?
        Scene.removeTween();
      }

      _tween = newTween; // some properties need to be transferred it to the wrapper, otherwise they would get lost.

      if (TweenObject.repeat && TweenObject.repeat() === -1) {
        // TweenMax or TimelineMax Object?
        _tween.repeat(-1);

        _tween.yoyo(TweenObject.yoyo());
      } // Some tween validations and debugging helpers


      if (Scene.tweenChanges() && !_tween.tweenTo) {
        log(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic.");
      } // check if there are position tweens defined for the trigger and warn about it :)


      if (_tween && Scene.controller() && Scene.triggerElement() && Scene.loglevel() >= 2) {
        // controller is needed to know scroll direction.
        var triggerTweens = Tween.getTweensOf(Scene.triggerElement()),
            vertical = Scene.controller().info("vertical");
        triggerTweens.forEach(function (value, index) {
          var tweenvars = value.vars.css || value.vars,
              condition = vertical ? tweenvars.top !== undefined || tweenvars.bottom !== undefined : tweenvars.left !== undefined || tweenvars.right !== undefined;

          if (condition) {
            log(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!");
            return false;
          }
        });
      } // warn about tween overwrites, when an element is tweened multiple times


      if (parseFloat(Tween.version) >= 1.14) {
        // onOverwrite only present since GSAP v1.14.0
        var // However, onInterrupt deprecated onOverwrite in GSAP v3
        methodUsed = GSAP3_OR_GREATER ? 'onInterrupt' : 'onOverwrite',
            list = _tween.getChildren ? _tween.getChildren(true, true, false) : [_tween],
            // get all nested tween objects
        newCallback = function () {
          log(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another");
        };

        for (var i = 0, thisTween, oldCallback; i < list.length; i++) {
          /*jshint loopfunc: true */
          thisTween = list[i];

          if (oldCallback !== newCallback) {
            // if tweens is added more than once
            oldCallback = thisTween.vars[methodUsed];

            thisTween.vars[methodUsed] = function () {
              if (oldCallback) {
                oldCallback.apply(this, arguments);
              }

              newCallback.apply(this, arguments);
            };
          }
        }
      }

      log(3, "added tween");
      updateTweenProgress();
      return Scene;
    };
    /**
     * Remove the tween from the scene.
     * This will terminate the control of the Scene over the tween.
     *
     * Using the reset option you can decide if the tween should remain in the current state or be rewound to set the target elements back to the state they were in before the tween was added to the scene.
     * @memberof! animation.GSAP#
     *
     * @example
     * // remove the tween from the scene without resetting it
     * scene.removeTween();
     *
     * // remove the tween from the scene and reset it to initial position
     * scene.removeTween(true);
     *
     * @param {boolean} [reset=false] - If `true` the tween will be reset to its initial values.
     * @returns {Scene} Parent object for chaining.
     */


    Scene.removeTween = function (reset) {
      if (_tween) {
        if (reset) {
          _tween.progress(0).pause();
        }

        _tween.kill();

        _tween = undefined;
        log(3, "removed tween (reset: " + (reset ? "true" : "false") + ")");
      }

      return Scene;
    };
  });
});
;define("f1-web/scrolling/index", ["exports", "f1-web/scrolling/pin", "f1-web/scrolling/timeline", "f1-web/scrolling/transition"], function (_exports, _pin, _timeline, _transition) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "Pin", {
    enumerable: true,
    get: function () {
      return _pin.default;
    }
  });
  Object.defineProperty(_exports, "Timeline", {
    enumerable: true,
    get: function () {
      return _timeline.default;
    }
  });
  Object.defineProperty(_exports, "Transition", {
    enumerable: true,
    get: function () {
      return _transition.default;
    }
  });
  _exports.APP_BAR_PROMINENT_TRANSITIONS = void 0;

  /**
   * @public
   * @const {Array}
   *
   * @since 1.0.0
   */
  const APP_BAR_PROMINENT_TRANSITIONS = [_transition.default.create({
    element: ".app-bar--top .app-bar__container",
    transform: {
      paddingBottom: "15px"
    },
    duration: 300
  }), _transition.default.create({
    element: ".app-bar--top .app-bar__title, .app-bar--top .app-bar__heading__title",
    transform: {
      transform: "scale(0.75, 0.75)",
      fontWeight: 400,
      marginTop: 0
    },
    duration: 300
  }), _transition.default.create({
    element: ".app-bar--top .app-bar__heading__subtitle",
    transform: {
      opacity: 0.0,
      height: 0,
      marginTop: 0
    },
    duration: 300
  }), _transition.default.create({
    element: ".app-bar--top .app-bar__background",
    transform: {
      opacity: 1.0
    },
    duration: 300
  })];
  _exports.APP_BAR_PROMINENT_TRANSITIONS = APP_BAR_PROMINENT_TRANSITIONS;
});
;define("f1-web/scrolling/object", ["exports", "f1-web/scrolling/animation.gsap", "scrollmagic"], function (_exports, _animation, _scrollmagic) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @package
   * @abstract
   *
   * @class ScrollObject
   * @extends EmberObject
   *
   * @since 1.0.0
   */
  var _default = Ember.Object.extend({
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
        offset: this.offset
      };
      this.scrollMagicScene = new _scrollmagic.default.Scene(scene);
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
    }

  });

  _exports.default = _default;
});
;define("f1-web/scrolling/pin", ["exports", "f1-web/scrolling/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   *
   * @class Pin
   * @extends ScrollObject
   *
   * @since 1.0.0
   */
  var _default = _object.default.extend({
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
        spacerClass: this.className
      };
      scene.setPin(element, options);
      return scene;
    }

  });

  _exports.default = _default;
});
;define("f1-web/scrolling/timeline", ["exports", "f1-web/scrolling/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   *
   * @class Transition
   * @extends ScrollObject
   *
   * @since 1.0.0
   */
  var _default = _object.default.extend({
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
        const keys = Ember.A(Object.keys(this.fromTransform.css)).pushObjects(Object.keys(this.toTransform.css));
        keys.forEach(key => element.style[key] = "");
      }
    }

  });

  _exports.default = _default;
});
;define("f1-web/scrolling/transition", ["exports", "f1-web/scrolling/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   *
   * @class Transition
   * @extends ScrollObject
   *
   * @since 1.0.0
   */
  var _default = _object.default.extend({
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
        const keys = Ember.A(Object.keys(this.transform));
        keys.forEach(key => element.style[key] = "");
      }
    }

  });

  _exports.default = _default;
});
;define("f1-web/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("f1-web/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("f1-web/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("f1-web/services/page-title-list", ["exports", "ember-page-title/services/page-title-list"], function (_exports, _pageTitleList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitleList.default;
    }
  });
});
;define("f1-web/services/page-title", ["exports", "ember-page-title/services/page-title"], function (_exports, _pageTitle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pageTitle.default;
    }
  });
});
;define("f1-web/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
});
;define("f1-web/services/website", ["exports", "f1-web/scrolling"], function (_exports, _scrolling) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * @public
   *
   * @class WebsiteService
   * @extends Service
   *
   * @since 1.22.0
   */
  class WebsiteService extends Ember.Service {
    /**
     * @protected
     * @return {Transition[]}
     *
     * @since 1.22.0
     */
    get scrollTransitions() {
      return [_scrolling.Transition.create({
        element: ".app-bar--top",
        transform: {
          backgroundColor: "#000"
        },
        // TODO
        duration: 300
      }), _scrolling.Transition.create({
        element: ".app-bar--top .app-bar__item--signup",
        transform: {
          opacity: 0.0,
          width: "0px"
        },
        duration: 250,
        offset: 300
      }), _scrolling.Transition.create({
        element: ".app-bar--top .app-bar__signup-form",
        transform: {
          opacity: 1.0,
          width: "342px"
        },
        duration: 250,
        offset: 300
      })];
    }

  }

  var _default = WebsiteService;
  _exports.default = _default;
});
;define("f1-web/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "2C3KHvqx",
    "block": "[[[1,[28,[35,0],[\"Formula 1 Website\"],null]],[1,\"\\n\"],[10,0],[14,0,\"navigation__top-app-bar\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"navigation__top-app-bar__left\"],[12],[1,\"\\n      \"],[10,3],[14,\"target\",\"f1\"],[14,6,\"https://www.formula1.com/\"],[14,1,\"ember57\"],[14,0,\"button button--text ember-view navigation__top-app-bar__link\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        F1\"],[10,\"sup\"],[12],[1,\"®\"],[13],[1,\"\\n      \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,3],[14,\"target\",\"f2\"],[14,6,\"http://www.fiaformula2.com/\"],[14,1,\"ember58\"],[14,0,\"button button--text ember-view navigation__top-app-bar__link\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        F2\"],[10,\"sup\"],[14,0,\"tm\"],[12],[1,\"TM\"],[13],[1,\"\\n      \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,3],[14,\"target\",\"f3\"],[14,6,\"http://www.fiaformula3.com/\"],[14,1,\"ember59\"],[14,0,\"button button--text ember-view navigation__top-app-bar__link\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        F3\"],[10,\"sup\"],[14,0,\"tm\"],[12],[1,\"TM\"],[13],[1,\"\\n      \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"navigation__top-app-bar__right\"],[12],[1,\"\\n      \"],[10,3],[14,\"target\",\"f1-authentics\"],[14,6,\"https://www.f1authentics.com/\"],[14,1,\"ember60\"],[14,0,\"button button--text ember-view navigation__top-app-bar__link\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Authentics\\n      \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,3],[14,\"target\",\"f1-store\"],[14,6,\"https://f1store2.formula1.com/en/?_s=bm-fi-f1-prtsite-topnav-230720-jm\"],[14,1,\"ember61\"],[14,0,\"button button--text ember-view navigation__top-app-bar__link\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Store\\n      \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,3],[14,\"target\",\"f1-tickets\"],[14,6,\"https://tickets.formula1.com/en\"],[14,1,\"ember62\"],[14,0,\"button button--text ember-view navigation__top-app-bar__link\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Tickets\\n      \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,3],[14,\"target\",\"f1-hospitality\"],[14,6,\"https://tickets.formula1.com/en/h-formula1-hospitality\"],[14,1,\"ember63\"],[14,0,\"button button--text ember-view navigation__top-app-bar__link\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Hospitality\\n      \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,3],[14,\"target\",\"f1-experiences\"],[14,6,\"https://f1experiences.com/calendar-of-events\"],[14,1,\"ember64\"],[14,0,\"button button--text ember-view navigation__top-app-bar__link\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Experiences\\n      \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,3],[14,\"target\",\"f1-tv\"],[14,6,\"https://f1tv.formula1.com/\"],[14,1,\"ember65\"],[14,0,\"button button--text ember-view navigation__top-app-bar__link\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"logo    logo--formula-1 logo--tv logo--svg  logo--horizontal navigation__top-app-bar__logo\"],[14,\"aria-label\",\"formula-1\"],[12],[1,\"\\n    \"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 253.73 40.53\"],[12],[1,\"\\n  \"],[10,\"g\"],[14,0,\"logo\"],[12],[1,\"\\n    \"],[10,\"path\"],[14,0,\"trademark\"],[14,\"d\",\"M130.17,35.76h1.58V40h.88V35.76h1.59V35h-4.05ZM134.78,40h.84V36.14h0L137,40h.72l1.38-3.86h0V40H140V35h-1.22l-1.34,3.92h0L136,35h-1.23Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"f1\"],[14,\"d\",\"M40.37,22.79,22.63,40H0L28.15,12.06C38.62,1.7,43.67,0,61.51,0H132l-15.3,15H63.53C50.2,15,47.36,16,40.37,22.79Zm74.05-5.42H63.85c-13.43,0-15.53,1-21.62,7.12L26.72,40h21l5-5c3.29-3.3,4.77-3.62,11.42-3.62H100.4ZM119.89,40,160,0H135.09l-40,40Z\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"g\"],[14,0,\"letters\"],[12],[1,\"\\n    \"],[10,\"path\"],[14,0,\"t-letter\"],[14,\"d\",\"M185.2,8.8H170V0h41.07V8.8h-15.2V40H185.2Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"v-letter\"],[14,\"d\",\"M231.87,30.45c.21.8.48,1.28,1.12,1.28s1-.37,1.22-1.33L243,0h10.77l-9.92,31.2C242,37,239.07,40.53,233,40.53c-6.51,0-9.17-3.14-11.2-9.33L211.6,0h11.73Z\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\\n      \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"header\"],[14,1,\"ember66\"],[14,0,\"app-bar app-bar--theme-f1 app-bar--themed app-bar--sticky app-bar--default app-bar--top app-bar--transparent ember-view\"],[12],[1,\"  \"],[10,0],[14,0,\"app-bar__background\"],[12],[13],[1,\"\\n\\n  \"],[10,0],[14,1,\"ember67\"],[14,0,\"app-bar__container ember-view\"],[12],[3,\"\"],[1,\"\\n\"],[10,3],[14,6,\"/\"],[14,1,\"ember68\"],[14,0,\"active ember-view\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"logo app-bar__brand   logo--formula-1 logo--default logo--svg  logo--horizontal\"],[14,\"aria-label\",\"formula-1\"],[12],[1,\"\\n    \"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 413.97 48\"],[12],[1,\"\\n  \"],[10,\"g\"],[14,0,\"logo\"],[12],[1,\"\\n    \"],[10,\"path\"],[14,0,\"f1\"],[14,\"d\",\"M0,40,28,12C38.09,1.91,43.57,0,62.63,0h68.49l-13.9,13.63H65.61c-14.06,0-17.68,1.12-24.6,8L22.53,40Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"f1\"],[14,\"d\",\"M67,17.42c-14.06,0-16.78.63-23.12,7L28.39,40H49.26l5-5.06c2.93-3,4.15-3.78,11.13-3.78H99.49l13.9-13.74Z\"],[12],[13],[1,\"\\n    \"],[10,\"polyline\"],[14,0,\"f1\"],[14,\"points\",\"159.88 0 136.02 0 96.02 40 119.72 40 159.88 0\"],[12],[13],[1,\"\\n    \"],[10,\"polygon\"],[14,0,\"trademark\"],[14,\"points\",\"134.59 33.33 139.99 33.33 139.99 34.34 137.87 34.34 137.87 40 136.7 40 136.7 34.34 134.59 34.34 134.59 33.33\"],[12],[13],[1,\"\\n    \"],[10,\"polygon\"],[14,0,\"trademark\"],[14,\"points\",\"141.07 33.33 142.71 33.33 144.55 38.55 144.57 38.55 146.36 33.33 147.99 33.33 147.99 40 146.88 40 146.88 34.85 146.86 34.85 145.01 40 144.05 40 142.2 34.85 142.18 34.85 142.18 40 141.07 40 141.07 33.33\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"g\"],[14,0,\"letters\"],[12],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M169.86,40V0h31.52V8.8H180.53v7.36h20.85V25H180.53V40Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M237,22.67V40H215q-4.54,0-7-2.08a6.82,6.82,0,0,1-2.43-5.44A8,8,0,0,1,208,26.53,42.42,42.42,0,0,1,213.65,22l9.07-6.24H205.86V8h14q9.17,0,13.12,3.87T237,22.67Zm-18.88,9.6h9.34l.1-10.56-9.65,7.46c-.6.47-1,.81-1.28,1a1.16,1.16,0,0,0-.37.88,1,1,0,0,0,.43.88A2.56,2.56,0,0,0,218.07,32.27Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M243.14,40V8H263q7,0,10.14,3.52t3.14,9.55V40H266.13V20.8a5.69,5.69,0,0,0-.83-3.49c-.55-.7-1.61-1-3.17-1h-8.86V40Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M280.42,15.73V8h5.18V1.49h9.33V8h17.33v7.73H294.93v13a3.66,3.66,0,0,0,.85,2.8,4.05,4.05,0,0,0,2.78.78h5.17V40h-6.35q-6.61,0-9.46-2.8c-1.91-1.87-2.86-4.7-2.86-8.51v-13Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M340.1,22.67V40H318.18q-4.53,0-7-2.08a6.82,6.82,0,0,1-2.43-5.44,8,8,0,0,1,2.32-5.95A42.42,42.42,0,0,1,316.79,22l9.07-6.24H309V8h14q9.18,0,13.12,3.87T340.1,22.67Zm-18.88,9.6h9.34l.1-10.56L321,29.17c-.61.47-1,.81-1.28,1a1.17,1.17,0,0,0-.38.88,1,1,0,0,0,.43.88A2.62,2.62,0,0,0,321.22,32.27Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M363.89,28.8l-8.7-1.71a14.6,14.6,0,0,1-7.33-3.36,8.39,8.39,0,0,1-2.53-6.4,9.11,9.11,0,0,1,.72-3.57,7.86,7.86,0,0,1,2.24-3,11.24,11.24,0,0,1,3.89-2A18.77,18.77,0,0,1,357.81,8H373.7v7.73H357a3.32,3.32,0,0,0-2.13.48,1.42,1.42,0,0,0-.54,1.07,1.53,1.53,0,0,0,.48,1.12,3.1,3.1,0,0,0,1.65.69l7.9,1.55c3.91.78,6.71,1.95,8.4,3.49a8,8,0,0,1,2.53,6.16,8.66,8.66,0,0,1-3.28,7Q368.74,40,362.07,40H346.39V32.27h17.39a3.42,3.42,0,0,0,2.21-.48,1.61,1.61,0,0,0,.51-1.23,1.24,1.24,0,0,0-.72-1.17A6.7,6.7,0,0,0,363.89,28.8Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M394.82,27.15a1.39,1.39,0,0,0,.53.77,1.16,1.16,0,0,0,.59.19.86.86,0,0,0,.56-.19,1.7,1.7,0,0,0,.45-.77L403.19,8H414L402.5,39a13.8,13.8,0,0,1-4.88,6.43Q394.18,48,388.42,48h-8.75V39.52h9.66a4.19,4.19,0,0,0,2.9-.88,6.8,6.8,0,0,0,1.68-2.91l.38-1.06h-2.56a5.69,5.69,0,0,1-5.82-3.9L376.63,8h11.15Z\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\\n  \"],[10,0],[14,1,\"ember69\"],[14,0,\"app-bar__space ember-view\"],[12],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"app-bar__col app-bar__menu app-bar__shrinkable\"],[12],[1,\"\\n           \\n            \"],[10,0],[14,1,\"ember70\"],[14,0,\"app-bar__item app-bar__item--theme-white app-bar__item--themed app-bar__item--icon app-bar__item--left app-bar__item--icon app-bar__item--text ember-view\"],[12],[1,\"  \"],[10,3],[14,6,\"/fantasy\"],[14,1,\"ember71\"],[14,0,\"button button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Fantasy\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n           \\n            \"],[10,0],[14,1,\"ember72\"],[14,0,\"app-bar__item app-bar__item--theme-white app-bar__item--themed app-bar__item--icon app-bar__item--left app-bar__item--icon app-bar__item--text ember-view\"],[12],[1,\"  \"],[10,3],[14,6,\"/leagues\"],[14,1,\"ember73\"],[14,0,\"button button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Leagues\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n           \\n            \"],[10,0],[14,1,\"ember74\"],[14,0,\"app-bar__item app-bar__item--theme-white app-bar__item--themed app-bar__item--icon app-bar__item--left app-bar__item--icon app-bar__item--text ember-view\"],[12],[1,\"  \"],[10,3],[14,6,\"/subs-bank\"],[14,1,\"ember75\"],[14,0,\"button button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Subs Bank\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n  \"],[10,1],[14,0,\"badge    badge--pill  badge--text-new app-bar__item__badge\"],[12],[1,\"\\n  \"],[10,1],[14,0,\"badge__text\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      New\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n           \\n            \"],[10,0],[14,1,\"ember76\"],[14,0,\"app-bar__item app-bar__item--theme-white app-bar__item--themed app-bar__item--icon app-bar__item--left app-bar__item--icon app-bar__item--text ember-view\"],[12],[1,\"  \"],[10,3],[14,6,\"/dynamic-pricing\"],[14,1,\"ember77\"],[14,0,\"button button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Dynamic Pricing\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n           \\n            \"],[10,0],[14,1,\"ember78\"],[14,0,\"app-bar__item app-bar__item--theme-white app-bar__item--themed app-bar__item--icon app-bar__item--left app-bar__item--icon app-bar__item--text ember-view\"],[12],[1,\"  \"],[10,3],[14,6,\"/prizes\"],[14,1,\"ember79\"],[14,0,\"button button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Prizes\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n           \\n            \\n        \"],[10,0],[14,1,\"ember82\"],[14,0,\"app-bar__item app-bar__more-item app-bar__item--theme-white app-bar__item--themed app-bar__item--icon ember-view\"],[12],[10,\"button\"],[14,0,\"btn  btn--text  btn--theme-white btn--themed\"],[14,4,\"button\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"btn__label\"],[12],[1,\"\\n      More\\n    \"],[13],[1,\"\\n\\n    \"],[10,1],[14,1,\"ember83\"],[14,0,\"btn__icon btn__icon--right icon icon--unboxed fal fa-chevron-down icon--fal icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\"],[3,\"\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\\n\"],[3,\"\"],[1,\"\\n\\n\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"app-bar__col app-bar__col--auth app-bar__col--align-right\"],[12],[1,\"\\n    \"],[10,0],[14,1,\"ember84\"],[14,0,\"app-bar__item app-bar__item--theme-white app-bar__item--themed app-bar__item--icon app-bar__item--left app-bar__item--icon app-bar__item--text ember-view\"],[12],[1,\"  \"],[10,3],[14,6,\"https://account.formula1.com/#/en/login?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fmy-teams%3Ffrom%3Dlogin\"],[14,1,\"ember85\"],[14,0,\"button button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Log In\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n    \"],[10,0],[14,1,\"ember86\"],[14,0,\"app-bar__item app-bar__item--signup app-bar__item--uppercase app-bar__item--flat app-bar__item--sm app-bar__item--theme-accent app-bar__item--themed app-bar__item--label app-bar__item--right app-bar__item--label app-bar__item--contained ember-view\"],[12],[1,\"  \"],[10,3],[14,6,\"https://account.formula1.com/#/en/register?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fteam%2Fcreate%3Ffrom%3Dsignup\"],[14,1,\"ember87\"],[14,0,\"button button--signup button--uppercase button--flat button--sm button--theme-accent button--themed button--contained button--icon-fas button--with-icon ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Sign Up\\n    \"],[13],[1,\"\\n\\n      \"],[10,1],[14,1,\"ember88\"],[14,0,\"button__icon button__icon--right icon fas fa-chevron-right icon--fas icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\"],[3,\"\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[46,[28,[37,2],null,null],null,null,null]],[],false,[\"page-title\",\"component\",\"-outlet\"]]",
    "moduleName": "f1-web/templates/application.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("f1-web/templates/components/scroll-view-animated", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ye9kyI0S",
    "block": "[[[18,1,[[30,0]]],[1,\"\\n\"],[10,1],[14,0,\"scroll-view__bottom\"],[12],[13]],[\"&default\"],false,[\"yield\"]]",
    "moduleName": "f1-web/templates/components/scroll-view-animated.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("f1-web/templates/fantasy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "NjNA0iU2",
    "block": "[[[8,[39,0],null,[[\"@transitions\"],[[30,0,[\"scrollTransitions\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"web web__fantasy\"],[12],[1,\"\\n    \"],[10,0],[14,1,\"ember802\"],[14,0,\"container container--md-boxed container--gutters ember-view\"],[12],[1,\"\\n      \"],[10,0],[14,1,\"ember803\"],[14,0,\"row ember-view\"],[12],[1,\"\\n        \"],[10,0],[14,1,\"ember804\"],[14,0,\"col col--12 col--xs-8 col--sm-8 col--offset-xs-2 col--offset-sm-2 col--offset-md-0 col--md-5 ember-view text--left\"],[12],[1,\"\\n          \"],[10,\"h2\"],[14,1,\"ember805\"],[14,0,\"heading heading--web heading--landing heading--h2 heading--bold ember-view\"],[12],[1,\"  Fantasy\\n\"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"web__default-text web__default-text--lg web__white-text\"],[12],[1,\"\\n            Create your own league for you and your friends and play other Formula 1 fans from around the world in public leagues.\\n          \"],[13],[1,\"\\n\\n            \"],[10,3],[14,6,\"/login\"],[14,1,\"ember806\"],[14,0,\"button button--flat button--fixed button--head button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Play now\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"web__default-text web__white-text\"],[12],[1,\"\\n            Already registered? \"],[10,3],[14,6,\"/login\"],[14,1,\"ember807\"],[14,0,\"button button--theme-white button--themed button--underscored ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Log in\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n            \"],[10,0],[14,0,\"powered-by  powered-by--fluid web__powered-by web__powered-by--header\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"powered-by__label\"],[12],[1,\"Powered by\"],[13],[1,\"\\n    \"],[10,0],[14,0,\"logo    logo--playon logo--default logo--svg  logo--horizontal powered-by__logo\"],[14,\"aria-label\",\"playon\"],[12],[1,\"\\n    \"],[3,\"?xml version=\\\"1.0\\\" encoding=\\\"utf-8\\\"?\"],[1,\"\\n\"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"version\",\"1.1\"],[14,1,\"Layer_1\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"xmlns:xlink\",\"http://www.w3.org/1999/xlink\",\"http://www.w3.org/2000/xmlns/\"],[14,\"x\",\"0px\"],[14,\"y\",\"0px\"],[14,\"viewBox\",\"164.4 353.8 226.8 48.5\"],[14,\"xml:space\",\"preserve\",\"http://www.w3.org/XML/1998/namespace\"],[12],[1,\"\\n\"],[10,\"style\"],[14,4,\"text/css\"],[12],[1,\"\\n\\t.play{fill:#FFFFFF;}\\n\\t.on{fill:#00CC3D;}\\n\"],[13],[1,\"\\n\"],[10,\"g\"],[12],[1,\"\\n\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M164.4,401.5v-47.1h20.7c8.7,0,12.2,7,12.2,15.7c0,8.9-3.5,15.6-12.3,15.6h-8.8v15.8H164.4L164.4,401.5z\\n\\t\\t\\t M181.7,363.8h-5.5v12.6h5.5c2.8,0,3.7-2.4,3.7-6.2C185.4,366.2,184.5,363.8,181.7,363.8z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M201.6,401.5v-47.1h11.9v37.2h18.6v9.9H201.6L201.6,401.5z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M264.1,401.5l-2.3-8.6h-12.4l-2.4,8.6h-12.2l13.2-47.1H263l13.6,47.1H264.1z M251.4,383.5h8.1l-2.9-13.1\\n\\t\\t\\tc-0.4-1.5-0.9-5.1-1.1-6.7h-0.1c-0.2,1.6-0.7,5.2-1,6.7L251.4,383.5z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M284.7,401.5v-17.9l-14.7-29.3H283l5.8,12.7c0.5,1.1,1.5,3.9,1.9,5.3h0.1c0.4-1.4,1.4-4.2,1.9-5.3l5.8-12.7\\n\\t\\t\\th12.8l-14.7,29.3v17.8H284.7z\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M328.8,402.3c-14.5,0-20-7.6-20-24.2c0-16.6,5.4-24.3,20-24.3c14.5,0,19.8,7.7,19.8,24.3\\n\\t\\t\\tC348.6,394.6,343.3,402.3,328.8,402.3z M328.8,392.1c5.2,0,7.5-2.5,7.5-14.1s-2.3-14.2-7.5-14.2c-5.2,0-7.5,2.6-7.5,14.2\\n\\t\\t\\tC321.3,389.5,323.6,392.1,328.8,392.1z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M378.2,379.3c0.9,2.2,1.8,4.8,2.6,7.6h0.1c-0.2-2.9-0.4-5.7-0.4-8.2l-0.1-24.2h10.6v47.1h-14.3L366,377.1\\n\\t\\t\\tc-0.8-1.8-1.8-4.8-2.5-7.5h-0.1c0.3,2.7,0.4,6,0.4,8.6l0.1,23.4h-10.8v-47.1h14.7L378.2,379.3z\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\\n  \"],[13],[1,\"\\n\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,1,\"ember808\"],[14,0,\"col col--12 col--md-6 col--offset-md-1 ember-view\"],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"web__fantasy--preview\"],[14,\"src\",\"/images/web/fantasy/phone-events.png\"],[14,\"alt\",\"preview\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \\n\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__create-teams\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,0],[14,1,\"ember809\"],[14,0,\"container container--gutters ember-view\"],[12],[1,\"\\n      \"],[10,0],[14,1,\"ember810\"],[14,0,\"row ember-view\"],[12],[1,\"\\n        \"],[10,0],[14,1,\"ember811\"],[14,0,\"col col--12 ember-view\"],[12],[1,\"\\n          \"],[10,\"h2\"],[14,1,\"ember812\"],[14,0,\"heading heading--web heading--dark heading--h2 heading--bold ember-view\"],[12],[1,\"  Create up to 3 teams\\n\"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"web__default-text web__default-text--lg web__gray-text\"],[12],[1,\"\\n            Pick your team of 5 drivers and 1 constructor, staying \"],[10,\"br\"],[14,0,\"web__break\"],[12],[13],[1,\"under the $100m budget.\\n          \"],[13],[10,\"br\"],[12],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"/login\"],[14,1,\"ember813\"],[14,0,\"button button--flat button--fixed button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Pick a team\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,1,\"ember814\"],[14,0,\"col col--12 ember-view\"],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"panel__image--grid-view\"],[14,\"src\",\"/images/web/fantasy/grid.png\"],[14,\"alt\",\"pitch\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \\n\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__stripped-panel\"],[12],[1,\"\\n  \\t\"],[10,0],[14,0,\"web__stripped-panel--box\"],[12],[1,\"\\n      \"],[10,\"h2\"],[14,1,\"ember815\"],[14,0,\"heading heading--web heading--h2 heading--bold ember-view\"],[12],[1,\"  Boosters\\n\"],[13],[1,\"\\n\\n      \"],[10,2],[14,0,\"web__default-text web__default-text--lg web__white-text\"],[12],[1,\"\\n        Double and Triple your driver points by using your boosters.\\n      \"],[13],[10,\"br\"],[12],[13],[1,\"\\n\\n  \\t\\t\"],[10,0],[14,0,\"web__stripped-panel--box__card\"],[12],[1,\"\\n  \\t\\t\\t\"],[10,0],[14,0,\"web__stripped-panel__img web__stripped-panel__img--badge\"],[12],[13],[1,\"\\n  \\t\\t\\t\"],[10,0],[14,0,\"web__stripped-panel__img web__stripped-panel__img--triangle\"],[12],[13],[1,\"\\n  \\t\\t\\t\"],[10,0],[14,0,\"web__stripped-panel__img web__stripped-panel__img--flag\"],[12],[13],[1,\"\\n\\n  \\t\\t\\t\"],[10,\"h4\"],[14,1,\"ember816\"],[14,0,\"heading heading--captain heading--h4 heading--bold ember-view\"],[12],[1,\"  Turbo Driver\\n\"],[13],[1,\"\\n  \\t\\t\\t\"],[10,2],[14,0,\"web__default-text web__gray-text web__default-text--lg\"],[12],[1,\"\\n          Choose your Turbo Driver \"],[10,1],[14,0,\"web__stripped-panel--box__card__c-highlighted\"],[12],[1,\"every Raceweek\"],[13],[1,\", \"],[10,\"br\"],[14,0,\"web__break\"],[12],[13],[1,\"scores double points\"],[13],[1,\"\\n  \\t\\t\"],[13],[1,\"\\n\\n  \\t\\t\"],[10,0],[14,0,\"web__stripped-panel--box__card\"],[12],[1,\"\\n  \\t\\t\\t\"],[10,0],[14,0,\"web__stripped-panel__img web__stripped-panel__img--badge\"],[12],[13],[1,\"\\n  \\t\\t\\t\"],[10,0],[14,0,\"web__stripped-panel__img web__stripped-panel__img--triangle\"],[12],[13],[1,\"\\n  \\t\\t\\t\"],[10,0],[14,0,\"web__stripped-panel__img web__stripped-panel__img--flag\"],[12],[13],[1,\"\\n\\n  \\t\\t\\t\"],[10,\"h4\"],[14,1,\"ember817\"],[14,0,\"heading heading--h4 heading--bold ember-view\"],[12],[1,\"  Mega Driver\\n\"],[13],[1,\"\\n  \\t\\t\\t\"],[10,2],[14,0,\"web__default-text web__gray-text web__default-text--lg\"],[12],[1,\"\\n          Choose your Mega Driver, scores triple points, \"],[10,\"br\"],[14,0,\"web__break\"],[12],[13],[1,\" \"],[10,1],[14,0,\"web__stripped-panel--box__card__sc-highlighted\"],[12],[1,\"you only have 2 plays per season.\"],[13],[13],[1,\"\\n  \\t\\t\"],[13],[1,\"\\n  \\t\"],[13],[1,\"\\n\\n  \\t\"],[10,\"svg\"],[14,0,\"web__stripped-panel--arrow-down\"],[14,\"preserveAspectRatio\",\"none\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"width\",\"1366.001\"],[14,\"height\",\"115.001\"],[14,\"viewBox\",\"0 0 1366.001 115.001\"],[12],[10,\"path\"],[14,0,\"a\"],[14,\"d\",\"M-15113-5166h-683v-115l683,115h0l683-115v115h-683Z\"],[14,\"transform\",\"translate(15796 5280.999)\"],[12],[13],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__wildcard-panel\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n  \\t\"],[10,0],[14,0,\"web__wildcard-panel--box\"],[12],[1,\"\\n  \\t\\t\"],[10,\"img\"],[14,0,\"web__wildcard-panel--box__wildcard-img\"],[14,\"src\",\"/images/web/fantasy/wildcard.png\"],[14,\"alt\",\"wildcard\"],[12],[13],[1,\"\\n\\n  \\t\\t\"],[10,\"h2\"],[14,1,\"ember818\"],[14,0,\"heading heading--web heading--dark heading--h2 heading--bold ember-view\"],[12],[1,\"  Play Your Wildcards Right\\n\"],[13],[1,\"\\n\\n  \\t\\t\"],[10,2],[14,0,\"web__default-text web__default-text--lg web__gray-text\"],[12],[1,\"\\n        The Wildcard allows you to make up to 12 substitutions for free in the raceweek you play it.\\n  \\t\\t\"],[13],[1,\"\\n\\n  \\t\\t\"],[10,2],[14,0,\"web__default-text web__default-text--lg web__blue-text\"],[12],[1,\"\\n        You get 2 Wildcards per season.\\n  \\t\\t\"],[13],[1,\"\\n\\n  \\t\\t\"],[10,3],[14,6,\"/login\"],[14,1,\"ember819\"],[14,0,\"button button--flat button--fixed button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Play now\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n      \"],[10,\"img\"],[14,0,\"web__wildcard-panel--box__img\"],[14,\"src\",\"/images/web/fantasy/swap-out.png\"],[14,\"alt\",\"wildcard-swap\"],[12],[13],[1,\"\\n      \"],[10,\"img\"],[14,0,\"web__wildcard-panel--box__img web__wildcard-panel--box__img__right\"],[14,\"src\",\"/images/web/fantasy/swap-in.png\"],[14,\"alt\",\"wildcard-swap\"],[12],[13],[1,\"\\n  \\t\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__live-panel\"],[12],[1,\"\\n  \\t\"],[10,\"img\"],[14,0,\"web__live-panel__live-pulse\"],[14,\"src\",\"/images/web/fantasy/live-pulse.png\"],[14,\"alt\",\"pulse-icon\"],[12],[13],[1,\"\\n  \\t\"],[10,\"h2\"],[14,1,\"ember820\"],[14,0,\"heading heading--web heading--h2 heading--bold ember-view\"],[12],[1,\"  Live Experience\\n\"],[13],[1,\"\\n\\n  \\t\"],[10,2],[14,0,\"web__default-text web__default-text--lg web__white-text\"],[12],[1,\"\\n  \\t Watch your players score points in real-time.\\n  \\t\"],[13],[1,\"\\n\\n  \\t\"],[10,3],[14,6,\"/login\"],[14,1,\"ember821\"],[14,0,\"button button--flat button--fixed button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Play now\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n  \\t\"],[10,\"img\"],[14,0,\"web__live-panel__live-events\"],[14,\"src\",\"/images/web/fantasy/live-events.png\"],[14,\"alt\",\"live-events\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__know-more-panel\"],[12],[1,\"\\n  \\t\"],[10,\"h2\"],[14,1,\"ember822\"],[14,0,\"heading heading--web heading--dark heading--h2 heading--bold ember-view\"],[12],[1,\"  Want to Know More?\\n\"],[13],[1,\"\\n  \\t\"],[10,2],[14,0,\"web__default-text web__default-text--lg web__gray-text\"],[12],[1,\"\\n  \\t  Get further information about F1® Fantasy.\\n  \\t\"],[13],[1,\"\\n\\n  \\t\"],[10,0],[14,0,\"web__know-more-panel__action-buttons\"],[12],[1,\"\\n      \"],[10,3],[14,6,\"/points-scoring\"],[14,1,\"ember823\"],[14,0,\"button button--flat button--fixed button--theme-primary button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Scoring\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n      \"],[10,3],[14,6,\"/game-rules\"],[14,1,\"ember824\"],[14,0,\"button button--flat button--fixed button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Game Rules\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n  \\t\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,1,\"ember825\"],[14,0,\"web web-footer ember-view\"],[12],[10,0],[14,1,\"ember826\"],[14,0,\"container container--xl-boxed container--gutters ember-view\"],[12],[1,\"\\n\\t\"],[10,0],[14,1,\"ember827\"],[14,0,\"row ember-view\"],[12],[1,\"\\n\\t\\t\"],[10,0],[14,1,\"ember828\"],[14,0,\"col col--12 col--md-3 col--lg-3 ember-view text--left\"],[12],[1,\"\\n\\t\\t\\t\"],[10,0],[14,0,\"logo  logo--centered  logo--formula-1 logo--default logo--svg  logo--horizontal web-footer__logo\"],[14,\"aria-label\",\"formula-1\"],[12],[1,\"\\n    \"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 413.97 48\"],[12],[1,\"\\n  \"],[10,\"g\"],[14,0,\"logo\"],[12],[1,\"\\n    \"],[10,\"path\"],[14,0,\"f1\"],[14,\"d\",\"M0,40,28,12C38.09,1.91,43.57,0,62.63,0h68.49l-13.9,13.63H65.61c-14.06,0-17.68,1.12-24.6,8L22.53,40Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"f1\"],[14,\"d\",\"M67,17.42c-14.06,0-16.78.63-23.12,7L28.39,40H49.26l5-5.06c2.93-3,4.15-3.78,11.13-3.78H99.49l13.9-13.74Z\"],[12],[13],[1,\"\\n    \"],[10,\"polyline\"],[14,0,\"f1\"],[14,\"points\",\"159.88 0 136.02 0 96.02 40 119.72 40 159.88 0\"],[12],[13],[1,\"\\n    \"],[10,\"polygon\"],[14,0,\"trademark\"],[14,\"points\",\"134.59 33.33 139.99 33.33 139.99 34.34 137.87 34.34 137.87 40 136.7 40 136.7 34.34 134.59 34.34 134.59 33.33\"],[12],[13],[1,\"\\n    \"],[10,\"polygon\"],[14,0,\"trademark\"],[14,\"points\",\"141.07 33.33 142.71 33.33 144.55 38.55 144.57 38.55 146.36 33.33 147.99 33.33 147.99 40 146.88 40 146.88 34.85 146.86 34.85 145.01 40 144.05 40 142.2 34.85 142.18 34.85 142.18 40 141.07 40 141.07 33.33\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"g\"],[14,0,\"letters\"],[12],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M169.86,40V0h31.52V8.8H180.53v7.36h20.85V25H180.53V40Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M237,22.67V40H215q-4.54,0-7-2.08a6.82,6.82,0,0,1-2.43-5.44A8,8,0,0,1,208,26.53,42.42,42.42,0,0,1,213.65,22l9.07-6.24H205.86V8h14q9.17,0,13.12,3.87T237,22.67Zm-18.88,9.6h9.34l.1-10.56-9.65,7.46c-.6.47-1,.81-1.28,1a1.16,1.16,0,0,0-.37.88,1,1,0,0,0,.43.88A2.56,2.56,0,0,0,218.07,32.27Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M243.14,40V8H263q7,0,10.14,3.52t3.14,9.55V40H266.13V20.8a5.69,5.69,0,0,0-.83-3.49c-.55-.7-1.61-1-3.17-1h-8.86V40Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M280.42,15.73V8h5.18V1.49h9.33V8h17.33v7.73H294.93v13a3.66,3.66,0,0,0,.85,2.8,4.05,4.05,0,0,0,2.78.78h5.17V40h-6.35q-6.61,0-9.46-2.8c-1.91-1.87-2.86-4.7-2.86-8.51v-13Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M340.1,22.67V40H318.18q-4.53,0-7-2.08a6.82,6.82,0,0,1-2.43-5.44,8,8,0,0,1,2.32-5.95A42.42,42.42,0,0,1,316.79,22l9.07-6.24H309V8h14q9.18,0,13.12,3.87T340.1,22.67Zm-18.88,9.6h9.34l.1-10.56L321,29.17c-.61.47-1,.81-1.28,1a1.17,1.17,0,0,0-.38.88,1,1,0,0,0,.43.88A2.62,2.62,0,0,0,321.22,32.27Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M363.89,28.8l-8.7-1.71a14.6,14.6,0,0,1-7.33-3.36,8.39,8.39,0,0,1-2.53-6.4,9.11,9.11,0,0,1,.72-3.57,7.86,7.86,0,0,1,2.24-3,11.24,11.24,0,0,1,3.89-2A18.77,18.77,0,0,1,357.81,8H373.7v7.73H357a3.32,3.32,0,0,0-2.13.48,1.42,1.42,0,0,0-.54,1.07,1.53,1.53,0,0,0,.48,1.12,3.1,3.1,0,0,0,1.65.69l7.9,1.55c3.91.78,6.71,1.95,8.4,3.49a8,8,0,0,1,2.53,6.16,8.66,8.66,0,0,1-3.28,7Q368.74,40,362.07,40H346.39V32.27h17.39a3.42,3.42,0,0,0,2.21-.48,1.61,1.61,0,0,0,.51-1.23,1.24,1.24,0,0,0-.72-1.17A6.7,6.7,0,0,0,363.89,28.8Z\"],[12],[13],[1,\"\\n    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M394.82,27.15a1.39,1.39,0,0,0,.53.77,1.16,1.16,0,0,0,.59.19.86.86,0,0,0,.56-.19,1.7,1.7,0,0,0,.45-.77L403.19,8H414L402.5,39a13.8,13.8,0,0,1-4.88,6.43Q394.18,48,388.42,48h-8.75V39.52h9.66a4.19,4.19,0,0,0,2.9-.88,6.8,6.8,0,0,0,1.68-2.91l.38-1.06h-2.56a5.69,5.69,0,0,1-5.82-3.9L376.63,8h11.15Z\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\\n\\n\\t\\t\\t  \"],[10,0],[14,0,\"powered-by  powered-by--white powered-by--md web-footer__powered-by\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"powered-by__label\"],[12],[1,\"Powered by\"],[13],[1,\"\\n    \"],[10,0],[14,0,\"logo    logo--playon logo--default logo--svg  logo--horizontal powered-by__logo\"],[14,\"aria-label\",\"playon\"],[12],[1,\"\\n    \"],[3,\"?xml version=\\\"1.0\\\" encoding=\\\"utf-8\\\"?\"],[1,\"\\n\"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"version\",\"1.1\"],[14,1,\"Layer_1\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"xmlns:xlink\",\"http://www.w3.org/1999/xlink\",\"http://www.w3.org/2000/xmlns/\"],[14,\"x\",\"0px\"],[14,\"y\",\"0px\"],[14,\"viewBox\",\"164.4 353.8 226.8 48.5\"],[14,\"xml:space\",\"preserve\",\"http://www.w3.org/XML/1998/namespace\"],[12],[1,\"\\n\"],[10,\"style\"],[14,4,\"text/css\"],[12],[1,\"\\n\\t.play{fill:#FFFFFF;}\\n\\t.on{fill:#00CC3D;}\\n\"],[13],[1,\"\\n\"],[10,\"g\"],[12],[1,\"\\n\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M164.4,401.5v-47.1h20.7c8.7,0,12.2,7,12.2,15.7c0,8.9-3.5,15.6-12.3,15.6h-8.8v15.8H164.4L164.4,401.5z\\n\\t\\t\\t M181.7,363.8h-5.5v12.6h5.5c2.8,0,3.7-2.4,3.7-6.2C185.4,366.2,184.5,363.8,181.7,363.8z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M201.6,401.5v-47.1h11.9v37.2h18.6v9.9H201.6L201.6,401.5z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M264.1,401.5l-2.3-8.6h-12.4l-2.4,8.6h-12.2l13.2-47.1H263l13.6,47.1H264.1z M251.4,383.5h8.1l-2.9-13.1\\n\\t\\t\\tc-0.4-1.5-0.9-5.1-1.1-6.7h-0.1c-0.2,1.6-0.7,5.2-1,6.7L251.4,383.5z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M284.7,401.5v-17.9l-14.7-29.3H283l5.8,12.7c0.5,1.1,1.5,3.9,1.9,5.3h0.1c0.4-1.4,1.4-4.2,1.9-5.3l5.8-12.7\\n\\t\\t\\th12.8l-14.7,29.3v17.8H284.7z\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M328.8,402.3c-14.5,0-20-7.6-20-24.2c0-16.6,5.4-24.3,20-24.3c14.5,0,19.8,7.7,19.8,24.3\\n\\t\\t\\tC348.6,394.6,343.3,402.3,328.8,402.3z M328.8,392.1c5.2,0,7.5-2.5,7.5-14.1s-2.3-14.2-7.5-14.2c-5.2,0-7.5,2.6-7.5,14.2\\n\\t\\t\\tC321.3,389.5,323.6,392.1,328.8,392.1z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M378.2,379.3c0.9,2.2,1.8,4.8,2.6,7.6h0.1c-0.2-2.9-0.4-5.7-0.4-8.2l-0.1-24.2h10.6v47.1h-14.3L366,377.1\\n\\t\\t\\tc-0.8-1.8-1.8-4.8-2.5-7.5h-0.1c0.3,2.7,0.4,6,0.4,8.6l0.1,23.4h-10.8v-47.1h14.7L378.2,379.3z\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\\n  \"],[13],[1,\"\\n\\n\\n\\t\\t\\t\"],[10,0],[14,0,\"web-footer__buttons\"],[12],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/login\"],[14,1,\"ember829\"],[14,0,\"button button--flat button--fixed button--block button--uppercase button--theme-inverted button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Log In\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n        \"],[10,3],[14,6,\"/signup\"],[14,1,\"ember830\"],[14,0,\"button button--flat button--fixed button--block button--uppercase button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Sign Up\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\"],[10,0],[14,1,\"ember831\"],[14,0,\"col col--12 col--md-2 col--lg-2 ember-view\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"h3\"],[14,1,\"ember832\"],[14,0,\"heading heading--h3 heading--bold ember-view web-footer__heading\"],[12],[1,\"  Game\\n\"],[13],[1,\"\\n\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/fantasy\"],[14,1,\"ember833\"],[14,0,\"active ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tFantasy\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/leagues\"],[14,1,\"ember834\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tLeagues\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/subs-bank\"],[14,1,\"ember835\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tSubs Bank\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/dynamic-pricing\"],[14,1,\"ember836\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tDynamic Pricing\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/daily-fantasy\"],[14,1,\"ember837\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tDaily Fantasy\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\"],[10,0],[14,1,\"ember838\"],[14,0,\"col col--12 col--md-2 col--lg-2 ember-view\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"h3\"],[14,1,\"ember839\"],[14,0,\"heading heading--h3 heading--bold ember-view web-footer__heading\"],[12],[1,\"  Other\\n\"],[13],[1,\"\\n\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/game-rules\"],[14,1,\"ember840\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tGame Rules\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/points-scoring\"],[14,1,\"ember841\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tPoints Scoring\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/prizes\"],[14,1,\"ember842\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tPrizes\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/faq\"],[14,1,\"ember843\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tFAQ\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,6,\"/what-is-new\"],[14,1,\"ember844\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\tWhat’s New\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\"],[10,0],[14,1,\"ember845\"],[14,0,\"col col--12 col--md-2 col--lg-2 ember-view\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"h3\"],[14,1,\"ember846\"],[14,0,\"heading heading--h3 heading--bold ember-view web-footer__heading\"],[12],[1,\"  More\\n\"],[13],[1,\"\\n\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"https://account.formula1.com/#/en/privacy-policy\"],[14,\"target\",\"formula1\"],[14,0,\"web-footer__item \"],[12],[1,\"Privacy Policy\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/terms-and-conditions\"],[14,1,\"ember847\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tTerms & Conditions\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/team-marketing\"],[14,1,\"ember848\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tTeam Marketing\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"https://www.formula1.com/\"],[14,\"target\",\"playon\"],[14,0,\"web-footer__item \"],[12],[1,\"F1.com\"],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\"],[10,0],[14,1,\"ember849\"],[14,0,\"col col--12 col--md-3 col--lg-3 ember-view web-footer__follow text--left\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"h3\"],[14,1,\"ember850\"],[14,0,\"heading heading--h3 heading--bold ember-view web-footer__heading\"],[12],[1,\"  Follow\\n\"],[13],[1,\"\\n\\n\\t\\t\\t\\t\"],[10,3],[14,\"target\",\"facebook\"],[14,6,\"https://www.facebook.com/Formula1/\"],[14,1,\"ember851\"],[14,0,\"button button--icon button--icon-fab button--with-icon ember-view web-footer__anchor \"],[14,\"aria-label\",\"facebook\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,1,\"ember852\"],[14,0,\"button__icon icon fab fa-facebook-f icon--fab icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\"],[3,\"\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,\"target\",\"twitter\"],[14,6,\"https://twitter.com/F1?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor\"],[14,1,\"ember853\"],[14,0,\"button button--icon button--icon-fab button--with-icon ember-view web-footer__anchor \"],[14,\"aria-label\",\"twitter\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,1,\"ember854\"],[14,0,\"button__icon icon fab fa-twitter icon--fab icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\"],[3,\"\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,\"target\",\"instagram\"],[14,6,\"https://www.instagram.com/f1/?hl=en\"],[14,1,\"ember855\"],[14,0,\"button button--icon button--icon-fab button--with-icon ember-view web-footer__anchor \"],[14,\"aria-label\",\"instagram\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,1,\"ember856\"],[14,0,\"button__icon icon fab fa-instagram icon--fab icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\"],[3,\"\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[10,3],[14,\"target\",\"youtube\"],[14,6,\"https://www.youtube.com/user/Formula1\"],[14,1,\"ember857\"],[14,0,\"button button--icon button--icon-fab button--with-icon ember-view web-footer__anchor \"],[14,\"aria-label\",\"youtube\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,1,\"ember858\"],[14,0,\"button__icon icon fab fa-youtube icon--fab icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\"],[3,\"\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\"],[10,0],[14,1,\"ember859\"],[14,0,\"col col--12 col--md-6 col--lg-6 ember-view text--left\"],[12],[1,\"\\n\\t\\t\\t\"],[10,2],[14,0,\"web-footer__copyright\"],[12],[1,\"\\n\\t\\t\\t\\t© 2021 All rights reserved.\\n\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\"],[10,0],[14,1,\"ember860\"],[14,0,\"col col--12 col--md-6 col--lg-6 ember-view\"],[12],[1,\"\\n\\t\\t\\t\"],[10,0],[14,0,\"language__selector\"],[12],[1,\"\\n\\t\"],[10,0],[14,0,\"select-control language__selector__menu\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n  \"],[10,\"button\"],[14,0,\"btn  btn--text  btn--theme-white btn--themed select-control__button\"],[14,4,\"button\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"btn__label\"],[12],[1,\"\\n      English\\n    \"],[13],[1,\"\\n\\n    \"],[10,1],[14,1,\"ember862\"],[14,0,\"btn__icon btn__icon--right icon icon--unboxed fas fa-chevron-down icon--fas icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\"],[3,\"\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\\n  \"],[3,\"\"],[1,\"\\n\\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\\n\\t\\t\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\"],[13],[13],[1,\"\\n\"]],[]]]]]],[],false,[\"scroll-view-animated\"]]",
    "moduleName": "f1-web/templates/fantasy.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("f1-web/templates/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "CKQzE8an",
    "block": "[[[8,[39,0],null,[[\"@transitions\"],[[30,0,[\"scrollTransitions\"]]]],[[\"default\"],[[[[1,\"\\n\\t\"],[10,0],[14,0,\"web web__homepage\"],[12],[1,\"\\n\\t    \"],[10,\"header\"],[14,0,\"web__header\"],[12],[1,\"\\n\\t      \"],[10,0],[14,0,\"web__header--bg\"],[12],[13],[1,\"\\n\\n\\t        \"],[10,0],[14,0,\"web__header__logo\"],[12],[1,\"\\n\\t          \"],[10,0],[14,0,\"logo    logo--formula-1 logo--default logo--svg  logo--horizontal web__header--logo\"],[14,\"aria-label\",\"formula-1\"],[12],[1,\"\\n\\t    \"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 413.97 48\"],[12],[1,\"\\n\\t  \"],[10,\"g\"],[14,0,\"logo\"],[12],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"f1\"],[14,\"d\",\"M0,40,28,12C38.09,1.91,43.57,0,62.63,0h68.49l-13.9,13.63H65.61c-14.06,0-17.68,1.12-24.6,8L22.53,40Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"f1\"],[14,\"d\",\"M67,17.42c-14.06,0-16.78.63-23.12,7L28.39,40H49.26l5-5.06c2.93-3,4.15-3.78,11.13-3.78H99.49l13.9-13.74Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"polyline\"],[14,0,\"f1\"],[14,\"points\",\"159.88 0 136.02 0 96.02 40 119.72 40 159.88 0\"],[12],[13],[1,\"\\n\\t    \"],[10,\"polygon\"],[14,0,\"trademark\"],[14,\"points\",\"134.59 33.33 139.99 33.33 139.99 34.34 137.87 34.34 137.87 40 136.7 40 136.7 34.34 134.59 34.34 134.59 33.33\"],[12],[13],[1,\"\\n\\t    \"],[10,\"polygon\"],[14,0,\"trademark\"],[14,\"points\",\"141.07 33.33 142.71 33.33 144.55 38.55 144.57 38.55 146.36 33.33 147.99 33.33 147.99 40 146.88 40 146.88 34.85 146.86 34.85 145.01 40 144.05 40 142.2 34.85 142.18 34.85 142.18 40 141.07 40 141.07 33.33\"],[12],[13],[1,\"\\n\\t  \"],[13],[1,\"\\n\\n\\t  \"],[10,\"g\"],[14,0,\"letters\"],[12],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M169.86,40V0h31.52V8.8H180.53v7.36h20.85V25H180.53V40Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M237,22.67V40H215q-4.54,0-7-2.08a6.82,6.82,0,0,1-2.43-5.44A8,8,0,0,1,208,26.53,42.42,42.42,0,0,1,213.65,22l9.07-6.24H205.86V8h14q9.17,0,13.12,3.87T237,22.67Zm-18.88,9.6h9.34l.1-10.56-9.65,7.46c-.6.47-1,.81-1.28,1a1.16,1.16,0,0,0-.37.88,1,1,0,0,0,.43.88A2.56,2.56,0,0,0,218.07,32.27Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M243.14,40V8H263q7,0,10.14,3.52t3.14,9.55V40H266.13V20.8a5.69,5.69,0,0,0-.83-3.49c-.55-.7-1.61-1-3.17-1h-8.86V40Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M280.42,15.73V8h5.18V1.49h9.33V8h17.33v7.73H294.93v13a3.66,3.66,0,0,0,.85,2.8,4.05,4.05,0,0,0,2.78.78h5.17V40h-6.35q-6.61,0-9.46-2.8c-1.91-1.87-2.86-4.7-2.86-8.51v-13Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M340.1,22.67V40H318.18q-4.53,0-7-2.08a6.82,6.82,0,0,1-2.43-5.44,8,8,0,0,1,2.32-5.95A42.42,42.42,0,0,1,316.79,22l9.07-6.24H309V8h14q9.18,0,13.12,3.87T340.1,22.67Zm-18.88,9.6h9.34l.1-10.56L321,29.17c-.61.47-1,.81-1.28,1a1.17,1.17,0,0,0-.38.88,1,1,0,0,0,.43.88A2.62,2.62,0,0,0,321.22,32.27Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M363.89,28.8l-8.7-1.71a14.6,14.6,0,0,1-7.33-3.36,8.39,8.39,0,0,1-2.53-6.4,9.11,9.11,0,0,1,.72-3.57,7.86,7.86,0,0,1,2.24-3,11.24,11.24,0,0,1,3.89-2A18.77,18.77,0,0,1,357.81,8H373.7v7.73H357a3.32,3.32,0,0,0-2.13.48,1.42,1.42,0,0,0-.54,1.07,1.53,1.53,0,0,0,.48,1.12,3.1,3.1,0,0,0,1.65.69l7.9,1.55c3.91.78,6.71,1.95,8.4,3.49a8,8,0,0,1,2.53,6.16,8.66,8.66,0,0,1-3.28,7Q368.74,40,362.07,40H346.39V32.27h17.39a3.42,3.42,0,0,0,2.21-.48,1.61,1.61,0,0,0,.51-1.23,1.24,1.24,0,0,0-.72-1.17A6.7,6.7,0,0,0,363.89,28.8Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M394.82,27.15a1.39,1.39,0,0,0,.53.77,1.16,1.16,0,0,0,.59.19.86.86,0,0,0,.56-.19,1.7,1.7,0,0,0,.45-.77L403.19,8H414L402.5,39a13.8,13.8,0,0,1-4.88,6.43Q394.18,48,388.42,48h-8.75V39.52h9.66a4.19,4.19,0,0,0,2.9-.88,6.8,6.8,0,0,0,1.68-2.91l.38-1.06h-2.56a5.69,5.69,0,0,1-5.82-3.9L376.63,8h11.15Z\"],[12],[13],[1,\"\\n\\t  \"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\t\"],[13],[1,\"\\n\\n\\t          \"],[10,1],[14,0,\"web__header__logo__year\"],[12],[1,\"2021\"],[13],[1,\"\\n\\t        \"],[13],[1,\"\\n\\n\\t        \"],[10,\"h1\"],[14,0,\"web__header--title\"],[12],[1,\"The Official Formula 1 \"],[10,\"br\"],[14,0,\"web__break\"],[12],[13],[1,\"Fantasy Game\"],[13],[1,\"\\n\\n\\t        \"],[10,3],[14,6,\"https://account.formula1.com/#/en/register?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fteam%2Fcreate%3Ffrom%3Dsignup\"],[14,1,\"ember91\"],[14,0,\"button button--flat button--fixed button--head button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n\\t        Play now\\n\\t    \"],[13],[1,\"\\n\\n\\t\"],[3,\"\"],[13],[1,\"\\n\\n\\t  \\n\\n\\t\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\t      \"],[10,2],[14,0,\"web__default-text web__white-text text--center\"],[12],[1,\"\\n\\t        Already registered? \"],[10,3],[14,6,\"https://account.formula1.com/#/en/login?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fmy-teams%3Ffrom%3Dlogin\"],[14,1,\"ember92\"],[14,0,\"button button--underscored ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n\\t        Log in\\n\\t    \"],[13],[1,\"\\n\\n\\t\"],[3,\"\"],[13],[1,\"\\n\\n\\t  \\n\\n\\t\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t      \"],[13],[1,\"\\n\\n\\t        \"],[10,0],[14,0,\"powered-by  powered-by--fluid web__powered-by web__powered-by--bottom\"],[12],[1,\"\\n\\t    \"],[10,1],[14,0,\"powered-by__label\"],[12],[1,\"Powered by\"],[13],[1,\"\\n\\t    \"],[10,0],[14,0,\"logo    logo--playon logo--default logo--svg  logo--horizontal powered-by__logo\"],[14,\"aria-label\",\"playon\"],[12],[1,\"\\n\\t    \"],[3,\"?xml version=\\\"1.0\\\" encoding=\\\"utf-8\\\"?\"],[1,\"\\n\\t\"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"version\",\"1.1\"],[14,1,\"Layer_1\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"xmlns:xlink\",\"http://www.w3.org/1999/xlink\",\"http://www.w3.org/2000/xmlns/\"],[14,\"x\",\"0px\"],[14,\"y\",\"0px\"],[14,\"viewBox\",\"164.4 353.8 226.8 48.5\"],[14,\"xml:space\",\"preserve\",\"http://www.w3.org/XML/1998/namespace\"],[12],[1,\"\\n\\t\"],[10,\"style\"],[14,4,\"text/css\"],[12],[1,\"\\n\\t\\t.play{fill:#FFFFFF;}\\n\\t\\t.on{fill:#00CC3D;}\\n\\t\"],[13],[1,\"\\n\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M164.4,401.5v-47.1h20.7c8.7,0,12.2,7,12.2,15.7c0,8.9-3.5,15.6-12.3,15.6h-8.8v15.8H164.4L164.4,401.5z\\n\\t\\t\\t\\t M181.7,363.8h-5.5v12.6h5.5c2.8,0,3.7-2.4,3.7-6.2C185.4,366.2,184.5,363.8,181.7,363.8z\"],[12],[13],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M201.6,401.5v-47.1h11.9v37.2h18.6v9.9H201.6L201.6,401.5z\"],[12],[13],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M264.1,401.5l-2.3-8.6h-12.4l-2.4,8.6h-12.2l13.2-47.1H263l13.6,47.1H264.1z M251.4,383.5h8.1l-2.9-13.1\\n\\t\\t\\t\\tc-0.4-1.5-0.9-5.1-1.1-6.7h-0.1c-0.2,1.6-0.7,5.2-1,6.7L251.4,383.5z\"],[12],[13],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M284.7,401.5v-17.9l-14.7-29.3H283l5.8,12.7c0.5,1.1,1.5,3.9,1.9,5.3h0.1c0.4-1.4,1.4-4.2,1.9-5.3l5.8-12.7\\n\\t\\t\\t\\th12.8l-14.7,29.3v17.8H284.7z\"],[12],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M328.8,402.3c-14.5,0-20-7.6-20-24.2c0-16.6,5.4-24.3,20-24.3c14.5,0,19.8,7.7,19.8,24.3\\n\\t\\t\\t\\tC348.6,394.6,343.3,402.3,328.8,402.3z M328.8,392.1c5.2,0,7.5-2.5,7.5-14.1s-2.3-14.2-7.5-14.2c-5.2,0-7.5,2.6-7.5,14.2\\n\\t\\t\\t\\tC321.3,389.5,323.6,392.1,328.8,392.1z\"],[12],[13],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M378.2,379.3c0.9,2.2,1.8,4.8,2.6,7.6h0.1c-0.2-2.9-0.4-5.7-0.4-8.2l-0.1-24.2h10.6v47.1h-14.3L366,377.1\\n\\t\\t\\t\\tc-0.8-1.8-1.8-4.8-2.5-7.5h-0.1c0.3,2.7,0.4,6,0.4,8.6l0.1,23.4h-10.8v-47.1h14.7L378.2,379.3z\"],[12],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\t\"],[13],[1,\"\\n\\n\\t  \"],[13],[1,\"\\n\\n\\t    \"],[13],[1,\"\\n\\t  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__pick-a-team-panel\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container container--md-boxed container--gutters\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"col col--12 col--md-5 col--offset-md-1\"],[12],[1,\"\\n          \"],[10,\"h2\"],[14,1,\"ember96\"],[14,0,\"heading heading--web heading--h2 heading--bold ember-view\"],[12],[1,\"  Create up to 3 teams\\n\"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"web__default-text web__default-text--lg web__gray-text\"],[12],[1,\"\\n            Pick your team of 5 drivers and 1 constructor, staying \"],[10,\"br\"],[14,0,\"web__break\"],[12],[13],[1,\"under the $100m budget.\\n          \"],[13],[10,\"br\"],[12],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"https://account.formula1.com/#/en/login?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fmy-teams%3Ffrom%3Dlogin\"],[14,1,\"ember97\"],[14,0,\"button button--flat button--fixed button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Pick a team\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"web/fantasy\"],[14,1,\"ember126\"],[14,0,\"button button--flat button--sm button--uppercase button--know-more button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Find out more\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"col--md-6\"],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"panel__image--grid-view\"],[14,\"src\",\"/images/web/homepage/grid.png\"],[14,\"alt\",\"pitch\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__league-panel\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container container--md-boxed container--gutters\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[10,0],[15,0,[29,[\"col--12 col--md-5 col--offset-md-1 \",[52,[30,0,[\"device\",\"type\",\"mobile\"]],\"order-2\"]]]],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"panel__image--league-card\"],[14,\"src\",\"/images/web/homepage/card.png\"],[14,\"alt\",\"card\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"col--12 col--md-5\"],[12],[1,\"\\n          \"],[10,\"h2\"],[14,1,\"ember96\"],[14,0,\"heading heading--web heading--h2 heading--bold ember-view\"],[12],[1,\"Join a league or create your own\\n\"],[13],[1,\"\\n          \"],[10,2],[14,0,\"web__default-text web__default-text--lg web__gray-text\"],[12],[1,\"\\n            Earn bragging rights against family & friends in a private league and take on the world in our public leagues\\n          \"],[13],[10,\"br\"],[12],[13],[1,\"\\n          \"],[10,3],[14,6,\"https://account.formula1.com/#/en/login?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fmy-teams%3Ffrom%3Dlogin\"],[14,1,\"ember119\"],[14,0,\"button button--flat button--fixed button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Play now\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"/leagues\"],[14,1,\"ember126\"],[14,0,\"button button--flat button--sm button--uppercase button--know-more button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Find out more\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__subs-bank-panel\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container container--md-boxed container--gutters\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"col--12 col--md-5 col--offset-md-1\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"web__label\"],[12],[1,\"New\"],[13],[1,\"\\n          \"],[10,\"h2\"],[14,1,\"ember96\"],[14,0,\"heading heading--web heading--h2 heading--bold ember-view\"],[12],[1,\"Subs Bank\\n\\n\"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"web__default-text web__default-text--lg web__gray-text\"],[12],[1,\"\\n            Make up to 3 substitutions for free each \"],[10,\"br\"],[14,0,\"web__break\"],[12],[13],[1,\"raceweek.\\n          \"],[13],[10,\"br\"],[12],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"https://account.formula1.com/#/en/login?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fmy-teams%3Ffrom%3Dlogin\"],[14,1,\"ember119\"],[14,0,\"button button--flat button--fixed button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Play now\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"/web/subs-bank\"],[14,1,\"ember126\"],[14,0,\"button button--flat button--sm button--uppercase button--know-more button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Find out more\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"col--md-6\"],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"panel__image__bank\"],[14,\"src\",\"/images/features/subs-bank.png\"],[14,\"alt\",\"subs-bank\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__dynamic-pricing-panel\"],[12],[1,\"\\n    \"],[10,0],[14,1,\"ember114\"],[14,0,\"container container--md-boxed container--gutters ember-view\"],[12],[1,\"\\n      \"],[10,0],[14,1,\"ember115\"],[14,0,\"row ember-view\"],[12],[1,\"\\n        \"],[10,0],[14,1,\"ember116\"],[14,0,\"col col--md-6 ember-view\"],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"web__dynamic-pricing-panel__card\"],[14,\"src\",\"/images/web/homepage/dynamic-pricing-card.png\"],[14,\"alt\",\"card\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,1,\"ember117\"],[14,0,\"col col--12 col--md-5 col--offset-md-1 ember-view text--left\"],[12],[1,\"\\n          \"],[10,\"h2\"],[14,1,\"ember118\"],[14,0,\"heading heading--web heading--h2 heading--bold ember-view\"],[12],[1,\"  Dynamic Pricing\\n\"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"web__default-text web__white-text web__default-text--lg\"],[12],[1,\"\\n            Take advantage of real-time driver/constructor price changes to increase your $100m budget\\n          \"],[13],[10,\"br\"],[12],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"https://account.formula1.com/#/en/login?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fmy-teams%3Ffrom%3Dlogin\"],[14,1,\"ember119\"],[14,0,\"button button--flat button--fixed button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Play now\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"/dynamic-pricing\"],[14,1,\"ember120\"],[14,0,\"button button--flat button--sm button--uppercase button--know-more button--text ember-view button--know-more--white\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Find out more\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \\n\"],[13],[1,\"\\n\\n      \"],[10,\"img\"],[14,0,\"web__dynamic-pricing-panel__overlay\"],[14,\"src\",\"/images/web/homepage/overlay.png\"],[14,\"alt\",\"overlay\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__prizes-panel\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container container--md-boxed container--gutters\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"col--12 col--md-5 col--offset-md-1\"],[12],[1,\"\\n          \"],[10,\"h2\"],[14,1,\"ember124\"],[14,0,\"heading heading--web heading--dark heading--h2 heading--bold ember-view\"],[12],[1,\"  Prizes\\n\"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"web__default-text web__default-text--lg web__gray-text\"],[12],[1,\"\\n              Become champion in our Global League and win a VIP Paddock Club experience for 2 to a 2022 Grand Prix\\n            \"],[13],[10,\"br\"],[12],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"https://account.formula1.com/#/en/login?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fmy-teams%3Ffrom%3Dlogin\"],[14,1,\"ember119\"],[14,0,\"button button--flat button--fixed button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Play now\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"/prizes\"],[14,1,\"ember126\"],[14,0,\"button button--flat button--sm button--uppercase button--know-more button--theme-white button--themed button--text ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n        Find out more\\n    \"],[13],[1,\"\\n\\n\"],[3,\"\"],[13],[1,\"\\n\\n  \\n\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"col--md-6\"],[12],[1,\"\\n          \"],[10,\"img\"],[14,0,\"web__prizes-panel__img\"],[14,\"src\",\"/images/web/homepage/placeholder.jpg\"],[14,\"alt\",\"Prize\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"web web__gradient-daily-panel\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"container container--md-boxed container--gutters\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"col--12\"],[12],[1,\"\\n          \"],[10,\"h2\"],[14,1,\"ember131\"],[14,0,\"heading heading--web heading--dark heading--h2 heading--bold ember-view\"],[12],[1,\"  Think you know F1®?\\n\"],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"powered-by  powered-by--md  powered-by--theme-grey powered-by--themed web__powered-by\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"powered-by__label\"],[12],[1,\"Powered by\"],[13],[1,\"\\n    \"],[10,0],[14,0,\"logo    logo--playon logo--default logo--svg  logo--horizontal powered-by__logo\"],[14,\"aria-label\",\"playon\"],[12],[1,\"\\n    \"],[3,\"?xml version=\\\"1.0\\\" encoding=\\\"utf-8\\\"?\"],[1,\"\\n\"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"version\",\"1.1\"],[14,1,\"Layer_1\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"xmlns:xlink\",\"http://www.w3.org/1999/xlink\",\"http://www.w3.org/2000/xmlns/\"],[14,\"x\",\"0px\"],[14,\"y\",\"0px\"],[14,\"viewBox\",\"164.4 353.8 226.8 48.5\"],[14,\"xml:space\",\"preserve\",\"http://www.w3.org/XML/1998/namespace\"],[12],[1,\"\\n\"],[10,\"style\"],[14,4,\"text/css\"],[12],[1,\"\\n\\t.play{fill:#FFFFFF;}\\n\\t.on{fill:#00CC3D;}\\n\"],[13],[1,\"\\n\"],[10,\"g\"],[12],[1,\"\\n\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M164.4,401.5v-47.1h20.7c8.7,0,12.2,7,12.2,15.7c0,8.9-3.5,15.6-12.3,15.6h-8.8v15.8H164.4L164.4,401.5z\\n\\t\\t\\t M181.7,363.8h-5.5v12.6h5.5c2.8,0,3.7-2.4,3.7-6.2C185.4,366.2,184.5,363.8,181.7,363.8z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M201.6,401.5v-47.1h11.9v37.2h18.6v9.9H201.6L201.6,401.5z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M264.1,401.5l-2.3-8.6h-12.4l-2.4,8.6h-12.2l13.2-47.1H263l13.6,47.1H264.1z M251.4,383.5h8.1l-2.9-13.1\\n\\t\\t\\tc-0.4-1.5-0.9-5.1-1.1-6.7h-0.1c-0.2,1.6-0.7,5.2-1,6.7L251.4,383.5z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M284.7,401.5v-17.9l-14.7-29.3H283l5.8,12.7c0.5,1.1,1.5,3.9,1.9,5.3h0.1c0.4-1.4,1.4-4.2,1.9-5.3l5.8-12.7\\n\\t\\t\\th12.8l-14.7,29.3v17.8H284.7z\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M328.8,402.3c-14.5,0-20-7.6-20-24.2c0-16.6,5.4-24.3,20-24.3c14.5,0,19.8,7.7,19.8,24.3\\n\\t\\t\\tC348.6,394.6,343.3,402.3,328.8,402.3z M328.8,392.1c5.2,0,7.5-2.5,7.5-14.1s-2.3-14.2-7.5-14.2c-5.2,0-7.5,2.6-7.5,14.2\\n\\t\\t\\tC321.3,389.5,323.6,392.1,328.8,392.1z\"],[12],[13],[1,\"\\n\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M378.2,379.3c0.9,2.2,1.8,4.8,2.6,7.6h0.1c-0.2-2.9-0.4-5.7-0.4-8.2l-0.1-24.2h10.6v47.1h-14.3L366,377.1\\n\\t\\t\\tc-0.8-1.8-1.8-4.8-2.5-7.5h-0.1c0.3,2.7,0.4,6,0.4,8.6l0.1,23.4h-10.8v-47.1h14.7L378.2,379.3z\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[13],[1,\"\\n\\n  \"],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"web__default-text web__default-text--lg web__gray-text\"],[12],[1,\"\\n            Win big with Daily Fantasy F1®, exclusively with PlayON\\n          \"],[13],[1,\"\\n\\n          \"],[10,\"br\"],[12],[13],[1,\"\\n\\n         \"],[10,3],[14,\"target\",\"playon\"],[14,6,\"https://playon.co/f1\"],[14,1,\"ember132\"],[14,0,\"button button--flat button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\"],[3,\"\"],[1,\"\\n      \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n            PLAY DAILY FANTASY\\n          \"],[13],[1,\"\\n  \\n\"],[3,\"\"],[13],[1,\"\\n\\n\"],[3,\"\"],[1,\"\\n\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"/daily-fantasy\"],[14,1,\"ember133\"],[14,0,\"ember-view web__link web__link--uppercase\"],[12],[1,\"\\n            What is daily fantasy?\\n          \"],[13],[1,\"\\n\\n          \"],[10,3],[14,6,\"https://playon.co/f1\"],[14,\"target\",\"playon\"],[14,0,\"panel__image--lobby-preview\"],[14,\"aria-label\",\"Go to PlayON\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\\t\"],[10,0],[14,0,\"web web-footer ember-view\"],[12],[10,0],[14,0,\"container container--xl-boxed container--gutters ember-view\"],[12],[1,\"\\n\\t\\t\"],[10,0],[14,0,\"row ember-view\"],[12],[1,\"\\n\\t\\t\\t\"],[10,0],[14,0,\"col col--12 col--md-3 col--lg-3 ember-view text--left\"],[12],[1,\"\\n\\t\\t\\t\\t\"],[10,0],[14,0,\"logo  logo--centered  logo--formula-1 logo--default logo--svg  logo--horizontal web-footer__logo\"],[14,\"aria-label\",\"formula-1\"],[12],[1,\"\\n\\t    \"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"viewBox\",\"0 0 413.97 48\"],[12],[1,\"\\n\\t  \"],[10,\"g\"],[14,0,\"logo\"],[12],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"f1\"],[14,\"d\",\"M0,40,28,12C38.09,1.91,43.57,0,62.63,0h68.49l-13.9,13.63H65.61c-14.06,0-17.68,1.12-24.6,8L22.53,40Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"f1\"],[14,\"d\",\"M67,17.42c-14.06,0-16.78.63-23.12,7L28.39,40H49.26l5-5.06c2.93-3,4.15-3.78,11.13-3.78H99.49l13.9-13.74Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"polyline\"],[14,0,\"f1\"],[14,\"points\",\"159.88 0 136.02 0 96.02 40 119.72 40 159.88 0\"],[12],[13],[1,\"\\n\\t    \"],[10,\"polygon\"],[14,0,\"trademark\"],[14,\"points\",\"134.59 33.33 139.99 33.33 139.99 34.34 137.87 34.34 137.87 40 136.7 40 136.7 34.34 134.59 34.34 134.59 33.33\"],[12],[13],[1,\"\\n\\t    \"],[10,\"polygon\"],[14,0,\"trademark\"],[14,\"points\",\"141.07 33.33 142.71 33.33 144.55 38.55 144.57 38.55 146.36 33.33 147.99 33.33 147.99 40 146.88 40 146.88 34.85 146.86 34.85 145.01 40 144.05 40 142.2 34.85 142.18 34.85 142.18 40 141.07 40 141.07 33.33\"],[12],[13],[1,\"\\n\\t  \"],[13],[1,\"\\n\\n\\t  \"],[10,\"g\"],[14,0,\"letters\"],[12],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M169.86,40V0h31.52V8.8H180.53v7.36h20.85V25H180.53V40Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M237,22.67V40H215q-4.54,0-7-2.08a6.82,6.82,0,0,1-2.43-5.44A8,8,0,0,1,208,26.53,42.42,42.42,0,0,1,213.65,22l9.07-6.24H205.86V8h14q9.17,0,13.12,3.87T237,22.67Zm-18.88,9.6h9.34l.1-10.56-9.65,7.46c-.6.47-1,.81-1.28,1a1.16,1.16,0,0,0-.37.88,1,1,0,0,0,.43.88A2.56,2.56,0,0,0,218.07,32.27Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M243.14,40V8H263q7,0,10.14,3.52t3.14,9.55V40H266.13V20.8a5.69,5.69,0,0,0-.83-3.49c-.55-.7-1.61-1-3.17-1h-8.86V40Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M280.42,15.73V8h5.18V1.49h9.33V8h17.33v7.73H294.93v13a3.66,3.66,0,0,0,.85,2.8,4.05,4.05,0,0,0,2.78.78h5.17V40h-6.35q-6.61,0-9.46-2.8c-1.91-1.87-2.86-4.7-2.86-8.51v-13Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M340.1,22.67V40H318.18q-4.53,0-7-2.08a6.82,6.82,0,0,1-2.43-5.44,8,8,0,0,1,2.32-5.95A42.42,42.42,0,0,1,316.79,22l9.07-6.24H309V8h14q9.18,0,13.12,3.87T340.1,22.67Zm-18.88,9.6h9.34l.1-10.56L321,29.17c-.61.47-1,.81-1.28,1a1.17,1.17,0,0,0-.38.88,1,1,0,0,0,.43.88A2.62,2.62,0,0,0,321.22,32.27Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M363.89,28.8l-8.7-1.71a14.6,14.6,0,0,1-7.33-3.36,8.39,8.39,0,0,1-2.53-6.4,9.11,9.11,0,0,1,.72-3.57,7.86,7.86,0,0,1,2.24-3,11.24,11.24,0,0,1,3.89-2A18.77,18.77,0,0,1,357.81,8H373.7v7.73H357a3.32,3.32,0,0,0-2.13.48,1.42,1.42,0,0,0-.54,1.07,1.53,1.53,0,0,0,.48,1.12,3.1,3.1,0,0,0,1.65.69l7.9,1.55c3.91.78,6.71,1.95,8.4,3.49a8,8,0,0,1,2.53,6.16,8.66,8.66,0,0,1-3.28,7Q368.74,40,362.07,40H346.39V32.27h17.39a3.42,3.42,0,0,0,2.21-.48,1.61,1.61,0,0,0,.51-1.23,1.24,1.24,0,0,0-.72-1.17A6.7,6.7,0,0,0,363.89,28.8Z\"],[12],[13],[1,\"\\n\\t    \"],[10,\"path\"],[14,0,\"fantasy\"],[14,\"d\",\"M394.82,27.15a1.39,1.39,0,0,0,.53.77,1.16,1.16,0,0,0,.59.19.86.86,0,0,0,.56-.19,1.7,1.7,0,0,0,.45-.77L403.19,8H414L402.5,39a13.8,13.8,0,0,1-4.88,6.43Q394.18,48,388.42,48h-8.75V39.52h9.66a4.19,4.19,0,0,0,2.9-.88,6.8,6.8,0,0,0,1.68-2.91l.38-1.06h-2.56a5.69,5.69,0,0,1-5.82-3.9L376.63,8h11.15Z\"],[12],[13],[1,\"\\n\\t  \"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\t\"],[13],[1,\"\\n\\n\\n\\t\\t\\t\\t  \"],[10,0],[14,0,\"powered-by  powered-by--white powered-by--md web-footer__powered-by\"],[12],[1,\"\\n\\t    \"],[10,1],[14,0,\"powered-by__label\"],[12],[1,\"Powered by\"],[13],[1,\"\\n\\t    \"],[10,0],[14,0,\"logo    logo--playon logo--default logo--svg  logo--horizontal powered-by__logo\"],[14,\"aria-label\",\"playon\"],[12],[1,\"\\n\\t    \"],[3,\"?xml version=\\\"1.0\\\" encoding=\\\"utf-8\\\"?\"],[1,\"\\n\\t\"],[10,\"svg\"],[14,0,\"logo__image logo__image--svg\"],[14,\"version\",\"1.1\"],[14,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[14,\"xmlns:xlink\",\"http://www.w3.org/1999/xlink\",\"http://www.w3.org/2000/xmlns/\"],[14,\"x\",\"0px\"],[14,\"y\",\"0px\"],[14,\"viewBox\",\"164.4 353.8 226.8 48.5\"],[14,\"xml:space\",\"preserve\",\"http://www.w3.org/XML/1998/namespace\"],[12],[1,\"\\n\\t\"],[10,\"style\"],[14,4,\"text/css\"],[12],[1,\"\\n\\t\\t.play{fill:#FFFFFF;}\\n\\t\\t.on{fill:#00CC3D;}\\n\\t\"],[13],[1,\"\\n\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M164.4,401.5v-47.1h20.7c8.7,0,12.2,7,12.2,15.7c0,8.9-3.5,15.6-12.3,15.6h-8.8v15.8H164.4L164.4,401.5z\\n\\t\\t\\t\\t M181.7,363.8h-5.5v12.6h5.5c2.8,0,3.7-2.4,3.7-6.2C185.4,366.2,184.5,363.8,181.7,363.8z\"],[12],[13],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M201.6,401.5v-47.1h11.9v37.2h18.6v9.9H201.6L201.6,401.5z\"],[12],[13],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M264.1,401.5l-2.3-8.6h-12.4l-2.4,8.6h-12.2l13.2-47.1H263l13.6,47.1H264.1z M251.4,383.5h8.1l-2.9-13.1\\n\\t\\t\\t\\tc-0.4-1.5-0.9-5.1-1.1-6.7h-0.1c-0.2,1.6-0.7,5.2-1,6.7L251.4,383.5z\"],[12],[13],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"play\"],[14,\"d\",\"M284.7,401.5v-17.9l-14.7-29.3H283l5.8,12.7c0.5,1.1,1.5,3.9,1.9,5.3h0.1c0.4-1.4,1.4-4.2,1.9-5.3l5.8-12.7\\n\\t\\t\\t\\th12.8l-14.7,29.3v17.8H284.7z\"],[12],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[10,\"g\"],[12],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M328.8,402.3c-14.5,0-20-7.6-20-24.2c0-16.6,5.4-24.3,20-24.3c14.5,0,19.8,7.7,19.8,24.3\\n\\t\\t\\t\\tC348.6,394.6,343.3,402.3,328.8,402.3z M328.8,392.1c5.2,0,7.5-2.5,7.5-14.1s-2.3-14.2-7.5-14.2c-5.2,0-7.5,2.6-7.5,14.2\\n\\t\\t\\t\\tC321.3,389.5,323.6,392.1,328.8,392.1z\"],[12],[13],[1,\"\\n\\t\\t\\t\"],[10,\"path\"],[14,0,\"on\"],[14,\"d\",\"M378.2,379.3c0.9,2.2,1.8,4.8,2.6,7.6h0.1c-0.2-2.9-0.4-5.7-0.4-8.2l-0.1-24.2h10.6v47.1h-14.3L366,377.1\\n\\t\\t\\t\\tc-0.8-1.8-1.8-4.8-2.5-7.5h-0.1c0.3,2.7,0.4,6,0.4,8.6l0.1,23.4h-10.8v-47.1h14.7L378.2,379.3z\"],[12],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\t\"],[13],[1,\"\\n\\n\\t  \"],[13],[1,\"\\n\\n\\n\\t\\t\\t\\t\"],[10,0],[14,0,\"web-footer__buttons\"],[12],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"https://account.formula1.com/#/en/login?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fmy-teams%3Ffrom%3Dlogin\"],[14,0,\"button button--flat button--fixed button--block button--uppercase button--theme-inverted button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n\\t        Log In\\n\\t    \"],[13],[1,\"\\n\\n\\t\"],[3,\"\"],[13],[1,\"\\n\\n\\t  \\n\\n\\t\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t        \"],[10,3],[14,6,\"https://account.formula1.com/#/en/register?lead_source=web_fantasy&redirect=https%3A%2F%2Ffantasy.formula1.com%2Fteam%2Fcreate%3Ffrom%3Dsignup\"],[14,0,\"button button--flat button--fixed button--block button--uppercase button--theme-accent button--themed button--contained ember-view\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t    \"],[10,1],[14,0,\"button__label\"],[12],[1,\"\\n\\t        Sign Up\\n\\t    \"],[13],[1,\"\\n\\n\\t\"],[3,\"\"],[13],[1,\"\\n\\n\\t  \\n\\n\\t\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\"],[10,0],[14,0,\"col col--12 col--md-2 col--lg-2 ember-view\"],[12],[1,\"\\n\\t\\t\\t\\t\"],[10,\"h3\"],[14,0,\"heading heading--h3 heading--bold ember-view web-footer__heading\"],[12],[1,\"  Game\\n\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/fantasy\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tFantasy\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/leagues\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tLeagues\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/subs-bank\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tSubs Bank\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/dynamic-pricing\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tDynamic Pricing\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/daily-fantasy\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tDaily Fantasy\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\"],[10,0],[14,0,\"col col--12 col--md-2 col--lg-2 ember-view\"],[12],[1,\"\\n\\t\\t\\t\\t\"],[10,\"h3\"],[14,0,\"heading heading--h3 heading--bold ember-view web-footer__heading\"],[12],[1,\"  Other\\n\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/game-rules\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tGame Rules\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/points-scoring\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tPoints Scoring\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/prizes\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tPrizes\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/faq\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tFAQ\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/what-is-new\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\tWhat’s New\\n\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\"],[10,0],[14,0,\"col col--12 col--md-2 col--lg-2 ember-view\"],[12],[1,\"\\n\\t\\t\\t\\t\"],[10,\"h3\"],[14,0,\"heading heading--h3 heading--bold ember-view web-footer__heading\"],[12],[1,\"  More\\n\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"https://account.formula1.com/#/en/privacy-policy\"],[14,\"target\",\"formula1\"],[14,0,\"web-footer__item \"],[12],[1,\"Privacy Policy\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/terms-and-conditions\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\t\\tTerms & Conditions\\n\\t\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"/team-marketing\"],[14,0,\"ember-view web-footer__item \"],[12],[1,\"\\n\\t\\t\\t\\t\\t\\t\\tTeam Marketing\\n\\t\\t\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\\t\"],[10,3],[14,6,\"https://www.formula1.com/\"],[14,\"target\",\"playon\"],[14,0,\"web-footer__item \"],[12],[1,\"F1.com\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\"],[10,0],[14,0,\"col col--12 col--md-3 col--lg-3 ember-view web-footer__follow text--left\"],[12],[1,\"\\n\\t\\t\\t\\t\"],[10,\"h3\"],[14,0,\"heading heading--h3 heading--bold ember-view web-footer__heading\"],[12],[1,\"  Follow\\n\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\\t\\t\"],[10,3],[14,\"target\",\"facebook\"],[14,6,\"https://www.facebook.com/Formula1/\"],[14,0,\"button button--icon button--icon-fab button--with-icon ember-view web-footer__anchor \"],[14,\"aria-label\",\"facebook\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t      \"],[10,1],[14,0,\"button__icon icon fab fa-facebook-f icon--fab icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\\t\"],[3,\"\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\t\"],[3,\"\"],[1,\"\\n\\t\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,\"target\",\"twitter\"],[14,6,\"https://twitter.com/F1?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor\"],[14,0,\"button button--icon button--icon-fab button--with-icon ember-view web-footer__anchor \"],[14,\"aria-label\",\"twitter\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t      \"],[10,1],[14,0,\"button__icon icon fab fa-twitter icon--fab icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\\t\"],[3,\"\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\t\"],[3,\"\"],[1,\"\\n\\t\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,\"target\",\"instagram\"],[14,6,\"https://www.instagram.com/f1/?hl=en\"],[14,0,\"button button--icon button--icon-fab button--with-icon ember-view web-footer__anchor \"],[14,\"aria-label\",\"instagram\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t      \"],[10,1],[14,0,\"button__icon icon fab fa-instagram icon--fab icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\\t\"],[3,\"\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\t\"],[3,\"\"],[1,\"\\n\\t\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\\t\\t\\t\\t\"],[10,3],[14,\"target\",\"youtube\"],[14,6,\"https://www.youtube.com/user/Formula1\"],[14,0,\"button button--icon button--icon-fab button--with-icon ember-view web-footer__anchor \"],[14,\"aria-label\",\"youtube\"],[12],[10,0],[14,0,\"button__inner\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t      \"],[10,1],[14,0,\"button__icon icon fab fa-youtube icon--fab icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\\t\"],[3,\"\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\t\"],[3,\"\"],[1,\"\\n\\t\"],[10,0],[14,0,\"ripple button__ripple\"],[12],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\"],[10,0],[14,0,\"col col--12 col--md-6 col--lg-6 ember-view text--left\"],[12],[1,\"\\n\\t\\t\\t\\t\"],[10,2],[14,0,\"web-footer__copyright\"],[12],[1,\"\\n\\t\\t\\t\\t\\t© 2021 All rights reserved.\\n\\t\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\"],[10,0],[14,0,\"col col--12 col--md-6 col--lg-6 ember-view\"],[12],[1,\"\\n\\t\\t\\t\\t\"],[10,0],[14,0,\"language__selector\"],[12],[1,\"\\n\\t\\t\"],[10,0],[14,0,\"select-control language__selector__menu\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t  \"],[10,\"button\"],[14,0,\"btn  btn--text  btn--theme-white btn--themed select-control__button\"],[14,4,\"button\"],[12],[1,\"\\n\\t\"],[3,\"\"],[1,\"\\n\\t    \"],[10,1],[14,0,\"btn__label\"],[12],[1,\"\\n\\t      English\\n\\t    \"],[13],[1,\"\\n\\n\\t    \"],[10,1],[14,0,\"btn__icon btn__icon--right icon icon--unboxed fas fa-chevron-down icon--fas icon--font ember-view\"],[12],[3,\"\"],[1,\"\\n\\t\"],[3,\"\"],[13],[1,\"\\n\\t\"],[13],[1,\"\\n\\n\\n\\t  \"],[3,\"\"],[1,\"\\n\\n\\t\"],[13],[1,\"\\n\\n\\t\"],[13],[1,\"\\n\\n\\t\\t\\t\"],[13],[1,\"\\n\\t\\t\"],[13],[1,\"\\n\\n\\t\"],[13],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"]],[],false,[\"scroll-view-animated\",\"if\"]]",
    "moduleName": "f1-web/templates/index.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("f1-web/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("f1-web/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("f1-web/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("f1-web/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;define("f1-web/vendor/scrollmagic/animation.gsap", [], function () {
  "use strict";

  /*!
   * ScrollMagic v2.0.7 (2019-05-07)
   * The javascript library for magical scroll interactions.
   * (c) 2019 Jan Paepke (@janpaepke)
   * Project Website: http://scrollmagic.io
   * 
   * @version 2.0.7
   * @license Dual licensed under MIT license and GPL.
   * @author Jan Paepke - e-mail@janpaepke.de
   *
   * @file ScrollMagic GSAP Animation Plugin.
   *
   * requires: GSAP ~1.14
   * Powered by the Greensock Animation Platform (GSAP): http://www.greensock.com/js
   * Greensock License info at http://www.greensock.com/licensing/
   */

  /**
   * This plugin is meant to be used in conjunction with the Greensock Animation Plattform.  
   * It offers an easy API to trigger Tweens or synchronize them to the scrollbar movement.
   *
   * Both the `lite` and the `max` versions of the GSAP library are supported.  
   * The most basic requirement is `TweenLite`.
   * 
   * To have access to this extension, please include `plugins/animation.gsap.js`.
   * @requires {@link http://greensock.com/gsap|GSAP ~1.14.x}
   * @mixin animation.GSAP
   */
  (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['scrollmagic', 'gsap/TweenMax', 'gsap/TimelineMax'], factory);
    } else if (typeof exports === 'object') {
      // CommonJS
      // Loads whole gsap package onto global scope.
      require("gsap");

      factory(require("scrollmagic"), TweenMax, TimelineMax);
    } else {
      // Browser globals
      factory(root.ScrollMagic || root.jQuery && root.jQuery.ScrollMagic, root.TweenMax || root.TweenLite, root.TimelineMax || root.TimelineLite);
    }
  })(void 0, function (ScrollMagic, Tween, Timeline) {
    "use strict";

    var NAMESPACE = "animation.gsap";
    var console = window.console || {},
        err = Function.prototype.bind.call(console.error || console.log || function () {}, console);

    if (!ScrollMagic) {
      err("(" + NAMESPACE + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
    }

    if (!Tween) {
      err("(" + NAMESPACE + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs.");
    }
    /*
     * ----------------------------------------------------------------
     * Extensions for Scene
     * ----------------------------------------------------------------
     */

    /**
     * Every instance of ScrollMagic.Scene now accepts an additional option.  
     * See {@link ScrollMagic.Scene} for a complete list of the standard options.
     * @memberof! animation.GSAP#
     * @method new ScrollMagic.Scene(options)
     * @example
     * var scene = new ScrollMagic.Scene({tweenChanges: true});
     *
     * @param {object} [options] - Options for the Scene. The options can be updated at any time.
     * @param {boolean} [options.tweenChanges=false] - Tweens Animation to the progress target instead of setting it.  
     												  Does not affect animations where duration is `0`.
     */

    /**
     * **Get** or **Set** the tweenChanges option value.  
     * This only affects scenes with a duration. If `tweenChanges` is `true`, the progress update when scrolling will not be immediate, but instead the animation will smoothly animate to the target state.  
     * For a better understanding, try enabling and disabling this option in the [Scene Manipulation Example](../examples/basic/scene_manipulation.html).
     * @memberof! animation.GSAP#
     * @method Scene.tweenChanges
     * 
     * @example
     * // get the current tweenChanges option
     * var tweenChanges = scene.tweenChanges();
     *
     * // set new tweenChanges option
     * scene.tweenChanges(true);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {boolean} [newTweenChanges] - The new tweenChanges setting of the scene.
     * @returns {boolean} `get` -  Current tweenChanges option value.
     * @returns {Scene} `set` -  Parent object for chaining.
     */
    // add option (TODO: DOC (private for dev))


    ScrollMagic.Scene.addOption("tweenChanges", // name
    false, // default
    function (val) {
      // validation callback
      return !!val;
    }); // extend scene

    ScrollMagic.Scene.extend(function () {
      var Scene = this,
          _tween;

      var log = function () {
        if (Scene._log) {
          // not available, when main source minified
          Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ")", "->");

          Scene._log.apply(this, arguments);
        }
      }; // set listeners


      Scene.on("progress.plugin_gsap", function () {
        updateTweenProgress();
      });
      Scene.on("destroy.plugin_gsap", function (e) {
        Scene.removeTween(e.reset);
      });
      /**
       * Update the tween progress to current position.
       * @private
       */

      var updateTweenProgress = function () {
        if (_tween) {
          var progress = Scene.progress(),
              state = Scene.state();

          if (_tween.repeat && _tween.repeat() === -1) {
            // infinite loop, so not in relation to progress
            if (state === 'DURING' && _tween.paused()) {
              _tween.play();
            } else if (state !== 'DURING' && !_tween.paused()) {
              _tween.pause();
            }
          } else if (progress != _tween.progress()) {
            // do we even need to update the progress?
            // no infinite loop - so should we just play or go to a specific point in time?
            if (Scene.duration() === 0) {
              // play the animation
              if (progress > 0) {
                // play from 0 to 1
                _tween.play();
              } else {
                // play from 1 to 0
                _tween.reverse();
              }
            } else {
              // go to a specific point in time
              if (Scene.tweenChanges() && _tween.tweenTo) {
                // go smooth
                _tween.tweenTo(progress * _tween.duration());
              } else {
                // just hard set it
                _tween.progress(progress).pause();
              }
            }
          }
        }
      };
      /**
       * Add a tween to the scene.  
       * If you want to add multiple tweens, add them into a GSAP Timeline object and supply it instead (see example below).  
       * 
       * If the scene has a duration, the tween's duration will be projected to the scroll distance of the scene, meaning its progress will be synced to scrollbar movement.  
       * For a scene with a duration of `0`, the tween will be triggered when scrolling forward past the scene's trigger position and reversed, when scrolling back.  
       * To gain better understanding, check out the [Simple Tweening example](../examples/basic/simple_tweening.html).
       *
       * Instead of supplying a tween this method can also be used as a shorthand for `TweenMax.to()` (see example below).
       * @memberof! animation.GSAP#
       *
       * @example
       * // add a single tween directly
       * scene.setTween(TweenMax.to("obj"), 1, {x: 100});
       *
       * // add a single tween via variable
       * var tween = TweenMax.to("obj"), 1, {x: 100};
       * scene.setTween(tween);
       *
       * // add multiple tweens, wrapped in a timeline.
       * var timeline = new TimelineMax();
       * var tween1 = TweenMax.from("obj1", 1, {x: 100});
       * var tween2 = TweenMax.to("obj2", 1, {y: 100});
       * timeline
       *		.add(tween1)
       *		.add(tween2);
       * scene.addTween(timeline);
       *
       * // short hand to add a TweenMax.to() tween
       * scene.setTween("obj3", 0.5, {y: 100});
       *
       * // short hand to add a TweenMax.to() tween for 1 second
       * // this is useful, when the scene has a duration and the tween duration isn't important anyway
       * scene.setTween("obj3", {y: 100});
       *
       * @param {(object|string)} TweenObject - A TweenMax, TweenLite, TimelineMax or TimelineLite object that should be animated in the scene. Can also be a Dom Element or Selector, when using direct tween definition (see examples).
       * @param {(number|object)} duration - A duration for the tween, or tween parameters. If an object containing parameters are supplied, a default duration of 1 will be used.
       * @param {object} params - The parameters for the tween
       * @returns {Scene} Parent object for chaining.
       */


      Scene.setTween = function (TweenObject, duration, params) {
        var newTween;

        if (arguments.length > 1) {
          if (arguments.length < 3) {
            params = duration;
            duration = 1;
          }

          TweenObject = Tween.to(TweenObject, duration, params);
        }

        try {
          // wrap Tween into a Timeline Object if available to include delay and repeats in the duration and standardize methods.
          if (Timeline) {
            newTween = new Timeline({
              smoothChildTiming: true
            }).add(TweenObject);
          } else {
            newTween = TweenObject;
          }

          newTween.pause();
        } catch (e) {
          log(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject");
          return Scene;
        }

        if (_tween) {
          // kill old tween?
          Scene.removeTween();
        }

        _tween = newTween; // some properties need to be transferred it to the wrapper, otherwise they would get lost.

        if (TweenObject.repeat && TweenObject.repeat() === -1) {
          // TweenMax or TimelineMax Object?
          _tween.repeat(-1);

          _tween.yoyo(TweenObject.yoyo());
        } // Some tween validations and debugging helpers


        if (Scene.tweenChanges() && !_tween.tweenTo) {
          log(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic.");
        } // check if there are position tweens defined for the trigger and warn about it :)


        if (_tween && Scene.controller() && Scene.triggerElement() && Scene.loglevel() >= 2) {
          // controller is needed to know scroll direction.
          var triggerTweens = Tween.getTweensOf(Scene.triggerElement()),
              vertical = Scene.controller().info("vertical");
          triggerTweens.forEach(function (value, index) {
            var tweenvars = value.vars.css || value.vars,
                condition = vertical ? tweenvars.top !== undefined || tweenvars.bottom !== undefined : tweenvars.left !== undefined || tweenvars.right !== undefined;

            if (condition) {
              log(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!");
              return false;
            }
          });
        } // warn about tween overwrites, when an element is tweened multiple times


        if (parseFloat(TweenLite.version) >= 1.14) {
          // onOverwrite only present since GSAP v1.14.0
          var list = _tween.getChildren ? _tween.getChildren(true, true, false) : [_tween],
              // get all nested tween objects
          newCallback = function () {
            log(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another");
          };

          for (var i = 0, thisTween, oldCallback; i < list.length; i++) {
            /*jshint loopfunc: true */
            thisTween = list[i];

            if (oldCallback !== newCallback) {
              // if tweens is added more than once
              oldCallback = thisTween.vars.onOverwrite;

              thisTween.vars.onOverwrite = function () {
                if (oldCallback) {
                  oldCallback.apply(this, arguments);
                }

                newCallback.apply(this, arguments);
              };
            }
          }
        }

        log(3, "added tween");
        updateTweenProgress();
        return Scene;
      };
      /**
       * Remove the tween from the scene.  
       * This will terminate the control of the Scene over the tween.
       *
       * Using the reset option you can decide if the tween should remain in the current state or be rewound to set the target elements back to the state they were in before the tween was added to the scene.
       * @memberof! animation.GSAP#
       *
       * @example
       * // remove the tween from the scene without resetting it
       * scene.removeTween();
       *
       * // remove the tween from the scene and reset it to initial position
       * scene.removeTween(true);
       *
       * @param {boolean} [reset=false] - If `true` the tween will be reset to its initial values.
       * @returns {Scene} Parent object for chaining.
       */


      Scene.removeTween = function (reset) {
        if (_tween) {
          if (reset) {
            _tween.progress(0).pause();
          }

          _tween.kill();

          _tween = undefined;
          log(3, "removed tween (reset: " + (reset ? "true" : "false") + ")");
        }

        return Scene;
      };
    });
  });
});
;

;define('f1-web/config/environment', [], function() {
  var prefix = 'f1-web';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("f1-web/app")["default"].create({"name":"f1-web","version":"0.0.0+e029d440"});
          }
        
//# sourceMappingURL=f1-web.map
