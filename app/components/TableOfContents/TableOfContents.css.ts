import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const tableOfContentsContainer = style({
  inlineSize: theme.sizes.full,

  backgroundColor: theme.colors.gray[1],
});

export const tableOfContents = {
  container: tableOfContentsContainer,
};
