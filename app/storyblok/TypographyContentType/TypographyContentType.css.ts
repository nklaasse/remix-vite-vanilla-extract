import { style } from "@vanilla-extract/css";
import { theme, mixins, breakpoints } from "~/css";

const typographyContainer = style({
  maxInlineSize: theme.sizes.textContainer,
});

const typographyTitle = style({
  ...mixins.typography["heading-4"],

  marginBlockEnd: theme.space["2.5"],

  "@media": {
    [breakpoints["large"]]: {
      ...mixins.typography["heading-1"],
    },
  },
});

export const typography = {
  container: typographyContainer,

  title: typographyTitle,
};
