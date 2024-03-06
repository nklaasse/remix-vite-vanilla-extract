import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const fieldsetLegendContainer = style({
  ...mixins.typography["heading-6"],

  display: "flex",
  alignItems: "center",

  padding: theme.space[0],

  fontWeight: theme.fontWeights.bold,

  marginBlockEnd: theme.space[1],

  color: theme.colors.gray[12],

  "@media": {
    [breakpoints.medium]: { ...mixins.typography["heading-5"] },
  },
});

export const fieldsetLegend = {
  container: fieldsetLegendContainer,
};
