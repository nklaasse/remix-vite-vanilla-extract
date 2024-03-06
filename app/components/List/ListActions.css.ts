import { breakpoints, theme } from "~/css";
import { style } from "@vanilla-extract/css";

export const listActionsContainer = style({
  paddingInline: theme.space[0.5],

  gridArea: "actions",

  "@media": {
    [breakpoints.large]: {
      paddingInline: theme.space[1],
    },
  },
});

export const listActions = {
  container: listActionsContainer,
};
