import { style } from "@vanilla-extract/css";
import { mixins, theme } from "~/css";

const tableOfContentsTitleContainer = style({
  ...mixins.typography["heading-6"],

  color: theme.colors.gray[12],

  marginBlockEnd: theme.space[2.5],
});

export const tableOfContentsTitle = {
  container: tableOfContentsTitleContainer,
};
