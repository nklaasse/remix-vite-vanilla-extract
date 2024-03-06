import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const textEditorInputIsFocusVisible = style({});
const textEditorInputIsFocused = style({});
const textEditorInputIsHovered = style({});

const textEditorInputStates = {
  isFocusVisible: textEditorInputIsFocusVisible,
  isFocused: textEditorInputIsFocused,
  isHovered: textEditorInputIsHovered,
};

const textEditorInputContainer = style({
  position: "relative",

  width: theme.sizes.full,

  backgroundColor: theme.colors.accent[1],
  borderColor: theme.colors.accent[7],
  borderWidth: theme.borderWidths.border,
  borderStyle: "solid",
  borderRadius: theme.radii[0.5],

  display: "flex",
  flexDirection: "column",

  isolation: "isolate",

  selectors: {
    [`&:is(${textEditorInputIsHovered})`]: {
      borderColor: theme.colors.accent[8],
    },

    [`&:is(${textEditorInputIsFocused})`]: {
      borderColor: theme.colors.accent[9],
    },

    [`&:is(${textEditorInputIsFocusVisible}):before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const textEditorInput = {
  container: textEditorInputContainer,

  states: textEditorInputStates,
};
