import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const infoAlertDescriptionContainer = style({
  ...mixins.typography.compact,

  paddingInline: theme.space[1],
  paddingBlock: theme.space[0.5],

  margin: theme.space[0],
});

export const infoAlertDescription = {
  container: infoAlertDescriptionContainer,
};
