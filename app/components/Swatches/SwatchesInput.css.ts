import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const swatchesInputContainer = style({
  display: "grid",

  gridAutoFlow: "column",

  justifyContent: "flex-start",
  alignItems: "center",

  gridColumnGap: theme.space[1],

  paddingInline: theme.space[0],

  height: calc.add(
    calc.multiply(theme.fontSizes.text, theme.lineHeights.text),
    calc.multiply(theme.space[2], 2)
  ),
});

export const swatchesInput = {
  container: swatchesInputContainer,
};

const swatchesInputSwatchIsSelected = style({});
const swatchesInputSwatchIsFocusVisible = style({});

const swatchesInputSwatchStates = {
  isSelected: swatchesInputSwatchIsSelected,
  isFocusVisible: swatchesInputSwatchIsFocusVisible,
};

const swatchesInputSwatchContainer = style({
  position: "relative",

  display: "flex",

  padding: theme.space[1],

  borderRadius: theme.radii[0.5],

  cursor: "pointer",

  selectors: {
    [`&:is(${swatchesInputSwatchIsFocusVisible}):before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),
      zIndex: 1,

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

const swatchesInputSwatchInput = style(mixins.visuallyHidden);
const swatchesInputSwatchLabel = style(mixins.visuallyHidden);

const swatchesInputSwatchIndicator = style({
  display: "flex",

  flexDirection: "column",

  visibility: "hidden",

  color: theme.colors.gray[1],

  selectors: {
    [`:is(${swatchesInputSwatchIsSelected}) &`]: {
      visibility: "visible",
    },
  },
});

export const swatchesInputSwatch = {
  container: swatchesInputSwatchContainer,
  input: swatchesInputSwatchInput,
  label: swatchesInputSwatchLabel,
  indicator: swatchesInputSwatchIndicator,

  states: swatchesInputSwatchStates,
};
