import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { elements } from "../_shared.css";
import { typography } from "../Typography/Typography.css";

const blockContainer = style([
  elements.block,
  {
    selectors: {
      // add spacing for p elements that are placed immediately after heading elements
      [`.${typography.container} .${elements.heading} + &`]: {
        marginBlockStart: theme.space[2],
      },

      // add spacing for compact and default div elements that are placed immediately after ul and ol elements
      [`.${typography.container} .${elements.list} + &`]: {
        marginBlockStart: theme.space[2],
      },

      // add spacing for p elements that are placed immediately after p elements
      [`.${typography.container} ${elements.block} + &`]: {
        marginBlockStart: theme.space[1],
      },
    },
  },
]);

export const block = {
  container: blockContainer,
};
