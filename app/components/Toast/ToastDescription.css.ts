import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const container = style({
  ...mixins.typography.compact,
  color: theme.colors.gray[11],

  marginBlockStart: theme.space[1],
});

export const toastDescription = {
  container,
};
