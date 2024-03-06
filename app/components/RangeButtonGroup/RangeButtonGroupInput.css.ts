import { mixins, theme } from "~/css";
import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const rangeButtonGroupTotalCount = createVar();
const rangeButtonGroupSelectedIndex = createVar();

const rangeButtonGroupVars = {
  totalCount: rangeButtonGroupTotalCount,
  selectedIndex: rangeButtonGroupSelectedIndex,
};

const rangeButtonGroupIsEmpty = style({});
const rangeButtonGroupIsFocusVisible = style({});
const rangeButtonGroupIsHovered = style({});
const rangeButtonGroupIsFocused = style({});

const rangeButtonGroupStates = {
  isEmpty: rangeButtonGroupIsEmpty,
  isFocusVisible: rangeButtonGroupIsFocusVisible,
  isHovered: rangeButtonGroupIsHovered,
  isFocused: rangeButtonGroupIsFocused,
};

const rangeButtonGroupContainer = style({
  position: "relative",

  touchAction: "none",

  width: calc.subtract(
    theme.sizes.full,
    calc.multiply(theme.borderWidths.border, 2)
  ),
  height: calc.add(
    calc.multiply(theme.fontSizes.text, theme.lineHeights.text),
    calc.multiply(calc.subtract(theme.space[2], theme.borderWidths.border), 2)
  ),

  borderColor: theme.colors.accent[7],
  borderWidth: theme.borderWidths.border,
  borderStyle: "solid",
  borderRadius: theme.radii[0.5],

  backgroundColor: theme.colors.accent[1],

  boxSizing: "content-box",

  selectors: {
    [`&:is(${rangeButtonGroupIsFocusVisible}):before`]: {
      content: "''",

      display: "none",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),
      zIndex: 1,

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },

    [`&:is(${rangeButtonGroupIsEmpty}):before`]: {
      display: "block",
    },
  },
});

const rangeButtonGroupUnderlay = style({
  ...mixins.accents.brand,

  position: "absolute",
  insetInline: calc.multiply(theme.borderWidths.border, -1),
  insetBlock: calc.multiply(theme.borderWidths.border, -1),

  width: calc.multiply(
    calc.divide(theme.sizes.full, rangeButtonGroupTotalCount),
    calc.add(rangeButtonGroupSelectedIndex, 1)
  ),

  borderColor: theme.colors.accent[11],
  borderWidth: theme.borderWidths.border,
  borderStyle: "solid",
  borderRadius: theme.radii[0.5],

  background: theme.colors.accent[9],

  boxSizing: "content-box",

  cursor: "inherit",

  selectors: {
    [`:is(${rangeButtonGroupIsHovered}, ${rangeButtonGroupIsFocused}) &`]: {
      backgroundColor: theme.colors.accent[10],
    },

    [`:is(${rangeButtonGroupIsFocusVisible}) &:before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),
      zIndex: 1,

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },

    [`${rangeButtonGroupIsEmpty} &`]: {
      display: "none",
    },
  },
});

const rangeButtonGroupItems = style({
  position: "absolute",
  inset: calc.multiply(theme.borderWidths.border, -1),

  display: "flex",
});

export const rangeButtonGroup = {
  container: rangeButtonGroupContainer,

  underlay: rangeButtonGroupUnderlay,
  items: rangeButtonGroupItems,

  states: rangeButtonGroupStates,

  vars: rangeButtonGroupVars,
};

const rangeButtonGroupRadioIsSelected = style({});

const rangeButtonGroupRadioStates = {
  isSelected: rangeButtonGroupRadioIsSelected,
};

const rangeButtonGroupRadioContainer = style({
  position: "relative",

  flexGrow: 1,
  flexShrink: 1,
  flexBasis: theme.sizes[0],

  cursor: "pointer",

  selectors: {
    "&:before": {
      content: "''",

      position: "absolute",
      insetBlock: theme.space[1],
      insetInlineStart: calc.multiply(
        calc.divide(theme.borderWidths.border, 2),
        -1
      ),

      width: theme.borderWidths.border,

      backgroundColor: theme.colors.accent[5],
    },

    [`&:is(${rangeButtonGroupRadioIsSelected}) ~ &:before`]: {
      backgroundColor: theme.colors.accent[7],
    },

    [`:is(${rangeButtonGroup.states.isHovered}, ${rangeButtonGroup.states.isFocused}) &:is(${rangeButtonGroupRadioIsSelected}) ~ &:before`]:
      {
        backgroundColor: theme.colors.accent[8],
      },

    "&:first-of-type:before": {
      display: "none",
    },

    [`&:is(${rangeButtonGroupRadioIsSelected}) + &:before`]: {
      display: "none",
    },

    [`:is(${rangeButtonGroup.states.isEmpty}) &:before`]: {
      backgroundColor: theme.colors.accent[7],
    },

    [`:is(${rangeButtonGroup.states.isHovered}, ${rangeButtonGroup.states.isFocused}):is(${rangeButtonGroup.states.isEmpty}) &:before`]:
      {
        backgroundColor: theme.colors.accent[8],
      },
  },
});

const rangeButtonGroupRadioLabel = style({ ...mixins.visuallyHidden });
const rangeButtonGroupRadioInput = style({ ...mixins.visuallyHidden });

export const rangeButtonGroupRadio = {
  container: rangeButtonGroupRadioContainer,

  input: rangeButtonGroupRadioInput,
  label: rangeButtonGroupRadioLabel,

  states: rangeButtonGroupRadioStates,
};
