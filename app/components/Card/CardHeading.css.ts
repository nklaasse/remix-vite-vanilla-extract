import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const container = style({
  ...mixins.typography["intro"],

  marginBlockStart: theme.space["2"],

  fontWeight: theme.fontWeights.bold,

  color: theme.colors.gray[12],

  outline: "none",

  order: 3,
});

export const cardHeading = {
  container: container,
};
