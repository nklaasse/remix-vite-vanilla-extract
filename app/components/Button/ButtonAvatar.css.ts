import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { button } from "./Button.css";

const buttonAvatarContainer = style({
  marginBlock: calc.multiply(theme.space[0.5], -1),

  selectors: {
    [`&:first-child`]: {
      marginInlineStart: calc.multiply(theme.space[0.5], -1),
    },

    [`&:last-child`]: {
      marginInlineEnd: calc.multiply(theme.space[0.5], -1),
    },

    [`${button.variants.sizes.intro} &`]: {
      marginBlock: calc.multiply(theme.space[1], -1),
    },

    [`${button.variants.sizes.intro} &:first-child`]: {
      marginInlineStart: calc.multiply(theme.space[1], -1),
    },

    [`${button.variants.sizes.intro} &:last-child`]: {
      marginInlineEnd: calc.multiply(theme.space[1], -1),
    },
  },
});

export const buttonAvatar = {
  container: buttonAvatarContainer,
};
