import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const checkboxIsSelected = style({});
const checkboxIsFocused = style({});
const checkboxIsFocusVisible = style({});
const checkboxIsHovered = style({});
const checkboxIsIndeterminate = style({});

const checkboxStates = {
  isSelected: checkboxIsSelected,
  isFocused: checkboxIsFocused,
  isFocusVisible: checkboxIsFocusVisible,
  isHovered: checkboxIsHovered,
  isIndeterminate: checkboxIsIndeterminate,
};

const checkboxContainer = style({
  position: "relative",

  display: "flex",
  flexDirection: "row",
  justifyItems: "center",
  alignItems: "flex-start",

  cursor: "pointer",
});

const checkboxLabel = style({
  ...mixins.typography.text,

  display: "grid",
  gridAutoFlow: "row",
  gridRowGap: theme.space[0.5],

  marginInlineStart: theme.space[1],

  color: theme.colors.gray[11],

  width: theme.sizes.full,
});

const checkboxIndicator = style({
  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: theme.colors.gray[1],
  color: "transparent",

  borderWidth: "0px",
  borderColor: theme.colors.gray[7],
  borderStyle: "solid",

  borderRadius: theme.radii[0.5],

  marginBlock: calc.divide(
    calc.subtract(
      calc.multiply(
        mixins.typography.text.fontSize,
        mixins.typography.text.lineHeight
      ),
      theme.sizes.icon
    ),
    2
  ),

  selectors: {
    "&:before": {
      content: "''",

      position: "absolute",
      inset: theme.space[0],

      display: "block",

      borderWidth: theme.borderWidths.border,
      borderColor: "inherit",
      borderStyle: "solid",

      borderRadius: "inherit",
    },

    [`:is(${checkboxIsHovered}) &`]: {
      borderColor: theme.colors.gray[8],
    },

    [`:is(${checkboxIsFocused}) &`]: {
      borderColor: theme.colors.gray[9],
    },

    [`:is(${checkboxIsSelected}, ${checkboxIsIndeterminate}) &`]: {
      ...mixins.accents.selection,

      backgroundColor: theme.colors.accent[9],
      borderColor: theme.colors.accent[10],

      color: theme.colors.accent[2],
    },

    [`:is(${checkboxIsSelected}, ${checkboxIsIndeterminate}):is(${checkboxIsHovered}, ${checkboxIsFocused}) &`]:
      {
        borderColor: theme.colors.accent[11],
      },

    [`:is(${checkboxIsFocusVisible}) &:after`]: {
      content: "''",

      position: "absolute",
      inset: theme.space[0],

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

const checkboxChecked = style({
  display: "flex",

  selectors: {
    [`:is(${checkboxIsIndeterminate}) &`]: {
      display: "none",
    },
  },
});

const checkboxIndeterminate = style({
  display: "none",
  selectors: {
    [`:is(${checkboxIsIndeterminate}) &`]: {
      display: "flex",
    },
  },
});

export const checkbox = {
  container: checkboxContainer,
  indicator: checkboxIndicator,
  checked: checkboxChecked,
  indeterminate: checkboxIndeterminate,
  label: checkboxLabel,

  states: checkboxStates,
};
