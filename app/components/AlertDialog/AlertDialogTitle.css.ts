import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const alertDialogContainer = style({
  ...mixins.typography["heading-5"],

  gridArea: "title",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",

  marginBlockEnd: theme.space[2],

  "@media": {
    [breakpoints.medium]: {
      marginBlockEnd: theme.space[3],
    },
  },
});

export const alertDialogTitle = {
  container: alertDialogContainer,
};
