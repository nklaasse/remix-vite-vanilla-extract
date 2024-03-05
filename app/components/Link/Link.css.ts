import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const linkStatesIsHovered = style({});
const linkStatesIsFocusVisible = style({});
const linkStatesIsPressed = style({});

const linkStates = {
  isHovered: linkStatesIsHovered,
  isFocusVisible: linkStatesIsFocusVisible,
  isPressed: linkStatesIsPressed,
};

const linkContainer = style({
  ...mixins.typography.inherit,

  display: "inline",

  position: "relative",

  color: "inherit",

  fontWeight: theme.fontWeights.semiBold,

  textDecoration: "none",

  outline: "none",

  cursor: "pointer",

  borderRadius: theme.radii[0.5],

  selectors: {
    [`&:is(${linkStatesIsHovered})`]: {
      textDecoration: "underline",
    },

    [`&:is(${linkStatesIsFocusVisible}, ${linkStatesIsPressed})`]: {
      textDecoration: "underline double",
    },
  },
});

export const link = {
  container: linkContainer,

  states: linkStates,
};
