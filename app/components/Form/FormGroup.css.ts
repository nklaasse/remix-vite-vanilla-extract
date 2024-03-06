import { breakpoints, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const formGroupContainer = style({
  display: "grid",
  gridGap: theme.space[2],
  gridAutoFlow: "row",
  gridAutoRows: "min-content",
  gridAutoColumns: "minmax(0%, 100%);",
  alignItems: "flex-start",

  maxWidth: theme.sizes.full,

  "@media": {
    [breakpoints.medium]: {
      gridAutoFlow: "column",
    },
  },
});

export const formGroup = {
  container: formGroupContainer,
};
