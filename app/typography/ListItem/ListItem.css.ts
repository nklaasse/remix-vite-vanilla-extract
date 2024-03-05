import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { typography } from "../Typography/Typography.css";

// Li
export const listItem = style({
  ...mixins.typography.text,
  color: theme.colors.gray[11],

  selectors: {
    // add spacing for li elements that are placed immediately after li elements
    [`.${typography.container} & + &`]: {
      marginBlockStart: theme.space["0.5"],
    },
  },
});
