export { default as Pin } from "./pin";
export { default as Timeline } from "./timeline";
export { default as Transition } from "./transition";

import T from "./transition";

/**
 * @public
 * @const {Array}
 *
 * @since 1.0.0
 */
export const APP_BAR_PROMINENT_TRANSITIONS = [
  T.create({
    element: ".app-bar--top .app-bar__container",
    transform: { paddingBottom: "15px" },
    duration: 300
  }),

  T.create({
    element: ".app-bar--top .app-bar__title, .app-bar--top .app-bar__heading__title",
    transform: { transform: "scale(0.75, 0.75)", fontWeight: 400, marginTop: 0 },
    duration: 300
  }),

  T.create({
    element: ".app-bar--top .app-bar__heading__subtitle",
    transform: { opacity: 0.0, height: 0, marginTop: 0 },
    duration: 300
  }),

  T.create({
    element: ".app-bar--top .app-bar__background",
    transform: { opacity: 1.0 },
    duration: 300
  }),
];
