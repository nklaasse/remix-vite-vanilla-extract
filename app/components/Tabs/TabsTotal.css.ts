import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const tabsTotalContainer = style({
  ...mixins.typography.caption,

  marginInlineStart: theme.space[1],

  borderRadius: theme.radii.circle,

  color: theme.colors.gray[11],
});

export const tabsTotal = {
  container: tabsTotalContainer,
};
