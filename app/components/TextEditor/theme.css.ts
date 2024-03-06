import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import type { EditorThemeClasses } from "lexical";

const textBold = style({
  fontWeight: theme.fontWeights.bold,
});
const textItalic = style({
  fontStyle: "italic",
});
const textUnderline = style({
  textDecoration: "underline",
});
const textStrikethrough = style({
  textDecoration: "line-through",
});
const textUnderlineStrikethrough = style({
  textDecoration: "underline line-through",
});
const textBase = style({
  ...mixins.typography.text,
});

const text: EditorThemeClasses["text"] = {
  bold: textBold,
  base: textBase,
  italic: textItalic,
  underline: textUnderline,
  strikethrough: textStrikethrough,
  underlineStrikethrough: textUnderlineStrikethrough,
};

const paragraph = style({
  marginBlock: theme.space[0],
});

const link = style({
  ...mixins.accents.indigo,

  color: theme.colors.accent[9],
});

const listListItem = style({});
const listUnorderedList = style({
  paddingInlineStart: theme.space[4],
  marginBlock: theme.space[0],
});
const listOrderedList = style({
  paddingInlineStart: theme.space[4],
  marginBlock: theme.space[0],
});

const list: EditorThemeClasses["list"] = {
  listitem: listListItem,
  ul: listUnorderedList,
  ol: listOrderedList,
};

export const editorTheme: EditorThemeClasses = {
  text,
  paragraph,
  link,
  list,
};
