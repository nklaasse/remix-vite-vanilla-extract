import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { tabsTab } from "./TabsTab.css";

const tabsIconContainer = style({
  position: "relative",

  display: "flex",

  padding: theme.space[1],

  borderRadius: theme.radii.circle,

  color: theme.colors.gray[11],

  selectors: {
    [`:is(${tabsTab.states.isHovered}, ${tabsTab.states.isFocused}) &`]: {
      backgroundColor: theme.colors.accent[4],
      color: theme.colors.accent[11],
    },

    [`:is(${tabsTab.states.isSelected}) &`]: {
      backgroundColor: theme.colors.accent[5],
      color: theme.colors.accent[11],
    },

    [`:is(${tabsTab.states.isFocusVisible}) &:before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const tabsIcon = {
  container: tabsIconContainer,
};
