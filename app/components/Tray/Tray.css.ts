import { modes, theme, utils } from "~/css";
import { style } from "@vanilla-extract/css";

const trayContainer = style([
  {
    position: "fixed",

    inset: theme.space[0],

    height: theme.sizes.full,
    paddingBottom: utils.safeArea.bottom,
    paddingTop: utils.safeArea.top,

    display: "flex",

    alignItems: "flex-end",
    justifyContent: "center",
  },
]);

const trayUnderlay = style({
  position: "absolute",
  inset: theme.space[0],

  backgroundColor: theme.colors.overlay[10],
});

const trayOverlay = style([
  {
    position: "relative",

    boxSizing: "border-box",

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",

    paddingInline: theme.space[2],
    paddingBlockStart: theme.space[4],
    paddingBlockEnd: theme.space[2],

    width: theme.sizes.full,
    maxWidth: "480px",
    height: theme.sizes.full,
  },
]);

const trayClose = style([
  modes.dark,
  {
    flexGrow: 0,
    flexShrink: 0,

    marginInline: theme.space[1],

    borderRadius: theme.radii.circle,
  },
]);

const trayContent = style([
  modes.dark,
  {
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",

    flexGrow: 0,
    flexShrink: 1,

    width: theme.sizes.full,
    minHeight: theme.sizes[0],

    marginBlockStart: theme.space[1],

    borderRadius: theme.radii[0.5],

    overflow: "hidden",
  },
]);

export const tray = {
  container: trayContainer,
  close: trayClose,
  underlay: trayUnderlay,
  overlay: trayOverlay,
  content: trayContent,
};
