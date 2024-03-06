import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const accordionContainer = style({
  inlineSize: theme.sizes.full,
});

export const accordion = {
  container: accordionContainer,
};
