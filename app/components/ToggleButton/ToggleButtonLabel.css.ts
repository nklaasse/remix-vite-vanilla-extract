import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { toggleButton } from "./ToggleButton.css";

const toggleButtonLabelContainer = style({
  ...mixins.typography.inherit,

  display: "inline-flex",

  fontWeight: theme.fontWeights.semiBold,

  boxSizing: "content-box",

  paddingInline: theme.space[1.5],

  selectors: {
    [`${toggleButton.variants.sizes.compact} &`]: {
      paddingInline: theme.space["1"],
    },

    [`${toggleButton.variants.sizes.default} &`]: {
      paddingInline: theme.space["1.5"],
    },

    [`${toggleButton.variants.sizes.intro} &`]: {
      paddingInline: theme.space["1.5"],
    },

    [`${toggleButton.variants.sizes.compact} &:not(:first-child)`]: {
      marginInlineStart: calc.multiply(theme.space[1], -1),
    },

    [`&:not(:first-child)`]: {
      marginInlineStart: calc.multiply(theme.space[1.5], -1),
    },
  },
});

export const toggleButtonLabel = {
  container: toggleButtonLabelContainer,
};
