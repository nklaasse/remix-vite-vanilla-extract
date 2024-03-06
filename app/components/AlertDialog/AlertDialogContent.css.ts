import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const alertDialogContentContainer = style({
  ...mixins.typography.text,

  gridArea: "content",

  marginBlockEnd: theme.space[2],

  "@media": {
    [breakpoints.medium]: {
      marginBlockEnd: theme.space[3],
    },
  },
});

export const alertDialogContent = {
  container: alertDialogContentContainer,
};
