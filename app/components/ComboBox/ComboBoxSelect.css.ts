import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const defaultComboBoxContent = style({
  display: "flex",

  alignItems: "stretch",

  padding: theme.space[0],
  margin: theme.space[0],

  width: theme.sizes.full,
  height: theme.sizes.full,

  maxHeight: "360px",
  minWidth: "300px",
});

export const defaultComboBox = {
  content: defaultComboBoxContent,
};

const mobileComboBoxContainer = style({
  display: "flex",
  flexDirection: "column",

  maxHeight: "inherit",

  width: theme.sizes.full,
});

const mobileComboBoxItems = style({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "auto",

  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  gridTemplateRows: "100%",

  maxHeight: theme.sizes.full,

  overflow: "hidden",
});

const mobileComboBoxInput = style({
  flexShrink: 0,
  flexGrow: 0,

  insetBlockStart: theme.space[0],

  padding: theme.space[2],

  borderStartEndRadius: theme.radii[0.5],
  borderStartStartRadius: theme.radii[0.5],

  backgroundColor: theme.colors.gray[1],
});

const mobileComboBoxPlaceholder = style({
  color: theme.colors.gray[9],
});

export const mobileComboBox = {
  input: mobileComboBoxInput,
  items: mobileComboBoxItems,
  container: mobileComboBoxContainer,
  placeholder: mobileComboBoxPlaceholder,
};
