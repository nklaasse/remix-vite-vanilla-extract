import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { toolbarGroup } from "./ToolbarGroup.css";

const toolbarActionsContainer = style([
  toolbarGroup.container,
  {
    display: "flex",
    flexDirection: "row",

    width: theme.sizes.full,

    flexShrink: 1,
    overflow: "hidden",

    borderRadius: "inherit",

    padding: theme.space[1],
    margin: calc.negate(theme.space[1]),
  },
]);

export const toolbarActions = {
  container: toolbarActionsContainer,
};
