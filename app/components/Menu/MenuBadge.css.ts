import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const menuBadgeContainer = style({
  gridArea: "badge",

  alignSelf: "center",

  position: "relative",

  display: "flex",
  alignItems: "center",

  marginInlineStart: theme.space[1],
});

export const menuBadge = {
  container: menuBadgeContainer,
};
