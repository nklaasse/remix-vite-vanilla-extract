import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const switchDescriptionContainer = style({
  ...mixins.typography.compact,

  gridArea: "description",

  marginInlineEnd: theme.space[1],

  color: theme.colors.gray[11],
});

export const switchDescription = {
  container: switchDescriptionContainer,
};
