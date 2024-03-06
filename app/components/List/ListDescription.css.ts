import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const listDescriptionContainer = style({
  ...mixins.typography.compact,

  gridArea: "description",

  display: "flex",

  paddingInline: theme.space[0.5],

  width: theme.sizes.full,

  color: theme.colors.accent[12],

  boxSizing: "border-box",

  "@media": {
    [breakpoints.large]: {
      paddingInline: theme.space[1],
    },
  },
});

export const listDescription = {
  container: listDescriptionContainer,
};
