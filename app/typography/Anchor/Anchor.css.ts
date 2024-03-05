import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

// Styles
const anchorStatesIsHovered = style({});
const anchorStatesIsFocusVisible = style({});
const anchorStatesIsPressed = style({});

const anchorStates = {
  isHovered: anchorStatesIsHovered,
  isFocusVisible: anchorStatesIsFocusVisible,
  isPressed: anchorStatesIsPressed,
};

// anchor
const anchorContainer = style({
  ...mixins.typography.text,
  color: theme.colors.brand[10],
  textDecoration: "none",

  selectors: {
    [`&:is(${anchorStatesIsHovered})`]: {
      textDecoration: "underline",
    },

    [`&:is(${anchorStatesIsFocusVisible}, ${anchorStatesIsPressed})`]: {
      textDecoration: "underline double",
    },
  },
});

export const anchor = {
  container: anchorContainer,
  states: anchorStates,
};
