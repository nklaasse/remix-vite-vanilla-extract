import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const menuSectionContainer = style({
  display: "flex",
  flexDirection: "column",

  marginInline: theme.space[0],
  marginBlockEnd: theme.space[0.5],
});

export const menuSection = {
  container: menuSectionContainer,
};
