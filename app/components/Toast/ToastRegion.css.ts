import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const toastRegionContainer = style({
  position: "fixed",
  insetBlockEnd: theme.space[2.5],
  insetInlineEnd: theme.space[2.5],
  zIndex: 3,

  marginInlineStart: theme.space[2.5],

  display: "flex",
  flexDirection: "column",

  backgroundColor: theme.colors.gray[1],

  maxInlineSize: "480px",
});

export const toastRegion = {
  container: toastRegionContainer,
};
