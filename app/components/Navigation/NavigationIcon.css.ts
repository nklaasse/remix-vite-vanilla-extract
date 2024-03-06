import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { navigationMenuTab } from "./NavigationMenuItem.css";

const menuItemIconContainer = style({
  position: "relative",

  display: "flex",

  order: 1,

  paddingBlock: theme.space[0.5],
  paddingInline: theme.space[2],
  borderRadius: theme.radii.circle,
  marginBlock: calc.multiply(theme.space[0.5], -1),

  color: "inherit",

  selectors: {
    [`:is(${navigationMenuTab.states.isFocusVisible}) &:before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const menuItemIcon = {
  container: menuItemIconContainer,
};

const drawerIconContainer = style({
  position: "relative",

  display: "flex",

  order: 0,

  marginInlineEnd: theme.space[1.5],

  color: "inherit",
});

export const drawerIcon = {
  container: drawerIconContainer,
};
