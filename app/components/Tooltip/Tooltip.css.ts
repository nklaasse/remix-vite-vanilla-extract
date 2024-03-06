import { mixins, modes, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const tooltipPlacements = styleVariants({
  top: {},
  bottom: {},
  left: {},
  right: {},
  center: {},
});

const tooltipVariants = {
  placement: tooltipPlacements,
};

const tooltipContainer = style([
  modes.dark,
  {
    display: "inline-flex",
    backgroundColor: "transparent",
  },
]);

const tooltipArrow = style({
  position: "absolute",
  fill: theme.colors.gray[1],

  width: theme.space[2],
  height: theme.space[2],

  selectors: {
    [`${tooltipPlacements.top} &`]: {
      top: theme.sizes.full,
      transform: `translateX(${calc.multiply(theme.sizes["1/2"], -1)})`,
    },
    [`${tooltipPlacements.bottom} &`]: {
      bottom: theme.sizes.full,
      transform: `translateX(${calc.multiply(
        theme.sizes["1/2"],
        -1
      )}) rotate(180deg)`,
    },
    [`${tooltipPlacements.left} &`]: {
      left: theme.sizes.full,
      transform: `translateY(${calc.multiply(
        theme.sizes["1/2"],
        -1
      )}) rotate(-90deg)`,
    },
    [`${tooltipPlacements.right} &`]: {
      right: theme.sizes.full,
      transform: `translateY(${calc.multiply(
        theme.sizes["1/2"],
        -1
      )}) rotate(90deg)`,
    },
  },
});

const tooltipContent = style({
  ...mixins.typography.compact,

  fontWeight: theme.fontWeights.semiBold,

  position: "relative",

  paddingInline: theme.space[1],
  paddingBlock: theme.space[1],

  display: "inline-block",

  borderRadius: theme.radii[0.5],

  backgroundColor: theme.colors.gray[1],

  color: theme.colors.gray[12],

  overflow: "hidden",
});

export const tooltip = {
  container: tooltipContainer,
  arrow: tooltipArrow,
  content: tooltipContent,

  variants: tooltipVariants,
};

const filterContainer = style([
  modes.dark,
  {
    ...mixins.visuallyHidden,
  },
]);

const filterFlood = style({
  floodColor: theme.colors.gray[6],
});

export const filter = {
  container: filterContainer,
  flood: filterFlood,
};
