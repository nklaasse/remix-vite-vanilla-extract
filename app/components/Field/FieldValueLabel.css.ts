import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { field } from "./Field.css";

const fieldValueLabelContainer = style({
  ...mixins.typography.text,

  gridArea: "valueLabel",

  marginBlockEnd: theme.space[0.5],

  color: theme.colors.gray[11],

  selectors: {
    [`${field.variants.hideLabel.true} &`]: {
      ...mixins.visuallyHidden,
    },
    [`${field.variants.hideLabel.false} &`]: {},
  },
});

export const fieldValueLabel = {
  container: fieldValueLabelContainer,
};
