import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const fieldsetContainer = style({
  margin: theme.space[0],
  padding: theme.space[0],

  border: "none",

  width: theme.sizes.full,
});

const fieldsetContent = style({
  display: "grid",

  alignItems: "center",

  gridTemplate: `
    "legend      actions     "
    "description description "
    "fields      fields      "
  /  1fr         max-content
  `,

  width: theme.sizes.full,
});

export const fieldset = {
  container: fieldsetContainer,
  content: fieldsetContent,
};
