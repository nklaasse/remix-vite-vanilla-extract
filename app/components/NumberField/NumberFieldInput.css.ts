import { mixins } from "~/css";
import { theme } from "~/css/theme.css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const numberFieldInputSteppers = style({
  display: "flex",
  flexDirection: "column",

  marginBlock: calc.multiply(theme.space[1], -1),
  marginInlineEnd: calc.multiply(theme.space[2], -1),
});

export const numberFieldInput = {
  steppers: numberFieldInputSteppers,
};

const stepperIsHovered = style({});
const stepperIsFocused = style({});
const stepperIsFocusVisible = style({});
const stepperIsPressed = style({});

const stepperStates = {
  isHovered: stepperIsHovered,
  isFocused: stepperIsFocused,
  isFocusVisible: stepperIsFocusVisible,
  isPressed: stepperIsPressed,
};

const stepperContainer = style({
  ...mixins.typography.text,

  position: "relative",

  display: "inline-flex",

  maxWidth: theme.sizes.full,

  padding: theme.space[0.5],
  marginBlock: calc.multiply(theme.space[0.5], -1),

  color: theme.colors.gray[11],

  background: "transparent",
  border: "none",

  boxSizing: "content-box",

  borderRadius: theme.radii[0.5],

  cursor: "pointer",

  outline: "none",

  isolation: "isolate",

  selectors: {
    "&:after, &:before": {
      content: "''",

      position: "absolute",

      zIndex: -1,

      inset: theme.borderWidths.delimiter,

      borderRadius: "inherit",
    },

    [`&:is(${stepperIsHovered}, ${stepperIsFocused}):before`]: {
      backgroundColor: theme.colors.accent[4],
    },

    [`&:is(${stepperIsPressed}):before`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&:is(${stepperIsFocusVisible}):after`]: {
      content: "''",

      inset: theme.borderWidths.border,

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]} `,
    },
  },
});

export const stepper = {
  container: stepperContainer,

  states: stepperStates,
};
