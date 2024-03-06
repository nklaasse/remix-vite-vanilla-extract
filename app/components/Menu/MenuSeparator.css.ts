import { breakpoints, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const menuSeparatorContainer = style({
  paddingInline: theme.space[3],
  paddingBlock: theme.space[0.5],

  selectors: {
    "&:before": {
      content: '""',
      display: "block",
      height: theme.borderWidths.delimiter,
      width: theme.sizes.full,

      marginBlock: calc.multiply(
        calc.divide(theme.borderWidths.delimiter, 2),
        -1
      ),

      backgroundColor: theme.colors.gray[6],
    },
  },

  "@media": {
    [breakpoints.medium]: {
      paddingInline: theme.space[2],
    },
  },
});

export const menuSeparator = {
  container: menuSeparatorContainer,
};
