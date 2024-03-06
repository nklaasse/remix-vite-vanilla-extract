import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { theme, mixins, breakpoints } from "~/css";

const contactFaqSectionContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: theme.sizes.full,

  marginBlock: calc.multiply(theme.space[4], 2),

  paddingInline: theme.space[3],
  "@media": {
    [breakpoints["small"]]: {
      paddingInline: theme.space[5],
    },
  },
});

const contactFaqContent = style({
  display: "flex",
  flexDirection: "column",
  maxInlineSize: theme.sizes.textContainer,
  inlineSize: theme.sizes.full,
});

const contactFaqSectionTitle = style({
  ...mixins.typography["heading-4"],
  textAlign: "center",

  marginBlockEnd: calc.multiply(theme.space[4], 2),

  marginInline: theme.space[2],
  "@media": {
    [breakpoints["large"]]: {
      ...mixins.typography["heading-2"],
    },
  },
});

export const contactFaqSection = {
  container: contactFaqSectionContainer,
  content: contactFaqContent,
  title: contactFaqSectionTitle,
};
