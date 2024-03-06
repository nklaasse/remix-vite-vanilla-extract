import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

export const fieldErrorMessageContainer = style({
  ...mixins.typography.compact,

  display: "inline-flex",

  color: theme.colors.error[11],

  marginBlockStart: theme.space[0.5],

  gridArea: "description",

  width: theme.sizes.full,
});

export const fieldErrorMessage = {
  container: fieldErrorMessageContainer,
};
