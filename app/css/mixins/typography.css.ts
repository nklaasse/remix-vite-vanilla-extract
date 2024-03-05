import { theme } from "../theme.css";

const heading = {
  fontFamily: theme.fonts.heading,
};

const body = {
  fontFamily: theme.fonts.body,
};

export const typography = {
  "heading-1": {
    ...heading,
    fontSize: theme.fontSizes["heading-1"],
    lineHeight: theme.lineHeights["heading-1"],
    letterSpacing: theme.letterSpacings["heading-1"],
  },
  "heading-2": {
    ...heading,
    fontSize: theme.fontSizes["heading-2"],
    lineHeight: theme.lineHeights["heading-2"],
    letterSpacing: theme.letterSpacings["heading-2"],
  },
  "heading-3": {
    ...heading,
    fontSize: theme.fontSizes["heading-3"],
    lineHeight: theme.lineHeights["heading-3"],
    letterSpacing: theme.letterSpacings["heading-3"],
  },
  "heading-4": {
    ...heading,
    fontSize: theme.fontSizes["heading-4"],
    lineHeight: theme.lineHeights["heading-4"],
    letterSpacing: theme.letterSpacings["heading-4"],
  },
  "heading-5": {
    ...heading,
    fontSize: theme.fontSizes["heading-5"],
    lineHeight: theme.lineHeights["heading-5"],
    letterSpacing: theme.letterSpacings["heading-5"],
  },
  "heading-6": {
    ...heading,
    fontSize: theme.fontSizes["heading-6"],
    lineHeight: theme.lineHeights["heading-6"],
    letterSpacing: theme.letterSpacings["heading-6"],
  },
  intro: {
    ...body,
    fontSize: theme.fontSizes["intro"],
    lineHeight: theme.lineHeights["intro"],
  },
  text: {
    ...body,
    fontSize: theme.fontSizes["text"],
    lineHeight: theme.lineHeights["text"],
  },
  compact: {
    ...body,
    fontSize: theme.fontSizes["compact"],
    lineHeight: theme.lineHeights["compact"],
  },
  caption: {
    ...body,
    fontSize: theme.fontSizes["caption"],
    lineHeight: theme.lineHeights["caption"],
  },
  small: {
    ...body,
    fontSize: theme.fontSizes["small"],
    lineHeight: theme.lineHeights["small"],
  },
  inherit: {
    lineHeight: "inherit",
    fontSize: "inherit",
    fontFamily: "inherit",
    fontWeight: "inherit",
    letterSpacing: "inherit",
  },
};
