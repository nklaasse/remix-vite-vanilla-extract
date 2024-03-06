import { mixins, modes, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const popoverPlacements = styleVariants({
  top: {},
  bottom: {},
  left: {},
  right: {},
  center: {},
});

const popoverVariants = {
  placement: popoverPlacements,
};

const popoverContainer = style([
  modes.dark,
  {
    display: "flex",
    flexDirection: "column",

    maxWidth: "max-content",

    backgroundColor: "transparent !important",

    pointerEvents: "none",
  },
]);

const popoverOverlay = style({
  display: "flex",

  outline: "none",

  pointerEvents: "all",

  selectors: {
    [`${popoverPlacements.top} &`]: {
      marginTop: "auto",
    },
    [`${popoverPlacements.bottom} &`]: {
      marginBottom: "auto",
    },
    [`${popoverPlacements.left} &`]: {
      marginLeft: "auto",
    },
    [`${popoverPlacements.right} &`]: {
      marginRight: "auto",
    },
  },
});

const popoverPosition = style({
  position: "relative",

  insetInline: theme.borderWidths.border,
  width: calc.subtract(
    theme.sizes.full,
    calc.multiply(theme.borderWidths.border, 2)
  ),

  display: "inline-flex",

  maxHeight: "inherit",

  overflow: "hidden",

  borderRadius: theme.radii[1],

  backgroundColor: theme.colors.gray[1],
});

const popoverContent = style({
  position: "relative",
  insetInline: calc.multiply(theme.borderWidths.border, -1),

  maxHeight: "max-content",

  width: calc.add(
    theme.sizes.full,
    calc.multiply(theme.borderWidths.border, 2)
  ),
});

const popoverArrow = style({
  position: "absolute",
  fill: theme.colors.gray[1],

  width: theme.space[2],
  height: theme.space[2],

  selectors: {
    [`${popoverPlacements.top} &`]: {
      top: theme.sizes.full,
      transform: `translateX(${calc.multiply(theme.sizes["1/2"], -1)})`,
    },
    [`${popoverPlacements.bottom} &`]: {
      bottom: theme.sizes.full,
      transform: `translateX(${calc.multiply(
        theme.sizes["1/2"],
        -1
      )}) rotate(180deg)`,
    },
    [`${popoverPlacements.left} &`]: {
      left: theme.sizes.full,
      transform: `translateY(${calc.multiply(
        theme.sizes["1/2"],
        -1
      )}) rotate(90deg)`,
    },
    [`${popoverPlacements.right} &`]: {
      right: theme.sizes.full,
      transform: `translateY(${calc.multiply(
        theme.sizes["1/2"],
        -1
      )}) rotate(-90deg)`,
    },
  },
});

export const popover = {
  container: popoverContainer,
  position: popoverPosition,
  content: popoverContent,
  overlay: popoverOverlay,
  arrow: popoverArrow,

  variants: popoverVariants,
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
