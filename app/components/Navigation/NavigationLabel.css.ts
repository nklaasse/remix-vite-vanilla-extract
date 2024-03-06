import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { navigationRail } from "./NavigationRail.css";

const navigationTabLabelContainer = style({
  ...mixins.typography.small,

  fontWeight: theme.fontWeights.semiBold,

  color: "inherit",

  marginBlockStart: theme.space[1],

  textAlign: "center",

  order: 2,

  overflow: "hidden",

  selectors: {
    [`${navigationRail.container} &`]: {
      width: calc.add(theme.space[2], theme.sizes.icon, theme.space[2]),
    },
  },
});

export const navigationTabLabel = {
  container: navigationTabLabelContainer,
};

const navigationDrawerLabelContainer = style({
  ...mixins.typography.text,

  borderRadius: theme.radii.circle,

  color: "inherit",

  order: 1,
});

export const navigationDrawerLabel = {
  container: navigationDrawerLabelContainer,
};
