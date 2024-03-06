import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const inputGroupInputValue = style({
  ...mixins.typography.text,

  boxSizing: "border-box",

  paddingBlock: calc.subtract(theme.space[2], theme.borderWidths.border),
  paddingInline: calc.divide(theme.space[2], 2),

  flexShrink: 1,
  flexGrow: 0,
  width: theme.sizes.full,
  minHeight: calc.add(
    calc.multiply(
      mixins.typography.text.fontSize,
      mixins.typography.text.lineHeight
    ),
    calc.multiply(calc.subtract(theme.space[2], theme.borderWidths.border), 2)
  ),

  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  selectors: {
    "&:first-child": {
      paddingInlineStart: calc.subtract(
        theme.space[2],
        theme.borderWidths.border
      ),
    },

    "&:last-child": {
      paddingInlineEnd: calc.subtract(
        theme.space[2],
        theme.borderWidths.border
      ),
    },
  },
});

export const inputGroupValue = {
  container: inputGroupInputValue,
};
