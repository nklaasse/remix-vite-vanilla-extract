import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { button } from "./Button.css";
import { buttonAvatar } from "./ButtonAvatar.css";

const buttonLabelContainer = style({
  display: "inline-flex",

  fontWeight: theme.fontWeights.semiBold,

  boxSizing: "content-box",

  selectors: {
    [`${button.variants.sizes.compact} &`]: {
      paddingInline: theme.space[1],
    },

    [`${button.variants.sizes.default} &`]: {
      paddingInline: theme.space[1.5],
    },

    [`${button.variants.sizes.intro} &`]: {
      paddingInline: theme.space[2],
    },

    [`${button.variants.sizes.compact} :not(${buttonAvatar.container}) + &`]: {
      marginInlineStart: calc.multiply(theme.space[1], -1),
    },

    [`:not(${buttonAvatar.container}) + &`]: {
      marginInlineStart: calc.multiply(theme.space[1.5], -1),
    },
  },
});

export const buttonLabel = {
  container: buttonLabelContainer,
};
