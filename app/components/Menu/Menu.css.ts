import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const menuContentContainer = style({
  boxSizing: "border-box",

  padding: theme.space[0],
  margin: theme.space[0],

  width: theme.sizes.full,
  height: theme.sizes.full,

  minWidth: "200px",

  maxHeight: "inherit",
  overflowY: "auto",
  overflowX: "hidden",

  listStyleType: "none",

  outline: "none",

  // This forces the container to be rendered in it's own layer in safari, otherwise there seems to be a bug where
  // the max-height of the popover is used to show the items based on one of it's higher parents than the scrollable
  // container.
  transform: "translateZ(0)",

  selectors: {
    "&:before, &:after": {
      content: '""',
      display: "block",
      height: theme.space[1],
      width: theme.sizes.full,
    },
  },
});

export const menuContent = {
  container: menuContentContainer,
};

const menuContainer = style({
  display: "flex",

  alignItems: "stretch",

  padding: theme.space[0],
  margin: theme.space[0],

  width: theme.sizes.full,
  height: theme.sizes.full,

  maxHeight: "360px",
  minWidth: "200px",
});

export const menu = {
  container: menuContainer,
};
