import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const alertDialogConfirmContainer = style({
  gridArea: "confirm",

  marginInlineStart: theme.space[1],
});

export const alertDialogConfirm = {
  container: alertDialogConfirmContainer,
};
