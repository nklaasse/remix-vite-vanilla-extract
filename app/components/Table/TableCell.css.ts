import { theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const tableCellStates = styleVariants({
  isFocusVisible: {},
});

const tableCellContainer = style({
  position: "relative",

  color: theme.colors.gray[12],

  paddingInline: theme.space[1],
  paddingBlock: theme.space[2],
  paddingBlockStart: calc.add(theme.space[2], theme.borderWidths.border),

  textAlign: "start",

  maxWidth: "100%",

  outline: "none",

  selectors: {
    "&:before": {
      content: '""',

      position: "absolute",
      height: theme.borderWidths.border,
      insetInline: theme.space[0],
      insetBlockStart: theme.space[0],

      backgroundColor: theme.colors.gray[6],
    },

    [`&:is(${tableCellStates.isFocusVisible}):after`]: {
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

export const tableCell = {
  container: tableCellContainer,

  states: tableCellStates,
};
