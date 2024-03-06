import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const inputGroupTextAreaContainer = style({
  ...mixins.typography.text,

  paddingBlock: calc.subtract(theme.space[1], theme.borderWidths.border),
  paddingInline: calc.divide(theme.space[1.5], 2),

  verticalAlign: "middle",

  outline: "none",

  flexShrink: 1,
  flexGrow: 0,
  width: theme.sizes.full,

  background: "transparent",

  border: "none",

  boxSizing: "border-box",

  resize: "none",

  selectors: {
    "&:first-child": {
      paddingInlineStart: calc.subtract(
        theme.space[1.5],
        theme.borderWidths.border
      ),
    },

    "&:last-child": {
      paddingInlineEnd: calc.subtract(
        theme.space[1.5],
        theme.borderWidths.border
      ),
    },
  },
});

export const inputGroupTextArea = {
  container: inputGroupTextAreaContainer,
};
