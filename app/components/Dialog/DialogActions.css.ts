import { breakpoints, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const dialogActionsContainer = style({
  gridArea: "actions",

  display: "flex",

  justifyContent: "flex-end",

  paddingBlockStart: theme.space[3],
  paddingBlockEnd: theme.space[2],

  // We need to disable pointer events on the container so that the
  // padding created by the sticky position doesn't block clicks on
  // the elements on the page
  pointerEvents: "none",

  selectors: {
    "&:before, &:after": {
      content: "''",

      display: "block",

      width: "auto",
    },

    "&:before": {
      height: theme.space[3],
      display: "none",
    },

    "&:after": {
      height: theme.space[2],
      display: "none",
    },
  },

  "@media": {
    [breakpoints.medium]: {
      paddingBlockStart: theme.space[4],
      paddingBlockEnd: theme.space[4],
      marginBlockEnd: calc.multiply(theme.space[4], -1),
    },
  },
});

const dialogActionsActions = style({
  display: "grid",

  gridAutoFlow: "column",
  gridColumnGap: theme.space[1],

  justifyContent: "flex-end",

  marginInlineStart: "auto",

  // Enable pointer events again so the actions are usable
  pointerEvents: "initial",
});

export const dialogActions = {
  container: dialogActionsContainer,
  actions: dialogActionsActions,
};
