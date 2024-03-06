import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { menuSection } from "./MenuSection.css";

const menuHeaderContainer = style({
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
        [`${menuSection.container}:first-child &`]: {
          paddingBlockStart: theme.space[0.5],
        },
      },
    },
  },
});

export const menuHeader = {
  container: menuHeaderContainer,
};
