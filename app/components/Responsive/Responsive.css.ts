import { breakpoints } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";

const not = (query: string) => `not ${query}`;

const responsiveBreakpoints = {
  min: breakpoints,
  max: breakpoints,
};

const responsiveVariantMin: Record<keyof typeof breakpoints, string> =
  styleVariants({
    small: {},
    medium: {},
    large: {},
    "x-large": {},
    "xx-large": {},
  });

const responsiveVariantMax: Record<keyof typeof breakpoints, string> =
  styleVariants({
    small: {},
    medium: {},
    large: {},
    "x-large": {},
    "xx-large": {},
  });

const responsiveVariants = {
  min: responsiveVariantMin,
  max: responsiveVariantMax,
};

const responsiveContainer = style({
  display: "contents",

  selectors: {
    [`&:is(${responsiveVariantMin.small})`]: {
      "@media": {
        [not(breakpoints.small)]: {
          display: "none",
        },
      },
    },
    [`&:is(${responsiveVariantMin.medium})`]: {
      "@media": {
        [not(breakpoints.medium)]: {
          display: "none",
        },
      },
    },
    [`&:is(${responsiveVariantMin.large})`]: {
      "@media": {
        [not(breakpoints.large)]: {
          display: "none",
        },
      },
    },
    [`&:is(${responsiveVariantMin["x-large"]})`]: {
      "@media": {
        [not(breakpoints["x-large"])]: {
          display: "none",
        },
      },
    },
    [`&:is(${responsiveVariantMin["xx-large"]})`]: {
      "@media": {
        [not(breakpoints["xx-large"])]: {
          display: "none",
        },
      },
    },

    [`&:is(${responsiveVariantMax.small})`]: {
      "@media": {
        [breakpoints.small]: {
          display: "none",
        },
      },
    },
    [`&:is(${responsiveVariantMax.medium})`]: {
      "@media": {
        [breakpoints.medium]: {
          display: "none",
        },
      },
    },
    [`&:is(${responsiveVariantMax.large})`]: {
      "@media": {
        [breakpoints.large]: {
          display: "none",
        },
      },
    },
    [`&:is(${responsiveVariantMax["x-large"]})`]: {
      "@media": {
        [breakpoints["x-large"]]: {
          display: "none",
        },
      },
    },
    [`&:is(${responsiveVariantMax["xx-large"]})`]: {
      "@media": {
        [breakpoints["xx-large"]]: {
          display: "none",
        },
      },
    },
  },
});

export const responsive = {
  container: responsiveContainer,

  breakpoints: responsiveBreakpoints,

  variants: responsiveVariants,
};
