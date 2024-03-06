import { style } from "@vanilla-extract/css";

export const menuLinkContainer = style({
  display: "grid",
  gridTemplate: `
    "icon      label        badge       indicator" 1fr
    ".         description  badge       indicator" auto
  /  auto      1fr          max-content max-content
  `,

  outline: "none",

  color: "inherit",

  textDecoration: "none",
});

export const menuLink = {
  container: menuLinkContainer,
};
