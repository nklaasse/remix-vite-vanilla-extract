import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { breakpoints } from "~/css";
import { absoluteSizes } from "~/css/_tokens";
import { calc } from "@vanilla-extract/css-utils";

// Headers ==============
const headerContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: absoluteSizes.page,
  width: theme.sizes.full,
  paddingBlock: theme.space["4.5"],
  marginInline: "auto",
});

// Logo ==============
const logoContainer = style({
  flexGrow: 1,
  paddingInlineStart: theme.space[2],
  paddingInlineEnd: theme.space[2],
  textAlign: "center",
  "@media": {
    [breakpoints["x-large"]]: {
      flexGrow: 0,
      paddingInlineStart: "60px",
      paddingInlineEnd: "60px",
    },
  },
});

const logoImg = style({
  width: calc.multiply(theme.sizes[5], 4),
});

// Navigation ==============
const navigationContainer = style({
  display: "none",
  flexDirection: "row",
  flexGrow: 1,
  height: theme.sizes.full,

  "@media": {
    [breakpoints["large"]]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
});

const navigationLink = style({
  ...mixins.typography.intro,
  color: theme.colors.gray[11],
  textDecoration: "none",
  cursor: "pointer",
  marginRight: theme.space["5"],
});

const navigationLinkHoverable = style({
  ":hover": {
    color: theme.colors.brand[10],
  },
});

// CTA ==============
const buttonContainer = style({
  flexShrink: 0,
  display: "none",
  gridAutoFlow: "column",
  gap: `0 ${theme.space["1"]}`,
  paddingInlineEnd: "0px",
  flexDirection: "row",

  "@media": {
    [breakpoints["large"]]: {
      display: "grid",
    },
    [breakpoints["x-large"]]: {
      paddingInlineEnd: "60px",
    },
  },
});

// Mobile ==============
const mobileNavigationContainer = style({
  position: "absolute",
  right: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: theme.sizes.full,
  marginInlineEnd: theme.space["3"],

  "@media": {
    [breakpoints["large"]]: {
      display: "none",
    },
  },
});

// ==============
export const header = {
  container: headerContainer,
};

export const logo = {
  container: logoContainer,
  img: logoImg,
};

export const navigation = {
  container: navigationContainer,
  item: navigationLink,
  hoverable: navigationLinkHoverable,
};

export const ctaGroup = {
  container: buttonContainer,
};

export const mobileMenu = {
  container: mobileNavigationContainer,
};
