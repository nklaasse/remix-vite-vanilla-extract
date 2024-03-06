import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const inputGroupButtonContainer = style({
  flexShrink: 0,
  flexGrow: 0,

  position: "relative",

  boxSizing: "content-box",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  minWidth: calc.multiply(
    mixins.typography.text.fontSize,
    mixins.typography.text.lineHeight
  ),

  paddingBlock: calc.subtract(theme.space[2], theme.borderWidths.border),
  paddingInline: calc.divide(theme.space[2], 2),

  borderWidth: 0,
  borderStyle: "none",
  borderColor: "transparent",
  borderStartEndRadius: theme.radii[0.5],
  borderEndEndRadius: theme.radii[0.5],

  backgroundColor: "transparent",
  color: theme.colors.accent[11],

  outline: "none",

  cursor: "pointer",

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

export const inputGroupButton = {
  container: inputGroupButtonContainer,
};
