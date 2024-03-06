import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const tabsTabIsSelected = style({});
const tabsTabIsHovered = style({});
const tabsTabIsFocused = style({});
const tabsTabIsFocusVisible = style({});

const tabsTabStates = {
  isSelected: tabsTabIsSelected,
  isHovered: tabsTabIsHovered,
  isFocused: tabsTabIsFocused,
  isFocusVisible: tabsTabIsFocusVisible,
};

const tabsTabContainer = style({
  ...mixins.typography.text,

  position: "relative",

  paddingInline: theme.space[1.5],
  paddingBlock: theme.space[1.5],

  color: theme.colors.gray[11],

  outline: "none",

  cursor: "pointer",

  textDecoration: "none",
  whiteSpace: "nowrap",

  selectors: {
    "&:after": {
      content: '""',

      position: "absolute",
      insetBlockEnd: theme.space[0],
      insetInline: theme.space[1.5],

      height: theme.borderWidths.delimiter,

      backgroundColor: "transparent",

      borderRadius: theme.radii.circle,
    },

    [`&:is(${tabsTabIsHovered}, ${tabsTabIsFocused}):after`]: {
      backgroundColor: theme.colors.gray[8],
    },

    [`&:is(${tabsTabIsSelected})`]: {
      color: theme.colors.gray[12],
    },

    [`&:is(${tabsTabIsSelected}):after`]: {
      backgroundColor: theme.colors.brand[9],
    },

    [`&:is(${tabsTabIsFocusVisible}):before`]: {
      content: "''",

      position: "absolute",
      insetBlock: theme.space[1],
      insetInline: theme.space[0.5],

      display: "block",

      borderRadius: theme.radii["0.5"],

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.gray[7]}`,
    },
  },
});

export const tabsTab = {
  container: tabsTabContainer,

  states: tabsTabStates,
};
