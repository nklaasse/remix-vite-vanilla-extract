import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const toolbarDefaultLabelContainer = style({
  ...mixins.typography.compact,

  padding: theme.space[0.5],
});

export const toolbarDefaultLabel = {
  container: toolbarDefaultLabelContainer,
};
