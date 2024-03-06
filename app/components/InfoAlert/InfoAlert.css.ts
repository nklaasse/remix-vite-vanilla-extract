import { theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";

const infoAlertTypes = styleVariants({
  info: {},
  error: {},
});

const infoAlertVariants = {
  type: infoAlertTypes,
};

const infoAlertContainer = style({
  padding: theme.space[1],
  borderRadius: theme.radii[0.5],

  backgroundColor: theme.colors.error[4],
  color: theme.colors.error[12],

  selectors: {
    [`&:is(${infoAlertVariants.type.info})`]: {
      backgroundColor: theme.colors.selection[4],
      color: theme.colors.selection[12],
    },
    [`&:is(${infoAlertVariants.type.error})`]: {
      backgroundColor: theme.colors.error[4],
      color: theme.colors.error[12],
    },
  },
});

export const infoAlert = {
  container: infoAlertContainer,

  variants: infoAlertVariants,
};
