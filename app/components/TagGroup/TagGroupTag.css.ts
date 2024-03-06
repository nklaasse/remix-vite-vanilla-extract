import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const tagGroupTagIsHovered = style({});
const tagGroupTagIsFocused = style({});
const tagGroupTagIsFocusVisible = style({});
const tagGroupTagIsSelected = style({});
const tagGroupTagIsPressed = style({});

const tagGroupTagStates = {
  isHovered: tagGroupTagIsHovered,
  isFocused: tagGroupTagIsFocused,
  isFocusVisible: tagGroupTagIsFocusVisible,
  isSelected: tagGroupTagIsSelected,
  isPressed: tagGroupTagIsPressed,
};

const tagGroupTagContainer = style({
  padding: theme.space[0.5],

  pointerEvents: "none",

  outline: "none",
});

const tagGroupTagTag = style({
  position: "relative",

  display: "flex",
  flexDirection: "row",

  cursor: "pointer",

  pointerEvents: "initial",

  borderWidth: theme.borderWidths.border,
  borderColor: theme.colors.accent[7],
  borderStyle: "solid",

  borderRadius: theme.radii[1],

  paddingBlock: calc.subtract(theme.space[1.5], theme.borderWidths.border),
  paddingInline: calc.subtract(theme.space[2], theme.borderWidths.border),

  backgroundColor: "transparent",
  color: theme.colors.accent[12],

  selectors: {
    [`:is(${tagGroupTagIsSelected}) &`]: {
      ...mixins.accents.selection,

      borderColor: theme.colors.accent[6],
      backgroundColor: theme.colors.accent[5],
    },

    [`:is(${tagGroupTagIsHovered}) &`]: {
      borderColor: theme.colors.accent[8],
      backgroundColor: theme.colors.accent[4],
    },

    [`:is(${tagGroupTagIsFocused}, ${tagGroupTagIsPressed}) &`]: {
      borderColor: theme.colors.accent[9],
      backgroundColor: theme.colors.accent[5],
    },

    [`:is(${tagGroupTagIsFocusVisible}) &:after`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const tagGroupTag = {
  container: tagGroupTagContainer,
  tag: tagGroupTagTag,

  states: tagGroupTagStates,
};
