'use strict';

const RoutesResolver = require('@playon/web-framework/lib/build/routes-resolver');
const MenuResolver = require('@playon/web-framework/lib/build/menu-resolver');
const Resolver = require('@playon/web-framework/lib/build/resolver');

const forceProduction = false;
const WHITE_LABEL_DEV_URL = 'http://fantasy-stage.formula1.com:4200';
const WHITE_LABEL_DEVPRO_URL = 'http://fantasy.formula1.com:4200';
const WHITE_LABEL_STAGING_URL = 'https://fantasy-stage.formula1.com';
const WHITE_LABEL_URL = 'https://fantasy.formula1.com';

const PLAYON_API_DEV_URL = 'https://fantasy-stage-api.formula1.com';
const PLAYON_API_STAGING_URL = 'https://fantasy-stage-api.formula1.com';
const PLAYON_API_URL = 'https://fantasy-api.formula1.com';

const FORMULA_1_STAGING_URL_LOGIN =
  'https://account-staging.formula1.com/#/en/login';
const FORMULA_1_STAGING_URL_SIGNUP =
  'https://account-staging.formula1.com/#/en/register';

const FORMULA_1_URL_LOGIN = 'https://account.formula1.com/#/en/login';
const FORMULA_1_URL_SIGNUP = 'https://account.formula1.com/#/en/register';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'f1-web',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    ICON: {
      DRIVER: 'font-awesome',
    },

    APP: {
      subdomain: "",
      subpath: "app",
      
      cache: {
        images: true,
      },

      navigationStack: {
        enabled: true,
      },

      maintenance: false,

      password: {
        enabled: false,
        value: '3zkRWenJM_4]]bB*',
      },

      url: {
        test: WHITE_LABEL_DEV_URL,
        development: forceProduction
          ? WHITE_LABEL_DEVPRO_URL
          : WHITE_LABEL_DEV_URL,
        staging: WHITE_LABEL_STAGING_URL,
        production: WHITE_LABEL_URL,
      },

      menu: MenuResolver(environment),

      api: {
        url: {
          test: PLAYON_API_DEV_URL,
          development: forceProduction ? PLAYON_API_URL : PLAYON_API_DEV_URL,
          staging: PLAYON_API_STAGING_URL,
          production: PLAYON_API_URL,
        },
        namespace: 'partner_games',
      },

      indexRoute: 'index',

      i18n: {
        locale: 'en',
        locales: ['de', 'en', 'es', 'fr', 'it'], // TODO - Refactor AppLocalizable mixin and remove this to use 'languages' only.
        languages: [
          {
            id: 'de',
            alpha2: 'de',
            name: 'Deutsch',
          },
          {
            id: 'en',
            alpha2: 'gb',
            name: 'English',
          },
          {
            id: 'es',
            alpha2: 'es',
            name: 'Español',
          },
          {
            id: 'fr',
            alpha2: 'fr',
            name: 'Français',
          },
          {
            id: 'it',
            alpha2: 'it',
            name: 'Italiano',
          },
        ],
      },

      indexContent: {
        loading: {
          location: "loading",
        },

        'base-url': {
          location: 'base-url',
          content:
            (environment === 'production'
              ? WHITE_LABEL_URL
              : WHITE_LABEL_STAGING_URL) + '/',
        },

        'google-tag-manager': {
          enabled: true,
          location: 'head-footer',
        },

        'external-google-tag-manager': {
          enabled: environment === "production",
          location: 'head-footer',
        },

        'external-facebook-pixel': {
          enabled: environment === "production",
          location: 'head-footer',
        },

        'cookie-banner': {
          location: 'body-footer',
        },

        'double-click': {
          location: 'body-footer',
        },

        'com-score': {
          enabled: environment === "production",
          location: 'body-footer',
        },

        sailthru: {
          enabled: environment === 'production',
          location: 'body-footer',
        },
      },

      advertising: {
        enabled: true,
        driver: 'google',
        config: {
          account: '21703060983',
          site: 'f1_playon_fantasy',
        },
        advertisements: Resolver('advertisements.yaml', environment),
        scriptLocation: 'body-footer',
      },
    },

    WEB: {
      name: 'formula-1',
      external: true,

      url: {
        login: {
          test: FORMULA_1_STAGING_URL_LOGIN,
          development: forceProduction
            ? FORMULA_1_URL_LOGIN
            : FORMULA_1_STAGING_URL_LOGIN,
          staging: FORMULA_1_STAGING_URL_LOGIN,
          production: FORMULA_1_URL_LOGIN,
        },
        signUp: {
          test: FORMULA_1_STAGING_URL_SIGNUP,
          development: forceProduction
            ? FORMULA_1_URL_SIGNUP
            : FORMULA_1_STAGING_URL_SIGNUP,
          staging: FORMULA_1_STAGING_URL_SIGNUP,
          production: FORMULA_1_URL_SIGNUP,
        },
      },

      routes: {
        login: 'login',
        signUp: 'signup',
        afterAuthenticate: 'teams',
        afterSignUp: 'team.create',
      },

      theme: {
        navigationBarBackground: '#E10600', //TODO
      },

      report: {
        email: 'f1@playon.co',
      },

      features: Resolver('features.yaml', environment),
      rules: Resolver('rules.yaml', environment),
      scoring: Resolver('scoring.yaml', environment),

      router: {
        routes: RoutesResolver(environment),
      },
    },

    PLAYON: {
      application: {
        id: 'f1',
        name: 'formula-1',
      },

      options: {
        year: 2022,
        multiSport: false,
        geoRestriction: false,
        signUpOptIn: false,

        poweredBy: true,
      },
    },

    SENTRY: {
      enabled: environment === 'production',
      ignoreErrors: [
        'AbortError',
        'Aborted',
        'TransitionAborted',
        'Unhandled Promise error detected',
        'ScrollMagic.Controller init failed',
        'Sailthru.init is not a function',
      ],
      ignoreErrorsWithMessage: [
        /Network request failed/,
        /ScrollMagic/,
        /Ember Data Request PUT https:\/\/[\s\S.]*\/partner_games\/f1\/users\/.*/,
        /Ember Data Request GET https:\/\/[\s\S.]*\/partner_games\/f1\/favourite_teams\/current.*/,
      ],
      dsn: 'https://fc37d0450c20478387cf612467657489@o117786.ingest.sentry.io/2871222',
    },
  };

  ENV.APP.api.url = ENV.APP.api.url[environment];
  ENV.WEB.url.login = ENV.WEB.url.login[environment];
  ENV.WEB.url.signUp = ENV.WEB.url.signUp[environment];
  ENV.APP.url = ENV.APP.url[environment];

  // if (environment === 'development') { }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
