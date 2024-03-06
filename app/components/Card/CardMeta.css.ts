import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const cardMetaContainer = style({
  ...mixins.typography["compact"],

  marginBlockStart: theme.space["3"],

  fontWeight: theme.fontWeights.bold,
  color: theme.colors.gray[12],

  order: 2,
});

export const cardMeta = {
  container: cardMetaContainer,
};
