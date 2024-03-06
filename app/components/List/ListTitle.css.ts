import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const listTitleContainer = style({
  ...mixins.typography.text,

  gridArea: "title",

  display: "flex",

  paddingInline: theme.space[0.5],

  width: theme.sizes.full,

  boxSizing: "border-box",

  "@media": {
    [breakpoints.large]: {
      paddingInline: theme.space[1],
    },
  },
});

export const listTitle = {
  container: listTitleContainer,
};
