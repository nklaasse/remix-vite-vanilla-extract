import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const lineHeight = calc.multiply(
  mixins.typography.text.fontSize,
  mixins.typography.text.lineHeight
);

const textEditorCanvasContainer = style({
  ...mixins.typography.text,

  flexGrow: 0,
  flexShrink: 1,

  display: "flex",
  flexDirection: "column",
  justifyContent: "stretch",

  position: "relative",
  isolation: "isolate",

  borderEndEndRadius: theme.radii[0.5],
  borderEndStartRadius: theme.radii[0.5],

  minHeight: calc.multiply(
    calc.multiply(lineHeight, 7),
    calc.multiply(theme.space[2], 2)
  ),
  maxHeight: theme.sizes.full,
});

const textEditorContentEditable = style({
  ...mixins.typography.text,

  flexGrow: 1,
  flexShrink: 0,

  position: "relative",
  zIndex: 1,

  height: theme.sizes.full,

  boxSizing: "border-box",

  outline: "none",

  userSelect: "text",

  minHeight: calc.add(calc.multiply(lineHeight, 7)),

  padding: theme.space[2],
});

const textEditorCanvasPlaceholder = style({
  ...mixins.typography.text,

  position: "absolute",
  inset: theme.space[2],

  color: theme.colors.gray[9],

  overflow: "hidden",
});

export const textEditorCanvas = {
  container: textEditorCanvasContainer,
  contentEditable: textEditorContentEditable,
  placeholder: textEditorCanvasPlaceholder,
};
