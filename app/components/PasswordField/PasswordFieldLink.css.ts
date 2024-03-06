import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const passwordFieldLinkStatesIsHovered = style({});
const passwordFieldLinkStatesIsFocusVisible = style({});
const passwordFieldLinkStatesIsPressed = style({});

const passwordFieldLinkStates = {
  isHovered: passwordFieldLinkStatesIsHovered,
  isFocusVisible: passwordFieldLinkStatesIsFocusVisible,
  isPressed: passwordFieldLinkStatesIsPressed,
};

const passwordFieldLinkContainer = style({
  ...mixins.accents.brand,
  ...mixins.typography.compact,

  color: theme.colors.accent[11],

  display: "inline",
});

export const passwordFieldLink = {
  container: passwordFieldLinkContainer,

  states: passwordFieldLinkStates,
};
