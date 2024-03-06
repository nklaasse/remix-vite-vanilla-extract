import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const alertDialogActionsContainer = style({
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "auto",
  gridColumnGap: theme.space[1],
  justifyContent: "flex-end",

  paddingBlockStart: theme.space[4],
});

export const alertDialogActions = {
  container: alertDialogActionsContainer,
};
