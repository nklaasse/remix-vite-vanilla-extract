import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const navigationRailContainer = style({
  display: "grid",
  gridAutoFlow: "row",
  gridAutoRows: "max-content",

  paddingBlock: theme.space[1],

  width: theme.sizes.full,
  height: theme.sizes.full,

  borderInlineEndWidth: theme.borderWidths.border,
  borderInlineEndColor: theme.colors.gray[6],
  borderInlineEndStyle: "solid",
});

export const navigationRail = {
  container: navigationRailContainer,
};
