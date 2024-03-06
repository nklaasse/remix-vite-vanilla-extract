import { style } from "@vanilla-extract/css";

export const menuActionContainer = style({
  display: "grid",
  gridTemplate: `
    "icon      label        badge       indicator" 1fr
    ".         description  badge       indicator" auto
  /  auto      1fr          max-content max-content
  `,
  outline: "none",
});

export const menuAction = {
  container: menuActionContainer,
};
