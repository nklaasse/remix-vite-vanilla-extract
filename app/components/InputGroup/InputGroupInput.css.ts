import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { inputGroup } from "./InputGroup.css";

const inputGroupInputContainer = style({
  ...mixins.typography.text,

  paddingBlock: calc.subtract(theme.space[2], theme.borderWidths.border),
  paddingInline: calc.divide(theme.space[2], 2),

  verticalAlign: "middle",

  outline: "none",

  flexShrink: 1,
  flexGrow: 0,
  width: theme.sizes.full,
  height: calc.add(
    calc.multiply(
      mixins.typography.text.fontSize,
      mixins.typography.text.lineHeight
    ),
    calc.multiply(calc.subtract(theme.space[2], theme.borderWidths.border), 2)
  ),

  background: "transparent",

  border: "none",

  boxSizing: "border-box",

  color: "inherit",

  selectors: {
    [`${inputGroup.container}:is(${inputGroup.states.isDisabled}) &`]: {
      cursor: "not-allowed",
    },

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

export const inputGroupInput = {
  container: inputGroupInputContainer,
};
