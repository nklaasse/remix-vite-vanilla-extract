import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { navigationBar } from "./NavigationBar.css";
import { navigationRail } from "./NavigationRail.css";

const navigationMenuTabsContainer = style({
  display: "grid",

  selectors: {
    [`:is(${navigationRail.container}) &`]: {
      gridAutoFlow: "row",
      gridRowGap: theme.space[0.5],
      gridAutoRows: "max-content",

      width: theme.sizes.full,
      height: theme.sizes.full,

      paddingBlock: theme.space[2],
    },

    [`:is(${navigationBar.container}) &`]: {
      gridAutoFlow: "column",
      gridColumnGap: theme.space[0.5],

      width: theme.sizes.full,
      height: "max-content",
    },
  },
});

export const navigationMenuTabs = {
  container: navigationMenuTabsContainer,
};
