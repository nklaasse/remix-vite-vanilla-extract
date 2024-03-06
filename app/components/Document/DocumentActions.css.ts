import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const documentActionsContainer = style({
  gridArea: "actions",

  display: "flex",
  justifyContent: "flex-end",

  marginBlockStart: theme.space[0.5],
});

export const documentActions = {
  container: documentActionsContainer,
};
