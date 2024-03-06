import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const tableContainer = style({
  width: theme.sizes.full,

  borderSpacing: theme.space[0],
});

export const table = {
  container: tableContainer,
};
