import { theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { tabsLabel } from "./TabsLabel.css";
import { tabsTab } from "./TabsTab.css";

const tabListStates = styleVariants({
  isCollapsed: {},
});

const tabListContainer = style({
  position: "relative",

  display: "flex",
  flexDirection: "row",

  marginInline: calc.negate(theme.space[1.5]),

  selectors: {
    "&:before": {
      content: '""',

      position: "absolute",
      insetBlockEnd: theme.space[0],
      insetInline: theme.space[1.5],

      height: theme.borderWidths.delimiter,
      width: calc.subtract(
        theme.sizes.full,
        calc.multiply(theme.space[1.5], 2)
      ),

      backgroundColor: theme.colors.gray[6],
    },
  },
});

const tabListList = style({
  display: "flex",
  flexDirection: "row",

  position: "relative",

  overflowY: "hidden",
  overflowX: "auto",

  msOverflowStyle: "none",
  scrollbarWidth: "none",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },

    [`:is(${tabListStates.isCollapsed}) &`]: {
      visibility: "hidden",
      position: "absolute",
      overflow: "hidden",
    },
  },
});

export const tabsList = {
  container: tabListContainer,
  list: tabListList,

  states: tabListStates,
};

const tabPickerStates = styleVariants({
  isFocusVisible: [tabsTab.states.isFocusVisible],
  isSelected: [tabsTab.states.isSelected],
  isHovered: [tabsTab.states.isHovered],
  isFocused: [tabsTab.states.isFocused],
});

const tabPickerContainer = style([
  tabsTab.container,
  {
    display: "flex",

    alignItems: "center",

    border: "none",
    backgroundColor: "transparent",

    selectors: {
      [`${tabListContainer}:not(${tabListStates.isCollapsed}) &`]: {
        visibility: "hidden",
        position: "absolute",
        overflow: "hidden",
      },
    },
  },
]);

const tabPickerLabel = style([tabsLabel.container, {}]);

const tabPickerIcon = style({
  display: "flex",
  alignItems: "center",

  marginInlineStart: theme.space[1],
});

export const tabPicker = {
  container: tabPickerContainer,
  label: tabPickerLabel,
  icon: tabPickerIcon,

  states: tabPickerStates,
};
