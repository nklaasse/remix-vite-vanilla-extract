import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const toolbarGroupContainer = style({
  display: "grid",

  gridAutoFlow: "column",
  gridAutoColumns: "max-content",
  gridTemplateRows: "auto",
  gridColumnGap: theme.space[0.5],

  alignItems: "center",

  flexGrow: 0,
  flexShrink: 0,

  selectors: {
    "&:not(:first-child)": {
      marginInlineStart: theme.space[0.5],
    },
  },
});

export const toolbarGroup = {
  container: toolbarGroupContainer,
};
