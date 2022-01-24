'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'asset-cache': {
      exclude: ['assets/chunk.*.js'],
    },

    'ember-service-worker': {
      versionStrategy: 'every-build',
    },

    'esw-cache-fallback': {
      patterns: [],
    },

    svg: {
      optimize: false,
      paths: ['public/images', 'app/svgs'],
    },

    outputPaths: {
      app: {
        css: {
          app: '/assets/f1-web.css',
        },
        js: '/assets/f1-web.js',
      },
    },

    fingerprint: {
      enabled: true,
      generateAssetMap: true,
      exclude: ['images/', 'images/*/', 'translations/moment/'],
    },

    sourcemaps: {
      enabled: true,
      extensions: ['js'],
    },
  });

  return app.toTree();
};
