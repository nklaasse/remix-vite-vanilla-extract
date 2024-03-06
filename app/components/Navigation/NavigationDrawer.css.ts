import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const clamp = (min: string, value: string, max: string) =>
  `clamp(${min}, ${value}, ${max})`;

const navigationDrawerContainer = style({
  position: "fixed",
  inset: theme.space[0],
});

const navigationDrawerUnderlay = style({
  position: "absolute",
  inset: theme.space[0],

  backgroundColor: theme.colors.overlay[11],
});

const navigationDrawerOverlay = style({
  position: "absolute",
  insetBlock: theme.space[0],
  insetInlineStart: theme.space[0],

  background: theme.colors.gray[1],

  minWidth: clamp(
    calc.subtract("320px", theme.space[2]),
    theme.sizes["3/4"],
    "400px"
  ),
  maxWidth: `${calc.subtract(theme.sizes.full, theme.space[2])}`,

  borderStartEndRadius: theme.radii[2],
  borderEndEndRadius: theme.radii[2],

  padding: theme.space[1],
});

const navigationDrawerClose = style({
  padding: theme.space[1],
});

const navigationDrawerContent = style({
  paddingBlock: theme.space[1],
});

const navigationDrawerDialog = style({
  height: theme.sizes.full,
});

export const navigationDrawer = {
  container: navigationDrawerContainer,

  underlay: navigationDrawerUnderlay,
  overlay: navigationDrawerOverlay,

  dialog: navigationDrawerDialog,

  close: navigationDrawerClose,
  content: navigationDrawerContent,
};

const menuContainer = style({
  display: "grid",

  gridAutoFlow: "row",
  gridTemplateColumns: theme.sizes.full,
  gridAutoRows: "max-content",

  gridRowGap: theme.space[1],
});

export const menu = {
  container: menuContainer,
};
