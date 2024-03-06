import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const fieldInputContainer = style({
  gridArea: "input",

  width: theme.sizes.full,
});

export const fieldInput = {
  container: fieldInputContainer,
};
