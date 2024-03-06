import { mixins, modes, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";

const badgeVariant = styleVariants({
  brand: {},
  info: {},
});

const badgeVariants = {
  variant: badgeVariant,
};

const badgeContainer = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  paddingBlock: theme.space[0.5],
  paddingInline: theme.space[1.5],

  borderRadius: theme.radii.circle,

  backgroundColor: theme.colors.accent[9],
  color: theme.colors.gray[1],

  selectors: {
    [`${modes.dark} &`]: {
      color: theme.colors.accent[12],
    },

    [`&:is(${badgeVariant.brand})`]: {
      ...mixins.accents.brand,
    },

    [`&:is(${badgeVariant.info})`]: {
      ...mixins.accents.indigo,
    },
  },
});

const badgeText = style({
  ...mixins.typography.caption,
});

export const badge = {
  container: badgeContainer,
  text: badgeText,

  variants: badgeVariants,
};
