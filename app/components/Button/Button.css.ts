import { mixins, modes, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const buttonIsHovered = style({});
const buttonIsPressed = style({});
const buttonIsFocused = style({});
const buttonIsFocusVisible = style({});
const buttonIsDisabled = style({});

const buttonStates = {
  isHovered: buttonIsHovered,
  isFocused: buttonIsFocused,
  isFocusVisible: buttonIsFocusVisible,
  isPressed: buttonIsPressed,
  isDisabled: buttonIsDisabled,
};

const buttonVariants = styleVariants({
  primary: {},
  secondary: {},
  tertiary: {},
});

const buttonSizes = styleVariants({
  compact: {},
  default: {},
  intro: {},
});

const _buttonVariants = {
  sizes: buttonSizes,
  variants: buttonVariants,
};

const buttonContainer = style({
  position: "relative",
  boxSizing: "content-box",

  isolation: "isolate",

  outline: "none",

  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  border: "none",

  borderRadius: theme.radii.circle,

  textDecoration: "none",

  cursor: "pointer",

  selectors: {
    [`&${buttonVariants.primary}`]: {
      ...mixins.accents.brand,

      backgroundColor: theme.colors.accent[9],
      color: theme.colors.accent[1],
    },

    [`${modes.light} &${buttonVariants.primary}:not(${buttonIsDisabled})`]: {
      color: theme.colors.accent[1],
    },

    [`${modes.dark} &${buttonVariants.primary}:not(${buttonIsDisabled})`]: {
      color: theme.colors.accent[12],
    },

    [`&${buttonVariants.primary}:is(${buttonIsHovered}, ${buttonIsFocused})`]: {
      backgroundColor: theme.colors.accent[10],
    },

    [`&${buttonVariants.primary}:is(${buttonIsPressed})`]: {
      backgroundColor: theme.colors.accent[11],
    },

    [`&${buttonVariants.primary}:is(${buttonIsDisabled})`]: {
      backgroundColor: theme.colors.gray[3],
      color: theme.colors.gray[8],
    },

    [`&${buttonVariants.secondary}`]: {
      backgroundColor: theme.colors.accent[3],
      color: theme.colors.accent[12],
    },

    [`&${buttonVariants.secondary}:is(${buttonIsHovered}, ${buttonIsFocused})`]:
      {
        backgroundColor: theme.colors.accent[4],
      },

    [`&${buttonVariants.secondary}:is(${buttonIsPressed})`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&${buttonVariants.secondary}:is(${buttonIsDisabled})`]: {
      backgroundColor: theme.colors.gray[3],
      color: theme.colors.gray[8],
    },

    [`&${buttonVariants.tertiary}`]: {
      background: "transparent",
      color: theme.colors.accent[12],
    },

    [`&${buttonVariants.tertiary}:is(${buttonIsHovered}, ${buttonIsFocused})`]:
      {
        backgroundColor: theme.colors.accent[4],
      },

    [`&${buttonVariants.tertiary}:is(${buttonIsPressed})`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&${buttonVariants.tertiary}:is(${buttonIsDisabled})`]: {
      color: theme.colors.gray[8],
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

      padding: theme.space[1.5],
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

      padding: theme.space[2],
    },

    [`&${buttonIsFocusVisible}:after`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },

    [`&${buttonIsDisabled}`]: {
      cursor: "not-allowed",
    },
  },
});

export const button = {
  container: buttonContainer,

  variants: _buttonVariants,

  states: buttonStates,
};
