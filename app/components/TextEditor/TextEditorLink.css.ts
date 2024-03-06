import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const textEditorLinkFormContainer = style({
  display: "flex",
  flexDirection: "column",

  padding: theme.space[2],

  width: theme.sizes.full,
  minWidth: "320px",

  boxSizing: "border-box",
});

const textEditorLinkFormActions = style({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "min-content",
  gridColumnGap: theme.space[2],

  marginBlockStart: theme.space[2],
  marginInlineStart: "auto",

  width: "min-content",
});

export const textEditorLinkForm = {
  container: textEditorLinkFormContainer,

  actions: textEditorLinkFormActions,
};

const textEditorLinkOverlayContainer = style({
  width: theme.sizes.full,
});

export const textEditorLinkOverlay = {
  container: textEditorLinkOverlayContainer,
};
