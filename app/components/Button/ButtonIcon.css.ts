import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { button } from "./Button.css";
import { buttonAvatar } from "./ButtonAvatar.css";

const buttonIconContainer = style({
  display: "inline-flex",

  boxSizing: "content-box",

  padding: theme.space[1],

  marginBlock: calc.multiply(theme.space[1], -1),

  selectors: {
    [`&:first-child`]: {
      marginInlineStart: calc.multiply(theme.space[0.5], -1),
    },

    [`&:last-child`]: {
      marginInlineEnd: calc.multiply(theme.space[0.5], -1),
    },

    [`&:only-child`]: {
      marginInlineStart: calc.multiply(theme.space[1], -1),
      marginInlineEnd: calc.multiply(theme.space[1], -1),
    },

    [`${button.variants.sizes.compact} :not(${buttonAvatar.container}) + &`]: {
      marginInlineStart: calc.multiply(theme.space[1], -1),
    },

    [`:not(${buttonAvatar.container}) + &`]: {
      marginInlineStart: calc.multiply(theme.space[1.5], -1),
    },
  },
});

export const buttonIcon = {
  container: buttonIconContainer,
};
