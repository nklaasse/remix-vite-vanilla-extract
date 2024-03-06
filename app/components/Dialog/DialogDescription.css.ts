import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const dialogDescriptionContainer = style({
  ...mixins.typography.text,

  marginBlockStart: theme.space[1],
  marginBlockEnd: theme.space[0],

  gridArea: "description",
});

export const dialogDescription = {
  container: dialogDescriptionContainer,
};
