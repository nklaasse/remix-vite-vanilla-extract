import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const listBoxIconContainer = style({
  display: "flex",

  marginInlineEnd: theme.space[1.5],

  gridArea: "icon",
});

export const listBoxIcon = {
  container: listBoxIconContainer,
};
