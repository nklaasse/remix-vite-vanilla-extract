import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const fieldsetActionsContainer = style({
  alignSelf: "flex-start",

  gridArea: "actions",

  marginInlineStart: theme.space[1],

  marginBlockEnd: theme.space[1],
});

export const fieldsetActions = {
  container: fieldsetActionsContainer,
};
