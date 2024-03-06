import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { navigationBar } from "./NavigationBar.css";
import { navigationRail } from "./NavigationRail.css";

const navigationMenuTabIsHovered = style({});
const navigationMenuTabIsFocused = style({});
const navigationMenuTabIsFocusVisible = style({});
const navigationMenuTabIsPressed = style({});
const navigationMenuTabIsSelected = style({});

const navigationMenuTabStates = {
  isHovered: navigationMenuTabIsHovered,
  isFocused: navigationMenuTabIsFocused,
  isFocusVisible: navigationMenuTabIsFocusVisible,
  isPressed: navigationMenuTabIsPressed,
  isSelected: navigationMenuTabIsSelected,
};

const navigationMenuTabContainer = style({
  ...mixins.accents.neutral,

  display: "flex",

  flexDirection: "column",
  alignItems: "center",

  outline: "none",

  width: theme.sizes.full,
  height: theme.sizes.full,

  paddingInline: theme.space[1],
  paddingBlock: calc.subtract(
    theme.space[1],
    calc.divide(theme.borderWidths.border, 2)
  ),

  color: theme.colors.gray[11],

  boxSizing: "border-box",

  cursor: "pointer",
  textDecoration: "none",

  selectors: {
    [`:is(${navigationBar.container}) &`]: {
      paddingInline: theme.space[1],
      paddingBlockStart: calc.subtract(
        theme.space[1.5],
        calc.divide(theme.borderWidths.border, 2)
      ),
      paddingBlockEnd: calc.subtract(
        theme.space[1],
        calc.divide(theme.borderWidths.border, 2)
      ),
    },
    [`:is(${navigationRail.container}) &`]: {
      paddingInline: calc.subtract(
        theme.space[1],
        calc.divide(theme.borderWidths.border, 2)
      ),
      paddingBlock: theme.space[1],
    },

    [`&:is(${navigationMenuTabIsHovered})`]: {
      color: theme.colors.gray[12],
    },

    [`&:is(${navigationMenuTabIsSelected})`]: {
      color: theme.colors.brand[11],

      ...mixins.accents.brand,
    },
  },
});

export const navigationMenuTab = {
  container: navigationMenuTabContainer,

  states: navigationMenuTabStates,
};

const navigationMenuDrawerItemIsHovered = style({});
const navigationMenuDrawerItemIsFocused = style({});
const navigationMenuDrawerItemIsFocusVisible = style({});
const navigationMenuDrawerItemIsPressed = style({});
const navigationMenuDrawerItemIsSelected = style({});

const navigationMenuDrawerItemStates = {
  isHovered: navigationMenuDrawerItemIsHovered,
  isFocused: navigationMenuDrawerItemIsFocused,
  isFocusVisible: navigationMenuDrawerItemIsFocusVisible,
  isPressed: navigationMenuDrawerItemIsPressed,
  isSelected: navigationMenuDrawerItemIsSelected,
};

const navigationMenuDrawerItemContainer = style({
  position: "relative",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  paddingInline: theme.space[2],
  paddingBlock: theme.space[1],

  outline: "none",

  color: theme.colors.accent[11],

  borderRadius: theme.radii.circle,

  cursor: "pointer",

  selectors: {
    [`&:is(${navigationMenuDrawerItemIsSelected})`]: {
      ...mixins.accents.brand,

      background: theme.colors.accent[3],
      color: theme.colors.accent[11],
    },

    [`&:is(${navigationMenuDrawerItemIsHovered}, ${navigationMenuDrawerItemIsFocused})`]:
      {
        background: theme.colors.accent[4],

        color: theme.colors.accent[12],
      },

    [`&:is(${navigationMenuDrawerItemIsHovered}, ${navigationMenuDrawerItemIsFocused}):is(${navigationMenuDrawerItemIsSelected})`]:
      {
        color: theme.colors.accent[11],
      },

    [`&:is(${navigationMenuDrawerItemIsPressed})`]: {
      background: theme.colors.accent[5],
    },

    [`&:is(${navigationMenuDrawerItemIsFocusVisible}):after`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const navigationMenuDrawerItem = {
  container: navigationMenuDrawerItemContainer,

  states: navigationMenuDrawerItemStates,
};
