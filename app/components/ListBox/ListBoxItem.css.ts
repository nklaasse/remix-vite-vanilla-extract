import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const listBoxItemIsHovered = style({});
const listBoxItemIsPressed = style({});
const listBoxItemisFocused = style({});
const listBoxItemIsSelected = style({});

const listBoxItemStates = {
  isHovered: listBoxItemIsHovered,
  isPressed: listBoxItemIsPressed,
  isFocused: listBoxItemisFocused,
  isSelected: listBoxItemIsSelected,
};

const listBoxItemContainer = style({
  display: "flex",
  flexDirection: "row",

  position: "relative",

  paddingInline: theme.space[3],
  paddingBlock: theme.space[1.5],

  color: theme.colors.accent[12],

  outline: "none",

  cursor: "pointer",

  selectors: {
    [`&:is(${listBoxItemIsHovered}, ${listBoxItemisFocused})`]: {
      backgroundColor: theme.colors.accent[4],
    },

    [`&:is(${listBoxItemIsPressed})`]: {
      backgroundColor: theme.colors.accent[5],
    },
  },

  "@media": {
    [breakpoints.medium]: {
      paddingInline: theme.space[2],
      paddingBlock: theme.space[1],
    },
  },
});

const listBoxItemContent = style({
  flexShrink: 1,
  flexGrow: 0,

  position: "relative",

  display: "grid",
  alignItems: "center",

  width: theme.sizes.full,

  gridTemplate: `
      "icon                       .           " 1fr
      "icon                       label       " min-content
      "icon                       description " min-content
      "icon                       .           " 1fr
    /  minmax(auto, max-content)  1fr
  `,
});

const listBoxItemIndicator = style({
  ...mixins.accents.brand,

  flexShrink: 0,
  flexGrow: 0,

  position: "relative",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  marginInlineStart: theme.space[1],

  visibility: "hidden",

  selectors: {
    [`:is(${listBoxItemIsSelected}) &`]: {
      visibility: "visible",

      color: theme.colors.accent[10],
    },
  },
});

export const listBoxItem = {
  container: listBoxItemContainer,
  content: listBoxItemContent,
  indicator: listBoxItemIndicator,

  states: listBoxItemStates,
};
