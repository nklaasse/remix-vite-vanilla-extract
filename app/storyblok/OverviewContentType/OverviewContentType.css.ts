import { style, styleVariants } from "@vanilla-extract/css";
import { theme, breakpoints } from "~/css";

const mainContainer = style({
  inlineSize: theme.sizes.full,
});

// OVERVIEW SECTION
const backgroundStylesVariants = styleVariants({
  light: {},
  dark: {},
  contrast: {},
});

const sectionVariants = {
  background: backgroundStylesVariants,
};

const sectionGroupContainer = style({
  paddingBlock: theme.sizes[5],

  "@media": {
    [breakpoints["medium"]]: {
      paddingBlock: theme.sizes[6],
    },
    [breakpoints["large"]]: {
      paddingBlock: theme.sizes[7.5],
    },
  },

  background: theme.colors.gray[1],

  selectors: {
    [`&${backgroundStylesVariants["contrast"]}`]: {
      background: theme.colors.gray[2],
    },
  },
});

const sectionContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  inlineSize: theme.sizes.full,

  paddingBlock: theme.sizes[5],

  "@media": {
    [breakpoints["medium"]]: {
      paddingBlock: theme.sizes[6],
    },
    [breakpoints["large"]]: {
      paddingBlock: theme.sizes[7.5],
    },
  },
});

const sectionContentContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  maxInlineSize: theme.sizes.contentContainer,
  inlineSize: theme.sizes.full,

  paddingInline: theme.space[1],

  "@media": {
    [breakpoints["medium"]]: {
      paddingInline: theme.space[0],
    },
  },
});

export const overview = {
  container: mainContainer,
};

export const overviewSection = {
  groupContainer: sectionGroupContainer,
  container: sectionContainer,
  contentContainer: sectionContentContainer,
  variants: sectionVariants,
};
