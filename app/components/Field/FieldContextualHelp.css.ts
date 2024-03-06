import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const fieldContextualHelpContainer = style({
  ...mixins.typography.text,

  gridArea: "contextualHelp",

  display: "inline-flex",
  alignSelf: "center",

  marginBlockEnd: theme.space[0.5],
});

const fieldContextualHelpContent = style({
  padding: theme.space[1],

  maxWidth: "320px",
});

export const fieldContextualHelp = {
  container: fieldContextualHelpContainer,
  content: fieldContextualHelpContent,
};
