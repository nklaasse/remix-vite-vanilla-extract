import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const railLogoContainer = style({
  display: "flex",

  alignItems: "center",
  justifyContent: "center",

  width: theme.sizes.full,

  paddingBlock: theme.space[1],

  boxSizing: "content-box",

  height: calc.add(
    theme.space[1],
    calc.multiply(
      mixins.typography["compact"].fontSize,
      mixins.typography["compact"].lineHeight
    ),
    theme.space[1]
  ),
});

export const railLogo = {
  container: railLogoContainer,
};
