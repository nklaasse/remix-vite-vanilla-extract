import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const menuLabelContainer = style({
  ...mixins.typography.text,

  fontWeight: theme.fontWeights.regular,

  overflow: "hidden",
  textOverflow: "ellipsis",

  gridArea: "label",
});

export const menuLabel = {
  container: menuLabelContainer,
};
