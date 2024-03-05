import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { elements } from "../_shared.css";
import { listItem } from "../ListItem/ListItem.css";
import { typography } from "../Typography/Typography.css";

export const orderedList = style([
  elements.list,
  {
    listStyleType: "decimal",

    paddingInlineStart: theme.space["2.5"],
    margin: 0,

    selectors: {
      // add spacing for ol elements that are placed immediately after p elements
      [`.${typography.container} .${elements.block} + &`]: {
        marginBlockStart: theme.space[2],
      },

      // add spacing for ol elements that are subitems placed immediately after p elements
      [`.${typography.container} .${listItem} .${elements.block} + &`]: {
        marginBlockStart: theme.space["0.5"],
      },

      // add spacing for ol elements that are placed immediately after heading elements
      [`.${typography.container} .${elements.heading} + &`]: {
        marginBlockStart: theme.space[2],
      },
    },
  },
]);
