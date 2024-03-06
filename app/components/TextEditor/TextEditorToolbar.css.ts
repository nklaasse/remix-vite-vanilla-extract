import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const textEditorToolbarContainer = style({
  flexGrow: 0,
  flexShrink: 0,

  zIndex: 3,

  position: "sticky",
  insetBlockStart: theme.space[0],

  display: "grid",

  gridAutoFlow: "column",
  gridAutoColumns: "min-content",
  gridColumnGap: theme.space[2],
  gridArea: "toolbar",

  flexDirection: "row",

  alignItems: "center",

  overflowX: "auto",
  overflowY: "hidden",

  paddingInline: theme.space[2],
  paddingBlock: calc.subtract(
    theme.space[1],
    calc.divide(theme.borderWidths.border, 2)
  ),

  borderWidth: 0,
  borderBlockEndWidth: theme.borderWidths.border,
  borderColor: theme.colors.accent[7],
  borderStyle: "solid",

  msOverflowStyle: "none",
  scrollbarWidth: "none",

  backgroundColor: "inherit",

  borderStartStartRadius: "inherit",
  borderStartEndRadius: "inherit",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const textEditorToolbar = {
  container: textEditorToolbarContainer,
};
