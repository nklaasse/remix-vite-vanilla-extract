import { mixins, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { elements } from "../_shared.css";
import { typography } from "../Typography/Typography.css";

const headingScales = styleVariants({
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
});

const headingVariants = {
  scales: headingScales,
};

const headingContainer = style([
  elements.heading,
  {
    margin: theme.space[0],

    fontWeight: theme.fontWeights.bold,

    color: theme.colors.gray[12],

    selectors: {
      [`&${headingScales[1]}`]: {
        ...mixins.typography["heading-1"],
      },
      [`&${headingScales[2]}`]: {
        ...mixins.typography["heading-2"],
      },
      [`&${headingScales[3]}`]: {
        ...mixins.typography["heading-3"],
      },
      [`&${headingScales[4]}`]: {
        ...mixins.typography["heading-4"],
      },
      [`&${headingScales[5]}`]: {
        ...mixins.typography["heading-5"],
      },
      [`&${headingScales[6]}`]: {
        ...mixins.typography["heading-6"],
      },

      // add spacing for heading elements that are placed immediately after heading elements
      [`.${typography.container} & + &`]: {
        marginBlockStart: theme.space[3],
      },

      // add spacing for h2 elements that are placed immediately after p and ul and ol elements
      [`.${typography.container} :not(&) + &:is(${headingScales[2]})`]: {
        marginBlockStart: theme.space[8],
      },

      // add spacing for h3 elements that are placed immediately after p and ul and ol elements
      [`.${typography.container} :not(&) + &:is(${headingScales[3]})`]: {
        marginBlockStart: calc.multiply(theme.space[5], 1.4),
      },

      // add spacing for h4 elements that are placed immediately after p and ul and ol elements
      [`.${typography.container} :not(&) + &:is(${headingScales[4]})`]: {
        marginBlockStart: calc.multiply(theme.space[5], 1.2),
      },

      // add spacing for h5 elements that are placed immediately after p and ul and ol elements
      [`.${typography.container} :not(&) + &:is(${headingScales[5]})`]: {
        marginBlockStart: theme.space[5],
      },

      // add spacing for h6 elements that are placed immediately after p and ul and ol elements
      [`.${typography.container} :not(&) + &:is(${headingScales[6]})`]: {
        marginBlockStart: theme.space[1],
      },
    },
  },
]);

export const heading = {
  container: headingContainer,

  variants: headingVariants,
};
