import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const cardAuthorContainer = style({
  display: "grid",
  position: "relative",

  gridAutoFlow: "column",
  gridTemplateColumns: "auto 1fr",
  gap: theme.space[2],
  alignItems: "center",

  marginBlockStart: theme.space[2],
  order: 4,
});

export const cardAuthor = {
  container: cardAuthorContainer,
};
