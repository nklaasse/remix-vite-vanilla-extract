import { style } from "@vanilla-extract/css";

const fieldResetContainer = style({
  gridArea: "reset",

  alignSelf: "center",
});

export const fieldReset = {
  container: fieldResetContainer,
};
