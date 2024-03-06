import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const textEditorShortcutContainer = style({
  display: "inline-grid",
  gridAutoFlow: "column",
  gridAutoColumns: "auto",
  gridAutoRows: "auto",
  gridGap: theme.borderWidths.delimiter,

  marginInlineStart: theme.space[1],
});

const textEditorShortcutShortcut = style({
  display: "inline-block",

  fontWeight: theme.fontWeights.regular,

  paddingInline: theme.space[0.5],
  marginBlock: calc.multiply(theme.borderWidths.border, -1),

  fontVariant: "monospace",

  // Reset the font because otherwise we don't have the right ligatures.
  fontFamily: "Arial, Helvetica, sans-serif",

  backgroundColor: theme.colors.gray[3],
  color: theme.colors.gray[11],
  borderColor: theme.colors.gray[6],
  borderRadius: theme.radii[0.5],
  borderWidth: theme.borderWidths.border,
  borderStyle: "solid",
});

export const textEditorShortcut = {
  container: textEditorShortcutContainer,
  shortcut: textEditorShortcutShortcut,
};
