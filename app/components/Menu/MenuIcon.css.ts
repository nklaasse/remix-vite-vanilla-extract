import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const menuIconContainer = style({
  gridArea: "icon",

  alignSelf: "center",

  position: "relative",

  display: "flex",
  alignItems: "center",

  marginInlineEnd: theme.space[1],

  flexGrow: 0,
  flexShrink: 0,
});

export const menuIcon = {
  container: menuIconContainer,
};
