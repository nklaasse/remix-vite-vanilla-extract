import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const textEditorToggleButtonIsFocusVisible = style({});
const textEditorToggleButtonIsSelected = style({});
const textEditorToggleButtonIsHovered = style({});
const textEditorToggleButtonIsFocused = style({});
const textEditorToggleButtonIsPressed = style({});

const textEditorToggleButtonStates = {
  isFocusVisible: textEditorToggleButtonIsFocusVisible,
  isSelected: textEditorToggleButtonIsSelected,
  isHovered: textEditorToggleButtonIsHovered,
  isFocused: textEditorToggleButtonIsFocused,
  isPressed: textEditorToggleButtonIsPressed,
};

const textEditorToggleButtonContainer = style({
  position: "relative",

  display: "flex",

  minHeight: calc.multiply(
    mixins.typography.compact.fontSize,
    mixins.typography.compact.lineHeight
  ),
  minWidth: calc.multiply(
    mixins.typography.compact.fontSize,
    mixins.typography.compact.lineHeight
  ),

  padding: theme.space[1],

  borderStyle: "none",

  borderRadius: theme.radii.circle,

  background: "transparent",

  color: theme.colors.accent[11],

  outline: "none",

  cursor: "pointer",

  selectors: {
    [`&:is(${textEditorToggleButtonIsHovered}, ${textEditorToggleButtonIsFocused})`]:
      {
        backgroundColor: theme.colors.accent[4],
      },

    [`&:is(${textEditorToggleButtonIsPressed}, ${textEditorToggleButtonIsSelected})`]:
      {
        backgroundColor: theme.colors.accent[5],
      },

    [`&:is(${textEditorToggleButtonIsSelected})`]: {
      color: theme.colors.accent[12],
    },

    [`&:is(${textEditorToggleButtonIsFocusVisible}):before`]: {
      content: "''",

      inset: calc.multiply(theme.borderWidths.border, -1),

      position: "absolute",

      display: "block",

      borderRadius: "inherit",
      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const textEditorToggleButton = {
  container: textEditorToggleButtonContainer,

  states: textEditorToggleButtonStates,
};
