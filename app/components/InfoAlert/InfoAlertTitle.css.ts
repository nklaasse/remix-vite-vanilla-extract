import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const infoAlertTitleContainer = style({
  ...mixins.typography["heading-6"],

  paddingInline: theme.space[1],
  paddingBlock: theme.space[0.5],

  margin: theme.space[0],
});

export const infoAlertTitle = {
  container: infoAlertTitleContainer,
};
