import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { field } from "./Field.css";

const fieldLabelContainer = style({
  ...mixins.typography.text,

  gridArea: "label",

  maxWidth: theme.sizes.full,

  marginBlockEnd: theme.space[0.5],
  marginInlineEnd: theme.space[0.5],

  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  color: theme.colors.gray[11],

  selectors: {
    [`${field.variants.hideLabel.true} &`]: {
      ...mixins.visuallyHidden,
    },
    [`${field.variants.hideLabel.false} &`]: {},
  },
});

export const fieldLabel = {
  container: fieldLabelContainer,
};
