import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const listBoxSectionContainer = style({
  display: "flex",
  flexDirection: "column",

  marginInline: theme.space[0],
  marginBlockEnd: theme.space[0.5],

  selectors: {
    "&:last-child": {
      marginBlockEnd: theme.space[0],
    },
  },
});

const listBoxSectionContent = style({
  margin: theme.space[0],
  padding: theme.space[0],

  width: theme.sizes.full,
  height: theme.sizes.full,

  listStyleType: "none",
});

const listBoxSectionLabel = style({
  ...mixins.typography.compact,

  paddingInline: theme.space[3],
  paddingBlockStart: theme.space[2],
  paddingBlockEnd: theme.space[0.5],

  fontWeight: theme.fontWeights.bold,

  color: theme.colors.gray[11],

  "@media": {
    [breakpoints.medium]: {
      paddingInline: theme.space[2],

      selectors: {
        [`${listBoxSectionContainer}:first-child &`]: {
          paddingBlockStart: theme.space[0.5],
        },
      },
    },
  },
});

export const listBoxSection = {
  container: listBoxSectionContainer,
  content: listBoxSectionContent,
  label: listBoxSectionLabel,
};
