import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const fieldsetDescriptionContainer = style({
  ...mixins.typography.text,

  gridArea: "description",

  color: theme.colors.gray[11],

  selectors: {
    "&:not(:last-child)": {
      marginBlockEnd: theme.space[0.5],
    },
  },
});

export const fieldsetDescription = {
  container: fieldsetDescriptionContainer,
};
