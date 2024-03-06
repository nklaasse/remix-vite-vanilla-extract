import { breakpoints, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const dialogContainer = style({
  position: "relative",

  padding: theme.space[1],

  display: "grid",

  gridTemplate: `
    ".                              .                                 close               close                         " ${theme.space[2]}
    ".                              title                             close               close                         " auto
    ".                              description                       description         .                             " auto
    ".                              content                           content             .                             " auto
    ".                              actions                           actions             .                             " max-content
  /  minmax(${theme.space[1]}, 1fr) minmax(auto, ${theme.sizes.form}) ${theme.space[3.5]} minmax(${theme.space[1]}, 1fr)
  `,

  width: theme.sizes.full,
  height: "min-content",

  boxSizing: "border-box",

  "@media": {
    [breakpoints.medium]: {
      gridTemplate: `
        ".                              .                                 close               close                         " ${theme.space[3]}
        ".                              title                             close               close                         " auto
        ".                              description                       description         .                             " auto
        ".                              content                           content             .                             " auto
        ".                              actions                           actions             .                             " max-content
        ".                              .                                 .                   .                             " ${theme.space[3]}
      /  minmax(${theme.space[3]}, 1fr) minmax(auto, ${theme.sizes.form}) ${theme.space[1.5]} minmax(${theme.space[3]}, 1fr)
      `,
    },
  },
});

export const dialog = {
  container: dialogContainer,
};
