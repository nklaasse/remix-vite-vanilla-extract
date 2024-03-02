import { theme } from "~/css/theme.css";
import { keyframes, style, styleVariants } from "@vanilla-extract/css";

const rtlContainer = style({
  selectors: {
    '*[dir="ltr"] &': {
      display: "none",
    },
  },
});

export const rtl = { container: rtlContainer };

const ltrContainer = style({
  selectors: {
    '*[dir="rtl"] &': {
      display: "none",
    },
  },
});

export const ltr = { container: ltrContainer };

const baseAnimations = styleVariants({
  rotate: {},
  still: {},
});

const baseVariants = {
  animations: baseAnimations,
};

const baseContainer = style({
  width: theme.sizes[2.5],
  height: theme.sizes[2.5],

  selectors: {
    [`&${baseAnimations.rotate}`]: {
      animationName: keyframes({
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      }),
      animationDuration: "2s",
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
    },
  },
});

export const base = {
  container: baseContainer,

  variants: baseVariants,
};
