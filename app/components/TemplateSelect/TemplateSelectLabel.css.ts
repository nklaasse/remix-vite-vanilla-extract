import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const templateSelectPreviewLabelContainer = style({
  ...mixins.typography.compact,

  paddingInline: theme.space[1],
  paddingBlockStart: theme.space[1],

  fontWeight: theme.fontWeights.semiBold,

  color: theme.colors.accent[12],

  textAlign: "center",
});

export const templateSelectPreviewLabel = {
  container: templateSelectPreviewLabelContainer,
};
