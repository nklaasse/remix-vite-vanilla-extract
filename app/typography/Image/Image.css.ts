import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { elements } from "../_shared.css";
import { typography } from "../Typography/Typography.css";

export const image = style([
  elements.image,
  {
    selectors: {
      // add spacing for img elements that are placed immediately after p elements
      // this is because the img element is always placed inside a p element
      [`.${typography.container} .${elements.block} > &`]: {
        marginBlock: theme.space[5],
      },
    },
  },
]);
