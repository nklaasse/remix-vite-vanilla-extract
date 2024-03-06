import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const formContainer = style({
  display: "grid",
  gridGap: theme.space[2],
  gridAutoFlow: "row",
  gridAutoRows: "min-content",

  width: theme.sizes.full,
  maxWidth: theme.sizes.form,
  minHeight: theme.sizes.full,
});

export const form = {
  container: formContainer,
};
