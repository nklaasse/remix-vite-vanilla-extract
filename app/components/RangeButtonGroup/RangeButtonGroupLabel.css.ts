import { mixins } from "~/css";
import { style } from "@vanilla-extract/css";

const inputLabelContainer = style({
  ...mixins.visuallyHidden,
});

export const inputLabel = {
  container: inputLabelContainer,
};
