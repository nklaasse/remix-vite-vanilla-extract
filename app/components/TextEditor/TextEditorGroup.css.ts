import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const textEditorGroupContainer = style({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "min-content",
  gridColumnGap: theme.space[1],
});

export const textEditorGroup = {
  container: textEditorGroupContainer,
};
