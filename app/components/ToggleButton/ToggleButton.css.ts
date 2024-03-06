import { mixins, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const toggleButtonIsHovered = style({});
const toggleButtonIsPressed = style({});
const toggleButtonIsFocusVisible = style({});
const toggleButtonIsSelected = style({});
const toggleButtonIsFocused = style({});

const toggleButtonStates = {
  isHovered: toggleButtonIsHovered,
  isPressed: toggleButtonIsPressed,
  isFocusVisible: toggleButtonIsFocusVisible,
  isFocused: toggleButtonIsFocused,
  isSelected: toggleButtonIsSelected,
};

const buttonSizes = styleVariants({
  compact: {},
  default: {},
  intro: {},
});

const buttonVariants = {
  sizes: buttonSizes,
};

const toggleButtonContainer = style({
  position: "relative",

  boxSizing: "content-box",

  isolation: "isolate",

  outline: "none",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  border: "none",

  borderRadius: theme.radii.circle,

  textDecoration: "none",

  cursor: "pointer",

  backgroundColor: theme.colors.accent[3],
  color: theme.colors.accent[12],

  selectors: {
    [`&:is(${toggleButtonIsHovered}, ${toggleButtonIsFocused})`]: {
      backgroundColor: theme.colors.accent[4],
    },

    [`&:is(${toggleButtonIsPressed})`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&:is(${toggleButtonIsSelected})`]: {
      ...mixins.accents.selection,

      backgroundColor: theme.colors.accent[5],
      borderColor: theme.colors.accent[5],
    },

    [`&:is(${toggleButtonIsSelected}):is(${toggleButtonIsHovered}, ${toggleButtonIsFocused})`]:
      {
        backgroundColor: theme.colors.accent[4],
        borderColor: theme.colors.accent[4],
      },

    [`&${toggleButtonIsFocusVisible}:before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },

    [`&${buttonSizes.compact}`]: {
      ...mixins.typography.compact,

      minHeight: calc.multiply(
        mixins.typography.compact.fontSize,
        mixins.typography.compact.lineHeight
      ),
      minWidth: calc.multiply(
        mixins.typography.compact.fontSize,
        mixins.typography.compact.lineHeight
      ),

      padding: theme.space[1],
    },

    [`&${buttonSizes.default}`]: {
      ...mixins.typography.text,

      minHeight: calc.multiply(
        mixins.typography.text.fontSize,
        mixins.typography.text.lineHeight
      ),
      minWidth: calc.multiply(
        mixins.typography.text.fontSize,
        mixins.typography.text.lineHeight
      ),

      padding: theme.space[1],
    },

    [`&${buttonSizes.intro}`]: {
      ...mixins.typography.intro,

      minHeight: calc.multiply(
        mixins.typography.intro.fontSize,
        mixins.typography.intro.lineHeight
      ),
      minWidth: calc.multiply(
        mixins.typography.intro.fontSize,
        mixins.typography.intro.lineHeight
      ),

      padding: theme.space[1.5],
    },
  },
});

export const toggleButton = {
  container: toggleButtonContainer,

  states: toggleButtonStates,

  variants: buttonVariants,
};
