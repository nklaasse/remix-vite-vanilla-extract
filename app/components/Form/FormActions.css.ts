import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const formActionsContainer = style({
  alignSelf: "flex-end",

  display: "grid",
  gridTemplate: `
    ".   reset       submit"
  /  1fr max-content max-content
  `,
  justifyContent: "flex-end",
  alignItems: "flex-end",
  gridColumnGap: theme.space[1],
});

export const formActions = {
  container: formActionsContainer,
};
