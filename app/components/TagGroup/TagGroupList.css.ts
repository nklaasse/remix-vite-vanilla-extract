import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const tagGroupListContainer = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",

  margin: calc.multiply(theme.space[0.5], -1),

  minHeight: calc.add(
    theme.space[2],
    calc.multiply(theme.fontSizes.text, theme.lineHeights.text),
    theme.space[2]
  ),
});

export const tagGroupList = {
  container: tagGroupListContainer,
};
