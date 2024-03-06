import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const tableBodyEmptySlate = style({
  position: "relative",

  paddingBlock: theme.space[2],
  paddingInline: theme.space[1],

  color: theme.colors.gray[11],

  ...mixins.typography.compact,

  selectors: {
    "&:before": {
      content: '""',

      position: "absolute",
      height: theme.borderWidths.border,
      insetInline: theme.space[0],
      insetBlockStart: theme.space[0],

      backgroundColor: theme.colors.gray[6],
    },
  },
});

export const tableBody = {
  emptySlate: tableBodyEmptySlate,
};
