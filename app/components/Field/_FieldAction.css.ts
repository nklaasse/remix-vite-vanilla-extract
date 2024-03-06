import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { field } from "./Field.css";

const fieldActionIsHovered = style({});
const fieldActionIsFocused = style({});
const fieldActionIsFocusVisible = style({});
const fieldActionIsPressed = style({});

const fieldActionStates = {
  isHovered: fieldActionIsHovered,
  isFocused: fieldActionIsFocused,
  isFocusVisible: fieldActionIsFocusVisible,
  isPressed: fieldActionIsPressed,
};

const fieldActionContainer = style({
  ...mixins.typography.text,

  position: "relative",

  display: "flex",

  maxWidth: theme.sizes.full,

  padding: theme.space[0.5],
  marginBlockStart: calc.multiply(theme.space[0.5], -1),
  marginBlockEnd: theme.space[0],

  color: theme.colors.gray[11],

  background: "transparent",
  border: "none",

  boxSizing: "content-box",

  borderRadius: theme.radii[0.5],

  cursor: "pointer",

  outline: "none",

  isolation: "isolate",

  selectors: {
    "&:after, &:before": {
      content: "''",

      position: "absolute",

      zIndex: -1,

      inset: theme.borderWidths.delimiter,

      borderRadius: "inherit",
    },

    [`${field.variants.hideLabel.true} &`]: {
      display: "none",
    },
    [`${field.variants.hideLabel.false} &`]: {},

    [`&:is(${fieldActionIsHovered}, ${fieldActionIsFocused}):before`]: {
      backgroundColor: theme.colors.accent[4],
    },

    [`&:is(${fieldActionIsPressed}):before`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&:is(${fieldActionIsFocusVisible}):after`]: {
      content: "''",

      inset: theme.borderWidths.border,

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]} `,
    },
  },
});

export const fieldAction = {
  container: fieldActionContainer,

  states: fieldActionStates,
};
