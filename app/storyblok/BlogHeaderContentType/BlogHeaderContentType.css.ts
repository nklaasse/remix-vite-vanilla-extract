import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints, mixins, theme } from "~/css";
//======

// BLOG SUBJECT HEADER
const blogHeaderContainer = style({
  display: "flex",

  flexDirection: "column",
  alignItems: "center",

  inlineSize: theme.sizes.full,

  paddingInline: theme.space[3],
  marginBlock: calc.multiply(theme.space[4], 2),

  "@media": {
    [breakpoints["small"]]: {
      paddingInline: theme.space[5],
    },
  },
});

const blogHeaderContent = style({
  display: "flex",

  flexDirection: "column",
  justifyContent: "space-between",

  maxInlineSize: theme.sizes.contentContainer,
  inlineSize: theme.sizes.full,

  "@media": {
    [breakpoints["medium"]]: {
      flexDirection: "row",
    },
  },
});

// BLOG SUBJECT HEADER TITLE
const blogHeaderTitleContainer = style({
  display: "flex",

  flexDirection: "column",
  justifyContent: "center",

  width: theme.sizes["full"],

  "@media": {
    [breakpoints["medium"]]: {
      width: calc.subtract(theme.sizes["1/2"], theme.space[1]),
    },
  },
});

const blogHeaderTitle = style({
  ...mixins.typography["heading-2"],

  marginBlockEnd: theme.space[2.5],
});

const blogHeaderDescription = style({
  ...mixins.typography["intro"],

  color: theme.colors.gray[11],
});

// BLOG SUBJECT HEADER ILLUSTRATION
const blogHeaderIllustrationContainer = style({
  display: "none",

  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",

  "@media": {
    [breakpoints["medium"]]: {
      width: calc.subtract(theme.sizes["1/2"], theme.space[1]),
      display: "flex",
    },
  },
});

const blogHeaderIllustration = style({
  width: "auto",
  maxHeight: "400px",

  objectFit: "contain",
  aspectRatio: "1/1",
});

export const blogHeader = {
  container: blogHeaderContainer,
  content: blogHeaderContent,

  titleContainer: blogHeaderTitleContainer,
  title: blogHeaderTitle,
  description: blogHeaderDescription,

  illustrationContainer: blogHeaderIllustrationContainer,
  illustration: blogHeaderIllustration,
};
