import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const navigationBarContainer = style({
  display: "grid",
  gridAutoFlow: "column",
  paddingInline: theme.space[1],

  borderBlockStartWidth: theme.borderWidths.border,
  borderBlockStartColor: theme.colors.gray[6],
  borderBlockStartStyle: "solid",

  backgroundColor: theme.colors.gray[2],
});

export const navigationBar = {
  container: navigationBarContainer,
};
