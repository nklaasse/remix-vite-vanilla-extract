import { theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const inputGroupIsHovered = style({});
const inputGroupIsFocusVisible = style({});
const inputGroupIsFocused = style({});
const inputGroupIsExpanded = style({});
const inputGroupIsPressed = style({});
const inputGroupIsDropTarget = style({});
const inputGroupIsInvalid = style({});
const inputGroupIsDisabled = style({});
const inputGroupIsReadOnly = style({});

const inputGroupStates = {
  isHovered: inputGroupIsHovered,
  isFocusVisible: inputGroupIsFocusVisible,
  isFocused: inputGroupIsFocused,
  isExpanded: inputGroupIsExpanded,
  isPressed: inputGroupIsPressed,
  isDropTarget: inputGroupIsDropTarget,
  isInvalid: inputGroupIsInvalid,
  isDisabled: inputGroupIsDisabled,
  isReadOnly: inputGroupIsReadOnly,
};

const inputGroupBorder = styleVariants({
  solid: {},
  dashed: {},
});

const inputGroupVariants = {
  border: inputGroupBorder,
};

const inputGroupContainer = style({
  position: "relative",

  display: "flex",
  alignItems: "stretch",
  justifyContent: "stretch",

  width: theme.sizes.full,

  padding: theme.space[0],

  borderColor: theme.colors.accent[7],
  borderWidth: theme.borderWidths.border,
  borderStyle: "solid",
  borderRadius: theme.radii[0.5],

  backgroundColor: theme.colors.accent[1],
  color: theme.colors.accent[12],

  boxSizing: "border-box",

  outline: "none",

  cursor: "pointer",

  selectors: {
    [`&:is(${inputGroupBorder.dashed})`]: {
      borderStyle: "dashed",
    },

    [`&:is(${inputGroupIsHovered}, ${inputGroupIsDropTarget}):not(${inputGroupIsDisabled}, ${inputGroupIsReadOnly})`]:
      {
        borderColor: theme.colors.accent[8],
      },

    [`&:is(${inputGroupIsFocused}, ${inputGroupIsPressed}, ${inputGroupIsExpanded}):not(${inputGroupIsDisabled}, ${inputGroupIsReadOnly})`]:
      {
        borderColor: theme.colors.accent[9],
      },

    [`&:is(${inputGroupIsInvalid})`]: {
      borderColor: theme.colors.error[11],
    },

    [`&:is(${inputGroupIsDisabled}, ${inputGroupIsReadOnly})`]: {
      backgroundColor: theme.colors.accent[3],
      color: theme.colors.accent[11],
    },

    [`&:is(${inputGroupIsDisabled})`]: {
      cursor: "not-allowed",
    },

    [`&:is(${inputGroupIsFocusVisible}):before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },

    [`&:is(${inputGroupIsInvalid}):before`]: {
      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.error[7]}`,
    },
  },
});

export const inputGroup = {
  container: inputGroupContainer,

  states: inputGroupStates,

  variants: inputGroupVariants,
};
