import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { button } from "./Button.css";

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
  },
});

export const buttonLabel = {
  container: buttonLabelContainer,
};
