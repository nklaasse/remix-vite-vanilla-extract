import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const actionMenuIconContainer = style({
  position: "relative",

  gridArea: "icon",

  display: "flex",
  alignItems: "center",

  marginInlineEnd: theme.space[1],

  flexGrow: 0,
  flexShrink: 0,
});

export const actionMenuIcon = {
  container: actionMenuIconContainer,
};
