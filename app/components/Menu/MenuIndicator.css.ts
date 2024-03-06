import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const menuIndicatorContainer = style({
  gridArea: "indicator",

  alignSelf: "center",

  position: "relative",

  display: "flex",
  alignItems: "center",

  marginInlineStart: theme.space[1],
});

export const menuIndicator = {
  container: menuIndicatorContainer,
};
