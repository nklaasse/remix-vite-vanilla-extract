import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const contextualHelpContainer = style({
  padding: theme.space[2],

  maxWidth: "360px",
  width: "max-content",
});

export const contextualHelp = {
  container: contextualHelpContainer,
};

const actionIsHovered = style({});
const actionIsFocused = style({});
const actionIsFocusVisible = style({});
const actionIsPressed = style({});

const actionStates = {
  isHovered: actionIsHovered,
  isFocused: actionIsFocused,
  isFocusVisible: actionIsFocusVisible,
  isPressed: actionIsPressed,
};

const actionContainer = style({
  ...mixins.typography.text,

  position: "relative",

  display: "inline-flex",

  maxWidth: theme.sizes.full,

  padding: theme.space[0.5],
  marginBlock: calc.multiply(theme.space[0.5], -1),

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

    [`&:is(${actionIsHovered}, ${actionIsFocused}):before`]: {
      backgroundColor: theme.colors.accent[4],
    },

    [`&:is(${actionIsPressed}):before`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&:is(${actionIsFocusVisible}):after`]: {
      content: "''",

      inset: theme.borderWidths.border,

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]} `,
    },
  },
});

export const action = {
  container: actionContainer,

  states: actionStates,
};
