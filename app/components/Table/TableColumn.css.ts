import { mixins, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const tableColumnStates = styleVariants({
  isFocusVisible: {},
});

const tableColumnSizeVariants = styleVariants({
  "fit-content": {},
  "auto": {},
});

const tableColumnVariants = {
  size: tableColumnSizeVariants,
};

const tableColumnContainer = style({
  ...mixins.typography.compact,

  position: "relative",

  color: theme.colors.gray[11],

  padding: theme.space[1],

  textAlign: "start",

  width: "auto",
  maxWidth: "100%",

  outline: "none",

  selectors: {
    [`&:is(${tableColumnSizeVariants.auto})`]: {
      width: "auto",
    },

    [`&:is(${tableColumnSizeVariants["fit-content"]})`]: {
      minWidth: "fit-content",
      width: "0px",
    },

    [`&:is(${tableColumnStates.isFocusVisible}):after`]: {
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

export const tableColumn = {
  container: tableColumnContainer,

  variants: tableColumnVariants,

  states: tableColumnStates,
};
