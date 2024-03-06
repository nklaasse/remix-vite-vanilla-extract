import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const alertDialogCancelContainer = style({
  gridArea: "cancel",

  marginInlineStart: theme.space[1],
});

export const alertDialogCancel = {
  container: alertDialogCancelContainer,
};
