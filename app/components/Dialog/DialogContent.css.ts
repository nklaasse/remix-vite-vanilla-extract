import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const dialogContentContainer = style({
  ...mixins.typography.text,

  marginBlockStart: theme.space[3],

  gridArea: "content",

  isolation: "isolate",
});

export const dialogContent = {
  container: dialogContentContainer,
};
