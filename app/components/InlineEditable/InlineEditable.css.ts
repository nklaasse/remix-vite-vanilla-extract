import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const inlineEditableIsHovered = style({});
const inlineEditableIsFocused = style({});
const inlineEditableIsFocusVisible = style({});

const inlineEditableStates = {
  isHovered: inlineEditableIsHovered,
  isFocused: inlineEditableIsFocused,
  isFocusVisible: inlineEditableIsFocusVisible,
};

const inlineEditableContainer = style({
  display: "flex",
  flexDirection: "row",

  padding: theme.space[0],
  margin: theme.space[0],

  position: "relative",

  width: "auto",
  minWidth: "8ch",
  maxWidth: theme.sizes.full,

  cursor: "pointer",

  ...mixins.typography.inherit,

  selectors: {
    [`&:is(${inlineEditableIsFocusVisible}):after`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.space[0.5], -1),

      display: "block",

      borderRadius: theme.radii[0.5],

      boxShadow: `0 0 0 ${calc.add(theme.borderWidths.delimiter)} ${
        theme.colors.accent[7]
      }`,
    },
  },
});

const inlineEditableTextarea = style({
  ...mixins.typography.inherit,

  position: "absolute",
  inset: theme.space[0],

  overflow: "hidden",

  width: theme.sizes.full,
  height: theme.sizes.full,

  padding: theme.space[0],
  margin: theme.space[0],

  paddingInlineStart: theme.space[0],
  paddingInlineEnd: calc.add(theme.sizes.icon, theme.space[0.5]),

  border: "none",
  outline: "none",
  background: "transparent",

  color: "inherit",

  resize: "none",
  appearance: "none",

  selectors: {
    "&::placeholder": {
      ...mixins.typography.inherit,

      color: theme.colors.gray[11],
      opacity: 1,
    },
  },
});

const inlineEditableIndicator = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "baseline",

  visibility: "hidden",

  position: "relative",

  marginInlineStart: theme.space[0.5],

  pointerEvents: "none",

  selectors: {
    "&:before": {
      display: "inline-block",

      width: theme.borderWidths.border,
      height: "min-content",

      whiteSpace: "nowrap",

      content: "'0'",

      visibility: "hidden",
    },

    [`:is(${inlineEditableIsHovered}, ${inlineEditableIsFocused}) &`]: {
      visibility: "visible",
    },
  },
});

const inlineEditableIndicatorIcon = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "flex-end",

  maxHeight: "1em",

  // In a icon there is a 2px spacing around it and the container
  transform: "translateY(2px)",

  color: theme.colors.accent[11],
});

const inlineEditableSizer = style({
  display: "inline-grid",

  position: "relative",

  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 1,
  gridRowEnd: 2,

  minWidth: "8ch",

  height: theme.sizes.full,

  "selectors": {
    "&:before": {
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 1,
      gridRowEnd: 2,

      visibility: "hidden",
      whiteSpace: "pre-wrap",
      content: "attr(data-value) ' '",
    },

    "&:after": {
      gridColumnStart: 1,
      gridColumnEnd: 2,
      gridRowStart: 1,
      gridRowEnd: 2,

      visibility: "hidden",
      whiteSpace: "pre-wrap",
      content: "attr(data-placeholder) ' '",
    },
  },
});

export const inlineEditable = {
  container: inlineEditableContainer,
  sizer: inlineEditableSizer,

  textarea: inlineEditableTextarea,
  indicator: inlineEditableIndicator,
  indicatorIcon: inlineEditableIndicatorIcon,

  states: inlineEditableStates,
};
