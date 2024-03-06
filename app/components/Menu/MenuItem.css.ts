import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const menuItemIsHovered = style({});
const menuItemIsPressed = style({});
const menuItemIsFocused = style({});
const menuItemIsDisabled = style({});

const menuItemStates = {
  isHovered: menuItemIsHovered,
  isPressed: menuItemIsPressed,
  isFocused: menuItemIsFocused,
  isDisabled: menuItemIsDisabled,
};

export const menuItemContainer = style({
  ...mixins.typography.text,

  display: "grid",
  gridTemplate: `
    "icon      label        badge       indicator" 1fr
    ".         description  badge       indicator" auto
  /  auto      1fr          max-content max-content
  `,

  paddingInline: theme.space[3],
  paddingBlock: theme.space[1.5],

  color: theme.colors.accent[12],

  textDecoration: "none",
  cursor: "pointer",

  outline: "none",

  "@media": {
    [breakpoints.medium]: {
      paddingInline: theme.space[2],
      paddingBlock: theme.space[1],
    },
  },

  selectors: {
    [`&:is(${menuItemIsHovered}, ${menuItemIsFocused})`]: {
      backgroundColor: theme.colors.accent[4],
    },

    [`&:is(${menuItemIsPressed})`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&:is(${menuItemIsDisabled})`]: {
      color: theme.colors.accent[8],
      backgroundColor: "transparent",

      cursor: "not-allowed",
    },
  },
});

export const menuItem = {
  container: menuItemContainer,

  states: menuItemStates,
};
