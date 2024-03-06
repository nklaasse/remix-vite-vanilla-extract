import { theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const tableRowStates = styleVariants({
  isFocusVisible: {},
});

const tableRowContainer = style({
  position: "relative",

  outline: "none",

  selectors: {
    [`&:is(${tableRowStates.isFocusVisible}):after`]: {
      content: "''",

      position: "absolute",
      inset: theme.space[0],
      insetBlockStart: calc.negate(theme.borderWidths.border),
      insetBlockEnd: calc.negate(theme.borderWidths.delimiter),

      borderRadius: theme.radii[0.5],

      zIndex: 1,

      display: "block",

      borderWidth: theme.borderWidths.delimiter,

      borderColor: theme.colors.accent[7],
      borderStyle: "solid",

      isolation: "isolate",
    },
  },
});

export const tableRow = {
  container: tableRowContainer,

  states: tableRowStates,
};
