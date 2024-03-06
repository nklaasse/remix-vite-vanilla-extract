import { breakpoints, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const alertDialogUnderlay = style({
  position: "absolute",
  inset: theme.space[0],

  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",

  backgroundColor: theme.colors.overlay[10],

  "@media": {
    [breakpoints.medium]: {
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

const alertDialogContainer = style({
  position: "fixed",
  inset: theme.space[0],

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const alertDialogOverlay = style({
  position: "relative",

  display: "grid",

  maxWidth: theme.sizes.content,
  width: theme.sizes.full,

  padding: theme.space[2],
  margin: theme.space[2],

  backgroundColor: theme.colors.gray[1],

  borderRadius: theme.radii[2],

  overflowY: "auto",

  gridTemplate: `
    "title   title       title   " auto
    "content content     content " 1fr
    ".       cancel      confirm " auto
  /  1fr     max-content max-content`,

  "@media": {
    [breakpoints.medium]: {
      padding: theme.space[4],
      margin: theme.space[4],
    },
  },
});

export const alertDialog = {
  container: alertDialogContainer,
  overlay: alertDialogOverlay,
  underlay: alertDialogUnderlay,
};
