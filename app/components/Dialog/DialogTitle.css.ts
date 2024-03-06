import { style } from "@vanilla-extract/css";

const dialogTitleContainer = style({
  gridArea: "title",

  display: "flex",
  alignItems: "center",

  zIndex: 1,
});

export const dialogTitle = {
  container: dialogTitleContainer,
};
