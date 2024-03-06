import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const toastTitleContainer = style({
  ...mixins.typography.text,

  fontWeight: theme.fontWeights.semiBold,

  marginInlineEnd: theme.space[5],
});

export const toastTitle = {
  container: toastTitleContainer,
};
