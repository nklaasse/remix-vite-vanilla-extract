import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { cardMeta } from "./CardMeta.css";

const container = style({
  ...mixins.typography["compact"],
  fontWeight: theme.fontWeights.bold,
  color: theme.colors.gray[12],

  selectors: {
    [`:is(${cardMeta.container}) &:not(:last-child):after`]: {
      content: "·",
      marginInline: theme.space["0.5"],
    },
  },
});

export const cardText = {
  container: container,
};
