import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const railButtonContainer = style({
  paddingInline: calc.subtract(
    theme.space[1],
    calc.divide(theme.borderWidths.border, 2)
  ),
  paddingBlock: theme.space[1],

  width: theme.sizes.full,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  boxSizing: "border-box",
});

export const railButton = {
  container: railButtonContainer,
};
