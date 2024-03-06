import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { field } from "./Field.css";

export const fieldDescriptionContainer = style({
  ...mixins.typography.compact,

  display: "inline-flex",

  color: theme.colors.gray[11],

  marginBlockStart: theme.space[0.5],

  gridArea: "description",

  width: theme.sizes.full,

  selectors: {
    [`:is(${field.variants.hasErrorMessage.true}) &`]: {
      display: "none",
    },
  },
});

export const fieldDescription = {
  container: fieldDescriptionContainer,
};
