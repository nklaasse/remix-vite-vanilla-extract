import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints, mixins, theme } from "~/css";

// BLOG CATEGORY CONTAINER
const blogCategoriesContainer = style({
  maxWidth: calc.add(theme.sizes.contentContainer, theme.space[2]),
  marginInline: "auto",
  paddingInline: theme.space[2],
});

// BLOG CATEGORY LIST
const blogSubjectListContainer = style({
  ...mixins.typography["text"],

  display: "grid",

  marginInline: calc.negate(theme.space[1.5]),

  justifyItems: "center",
  gridTemplateColumns: "repeat(1, 1fr)",
  columnGap: theme.space[3],

  maxWidth: theme.sizes.page,

  "@media": {
    [breakpoints["small"]]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [breakpoints["large"]]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});

export const blogSubject = {
  container: blogCategoriesContainer,
};

export const blogSubjectList = {
  container: blogSubjectListContainer,
};
