import { mixins, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { elements } from "../_shared.css";
import { typography } from "../Typography/Typography.css";

export const paragraphVariants = styleVariants({
  intro: {},
  compact: {},
  default: {},
});

const paragraphContainer = style([
  elements.block,
  {
    color: theme.colors.gray[12],

    selectors: {
      [`&${paragraphVariants.intro}`]: {
        ...mixins.typography.intro,
      },
      [`&${paragraphVariants.compact}`]: {
        ...mixins.typography.compact,
      },
      [`&${paragraphVariants.default}`]: {
        ...mixins.typography.text,
      },

      // add spacing for p elements that are placed immediately after heading elements
      [`.${typography.container} .${elements.heading} + &`]: {
        marginBlockStart: theme.space[2],
      },

      // add spacing for intro p elements that are placed immediately after ul and ol elements
      [`.${typography.container} .${elements.list} + &${paragraphVariants.intro}`]:
        {
          marginBlockStart: theme.space[3],
        },

      // add spacing for compact and default p elements that are placed immediately after ul and ol elements
      [`.${typography.container} .${elements.list} + &:is(${paragraphVariants.compact}, ${paragraphVariants.default})`]:
        {
          marginBlockStart: theme.space[2],
        },

      // add spacing for p elements that are placed immediately after p elements
      [`.${typography.container} ${elements.block} + &`]: {
        marginBlockStart: theme.space[1],
      },
    },
  },
]);

export const paragraph = {
  container: paragraphContainer,

  variants: paragraphVariants,
};
