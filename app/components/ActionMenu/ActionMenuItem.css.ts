import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const actionMenuItemIsHovered = style({});
const actionMenuItemIsPressed = style({});
const actionMenuItemIsFocused = style({});
const actionMenuItemIsDisabled = style({});

const actionMenuItemStates = {
  isHovered: actionMenuItemIsHovered,
  isPressed: actionMenuItemIsPressed,
  isFocused: actionMenuItemIsFocused,
  isDisabled: actionMenuItemIsDisabled,
};

export const actionMenuItemContainer = style({
  ...mixins.typography.text,

  display: "grid",
  gridTemplate: `
    "icon        label" 1fr
    /  min-content 1fr
  `,

  paddingInline: theme.space[1.5],
  paddingBlock: theme.space[1],

  borderRadius: theme.radii[0.5],

  color: theme.colors.accent[12],

  cursor: "pointer",
  outline: "none",

  "@media": {
    [breakpoints.medium]: {
      paddingInline: theme.space[1],
      paddingBlock: theme.space[0.5],
    },
  },

  selectors: {
    [`&:is(${actionMenuItemIsHovered}, ${actionMenuItemIsFocused})`]: {
      backgroundColor: theme.colors.accent[4],
    },

    [`&:is(${actionMenuItemIsPressed})`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&:is(${actionMenuItemIsDisabled})`]: {
      color: theme.colors.accent[8],
      backgroundColor: "transparent",

      cursor: "not-allowed",
    },
  },
});

export const actionMenuItem = {
  container: actionMenuItemContainer,

  states: actionMenuItemStates,
};
