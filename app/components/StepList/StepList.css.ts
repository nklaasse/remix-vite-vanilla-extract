import { mixins, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const stepListVisibility = styleVariants({
  selected: {},
  all: {},
});

const stepListVariants = {
  visibility: stepListVisibility,
};

const stepListContainer = style({
  display: "flex",

  width: theme.sizes.full,
});

const stepListItems = style({
  counterReset: "step-list",

  display: "flex",
  flexDirection: "row",

  overflow: "hidden",

  marginInline: "auto",

  maxWidth: theme.sizes.full,

  padding: theme.space[1],
  marginBlock: calc.negate(theme.space[1]),
});

export const stepList = {
  container: stepListContainer,
  items: stepListItems,

  variants: stepListVariants,
};

const stepListItemIsActive = style({});
const stepListItemIsFocused = style({});
const stepListItemIsHovered = style({});
const stepListItemIsFocusVisible = style({});

const stepListItemStates = {
  isActive: stepListItemIsActive,
  isFocused: stepListItemIsFocused,
  isHovered: stepListItemIsHovered,
  isFocusVisible: stepListItemIsFocusVisible,
};

export const stepListItemContainer = style({
  ...mixins.typography.text,

  display: "flex",
  alignItems: "center",

  flexGrow: 0,
  flexShrink: 1,

  listStyleType: "none",

  color: theme.colors.gray[11],

  fontWeight: theme.fontWeights.medium,

  paddingInline: theme.space[0.5],

  outline: "none",

  counterIncrement: "step-list",

  selectors: {
    [`:is(${stepListVisibility.all}) &`]: {
      overflow: "visible",
    },

    [`:is(${stepListVisibility.selected}) &:not(${stepListItemIsActive}, ${stepListItemIsHovered}, ${stepListItemIsFocused})`]:
      {
        overflow: "hidden",
      },

    [`&:is(${stepListItemIsActive})`]: {
      color: theme.colors.brand[9],
    },

    [`&:is(${stepListItemIsActive}, ${stepListItemIsHovered}, ${stepListItemIsFocused})`]:
      {
        overflow: "visible",
      },

    [`&:is(${stepListItemIsActive}) ~ &`]: {
      fontWeight: theme.fontWeights.regular,
    },
  },
});

export const stepListItemContent = style({
  position: "relative",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  overflow: "hidden",

  padding: theme.space[1],
  margin: calc.negate(theme.space[1]),

  borderRadius: theme.radii["0.5"],

  selectors: {
    "&:before, &:after": {
      content: '""',

      position: "absolute",

      borderRadius: "inherit",

      inset: theme.space[0.5],
    },
    "&:after": {
      display: "none",

      inset: calc.subtract(
        theme.space[0.5],
        theme.borderWidths.border,
        theme.borderWidths.border
      ),

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },

    [`:is(${stepListItemIsFocusVisible}) &:before`]: {
      backgroundColor: theme.colors.accent[3],
    },

    [`:is(${stepListItemIsFocusVisible}) &:after`]: {
      display: "inline-block",
    },
  },
});

const stepListItemLabel = style({
  isolation: "isolate",

  flexGrow: 0,
  flexShrink: 1,

  whiteSpace: "nowrap",

  overflow: "hidden",
  textOverflow: "ellipsis",

  display: "inline-block",

  marginInline: theme.space[0.5],

  cursor: "pointer",

  selectors: {
    [`:is(${stepListItemIsActive}, ${stepListItemIsHovered}, ${stepListItemIsFocused}) &`]:
      {
        display: "inline-block",
      },

    [`:is(${stepListVisibility.all}) &`]: {
      display: "inline-block",
    },

    [`:is(${stepListVisibility.selected}) ${stepListItemContainer}:not(${stepListItemIsActive}, ${stepListItemIsHovered}, ${stepListItemIsFocused}) &`]:
      {
        ...mixins.visuallyHidden,
      },
  },
});

const stepListItemDelimiter = style({
  flexGrow: 0,
  flexShrink: 0,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: theme.colors.gray[8],

  marginInlineStart: theme.space[0.5],
});

const stepListItemIndicator = style({
  isolation: "isolate",

  flexGrow: 0,
  flexShrink: 0,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: theme.radii.circle,

  textAlign: "center",

  width: theme.sizes.icon,
  height: theme.sizes.icon,

  marginInlineEnd: theme.space[0.5],
});

const stepListItemCounter = style([
  stepListItemIndicator,
  {
    display: "none",

    selectors: {
      [`&:before`]: {
        content: 'counters(step-list, ".") "."',

        display: "flex",
      },

      [`${stepListItemContainer}:is(${stepListItemIsActive}) ~ ${stepListItemContainer} &`]:
        {
          display: "flex",
        },
    },
  },
]);

const stepListItemCompleted = style([
  stepListItemIndicator,
  {
    display: "flex",

    selectors: {
      [`${stepListItemContainer}:is(${stepListItemIsActive}) ~ ${stepListItemContainer} &`]:
        {
          display: "none",
        },
    },
  },
]);

export const stepListItem = {
  container: stepListItemContainer,
  content: stepListItemContent,
  label: stepListItemLabel,
  delimiter: stepListItemDelimiter,
  counter: stepListItemCounter,
  completed: stepListItemCompleted,

  states: stepListItemStates,
};
