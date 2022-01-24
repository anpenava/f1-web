/* global module */

'use strict';

module.exports = function(/* environment, appConfig */) {
  const themeColor = "#E10600";
  const backgroundColor = "#F5F5F5";

  return {
    name: "F1 Fantasy",
    short_name: "F1 Fantasy",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: [
      // Favicons
      ...[16, 32, 48].map(size => ({
        src: `/app-icon-${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        targets: ['favicon'],
      })),

      // App Icons
      ...[192, 512].map(size => ({
        src: `/app-icon-${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        targets: ['manifest'],
      })),

      // iOS Icons
      ...[120, 152, 167, 180].map(size => ({
        src: `/app-icon-${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        targets: ['apple'],
      })),
    ],
    apple: {
      statusBarStyle: "black"
    },
    ms: {
      tileColor: themeColor
    }
  };
};
