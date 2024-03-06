import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const dialogCloseContainer = style({
  gridArea: "close",

  position: "sticky",

  insetBlockStart: theme.space[1],

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
});

export const dialogClose = {
  container: dialogCloseContainer,
};
