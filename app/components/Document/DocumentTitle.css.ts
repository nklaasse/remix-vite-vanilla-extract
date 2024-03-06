import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const documentTitleContainer = style({
  ...mixins.typography.text,

  gridArea: "title",

  display: "inline-flex",
  alignItems: "center",

  fontWeight: theme.fontWeights.medium,

  marginBlockStart: theme.space[0.5],

  paddingBlock: theme.space[0.5],
  paddingInline: theme.space[1.5],

  color: theme.colors.gray[12],

  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  minWidth: 0,
});

const documentText = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const documentPlaceholder = style([
  documentText,
  {
    color: theme.colors.gray[11],
  },
]);

export const documentTitle = {
  container: documentTitleContainer,
  text: documentText,
  placeholder: documentPlaceholder,
};
