import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const fieldsetFieldsContainer = style({
  gridArea: "fields",

  display: "grid",
  gridAutoRows: "auto",
  gridAutoFlow: "row",
  gridAutoColumns: theme.sizes.full,
  gridRowGap: theme.space[2],

  maxWidth: theme.sizes.full,

  marginBlockStart: theme.space[1],
});

export const fieldsetFields = {
  container: fieldsetFieldsContainer,
};
