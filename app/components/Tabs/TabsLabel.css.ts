import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { tabsTab } from "./TabsTab.css";

const tabsLabelContainer = style({
  fontWeight: theme.fontWeights.medium,

  color: theme.colors.gray[11],

  selectors: {
    [`:is(${tabsTab.states.isSelected}) &`]: {
      color: theme.colors.gray[12],
    },
  },
});

export const tabsLabel = {
  ...mixins.typography.text,

  container: tabsLabelContainer,
};
