import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const selectTagGroupLabelContainer = style({
  ...mixins.typography.compact,

  fontWeight: theme.fontWeights.semiBold,
});

export const selectTagGroupLabel = {
  container: selectTagGroupLabelContainer,
};
