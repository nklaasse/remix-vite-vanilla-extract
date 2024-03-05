import { style } from "@vanilla-extract/css";
import { theme, mixins } from "~/css";

export const container = style({
  color: theme.colors.error[1],
  fontSize: theme.fontSizes.caption,
  backgroundColor: theme.colors.error[1],
  ...mixins.accents.brand,
});
