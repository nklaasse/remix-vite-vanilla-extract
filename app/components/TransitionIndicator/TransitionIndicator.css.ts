import { theme } from "~/css";
import { createVar, keyframes, style } from "@vanilla-extract/css";

const animationDuration = createVar();

const primaryTranslate = keyframes({
  "0%": {
    transform: "translateX(0px)",
  },

  "20%": {
    animationTimingFunction: "cubic-bezier(0.5, 0, 0.701732, 0.495819)",
    transform: "translateX(0px)",
  },

  "59.15%": {
    animationTimingFunction: "cubic-bezier(0.302326, 0.381818, 0.55, 0.956364)",
    transform: "translateX(83.6714%)",
  },

  "100%": {
    transform: "translateX(200.611%)",
  },
});

const secondaryTranslate = keyframes({
  "0%": {
    transform: "translateX(0px)",
  },

  "25%": {
    animationTimingFunction: "cubic-bezier(0.31033, 0.284058, 0.8, 0.733712)",
    transform: "translateX(37.6519%)",
  },

  "48.35%": {
    animationTimingFunction: "cubic-bezier(0.4, 0.627035, 0.6, 0.902026)",
    transform: "translateX(84.3862%)",
  },

  "100%": {
    transform: "translateX(160.278%)",
  },
});

const primaryScale = keyframes({
  "0%": {
    transform: "scaleX(0.08)",
  },

  "36.65%": {
    animationTimingFunction: "cubic-bezier(0.334731, 0.12482, 0.785844, 1)",
    transform: "scaleX(0.08)",
  },

  "69.15%": {
    animationTimingFunction: "cubic-bezier(0.06, 0.11, 0.6, 1)",
    transform: "scaleX(0.661479)",
  },

  "100%": {
    transform: "scaleX(0.08)",
  },
});

const secondaryScale = keyframes({
  "0%": {
    animationTimingFunction:
      "cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971)",
    transform: "scaleX(0.08)",
  },

  "19.15%": {
    animationTimingFunction:
      "cubic-bezier(0.152313, 0.196432, 0.648374, 1.00432)",
    transform: "scaleX(0.457104)",
  },

  "44.15%": {
    animationTimingFunction:
      "cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179)",
    transform: "scaleX(0.72796)",
  },

  "100%": {
    transform: "scaleX(0.08)",
  },
});

const transitionIndicatorBar = style({
  position: "absolute",

  animation: "none",
  width: theme.sizes.full,
  height: theme.borderWidths.delimiter,

  vars: {
    [animationDuration]: "6s",
  },
});

const transitionIndicatorPrimaryBar = style([
  transitionIndicatorBar,
  {
    insetInlineStart: "-145.167%",

    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDuration: animationDuration,
    animationName: primaryTranslate,
  },
]);
const transitionIndicatorSecondaryBar = style([
  transitionIndicatorBar,
  {
    insetInlineStart: "-54.8889%",

    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDuration: animationDuration,
    animationName: secondaryTranslate,
  },
]);

const transitionIndicatorFill = style({
  position: "absolute",
  inset: theme.space[0],
  backgroundColor: theme.colors.brand[9],

  selectors: {
    [`:is(${transitionIndicatorPrimaryBar}) &`]: {
      animationName: primaryScale,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationDuration: animationDuration,
    },

    [`:is(${transitionIndicatorSecondaryBar}) &`]: {
      animationName: secondaryScale,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      animationDuration: animationDuration,
    },
  },
});

const transitionIndicatorContainer = style({
  position: "sticky",

  insetInline: theme.space[0],

  insetBlockStart: theme.space[0],

  height: theme.borderWidths.delimiter,

  display: "flex",
});

export const transitionIndicator = {
  container: transitionIndicatorContainer,

  primaryBar: transitionIndicatorPrimaryBar,
  secondaryBar: transitionIndicatorSecondaryBar,

  fill: transitionIndicatorFill,
};
