import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const actionMenuMenuContainer = style({
  display: "flex",

  alignItems: "stretch",

  padding: theme.space[0],
  margin: theme.space[0],

  width: theme.sizes.full,
  height: theme.sizes.full,

  minWidth: "max-content",

  maxHeight: "360px",
});

export const actionMenuMenu = {
  container: actionMenuMenuContainer,
};
