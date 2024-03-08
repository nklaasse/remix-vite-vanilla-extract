import { theme } from "~/css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const scrollViewKeyboardOverlap = createVar();

const scrollViewKeyboardVars = {
  keyboardOverlap: scrollViewKeyboardOverlap,
};

const scrollViewVariantsVariant = styleVariants({
  default: {},
  legacy: {},
});

const scrollViewVariants = {
  variant: scrollViewVariantsVariant,
};

const scrollViewContainer = style({
  display: "flex",
  flexDirection: "column",

  height: theme.sizes.full,
  width: theme.sizes.full,

  overflowY: "auto",
  overflowX: "hidden",

  selectors: {
    "&:after": {
      content: "''",
      display: "block",
      width: theme.sizes.full,
      height: calc.multiply(scrollViewKeyboardOverlap, "1px"),
      float: "left",
      clear: "both",

      flexGrow: 0,
      flexShrink: 0,
    },
  },
});

const scrollViewContents = style({
  display: "contents",
});

export const scrollView = {
  container: scrollViewContainer,
  contents: scrollViewContents,

  variants: scrollViewVariants,

  vars: scrollViewKeyboardVars,
};
