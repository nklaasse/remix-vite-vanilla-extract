import { mixins, modes, theme } from "~/css";
import { style } from "@vanilla-extract/css";

const toolbarContainer = style([
  modes.dark,
  {
    position: "sticky",

    insetBlockEnd: theme.space[2],

    display: "flex",
    flexDirection: "row",

    justifyContent: "space-between",

    marginInline: "auto",
    padding: theme.space[1],

    width: theme.sizes.full,

    borderRadius: theme.radii.circle,

    color: theme.colors.gray[12],

    backgroundColor: theme.colors.gray[1],

    whiteSpace: "nowrap",
  },
]);

const toolbarCount = style({
  ...mixins.typography.compact,

  padding: theme.space[0.5],
});

export const toolbar = {
  container: toolbarContainer,
  count: toolbarCount,
};
