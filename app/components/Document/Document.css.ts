import { style, styleVariants } from "@vanilla-extract/css";

const documentVariants = styleVariants({
  "resume": {},
  "cover-letter": {},
});

const documentContainer = style({
  display: "grid",

  gridTemplate: `
    "preview     preview    " max-content
    "title       actions    " auto
  /  1fr         min-content
  `,
});

export const document = {
  container: documentContainer,

  variants: documentVariants,
};
