import { breakpoints, theme } from "~/css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const stackBaseStackDepth = createVar();
const stackBaseStackLevel = createVar();
const stackBaseStackCount = createVar();

const stackBaseLayerDepth = createVar();
const stackBaseLayerLevel = createVar();
const stackBaseLayerCount = createVar();

const stackBaseOffsetBlockStart = createVar();

const stackBaseTranslateY = createVar();

const stackBaseScale = createVar();
const stackBaseDesktopScale = createVar();
const stackBaseMobileScale = createVar();

export const stackBaseVars = {
  // Stack are the values which contain all types of screens
  stack: {
    // Amount of screens above it
    depth: stackBaseStackDepth,
    // Amount of screens below it
    level: stackBaseStackLevel,
    // Amount of screens
    count: stackBaseStackCount,
  },
  // Layer are the values based on the stacked values of screens of the same type
  layer: {
    // Amount of screens above it
    depth: stackBaseLayerDepth,
    // Amount of screens below it
    level: stackBaseLayerLevel,
    // Amount of screens
    count: stackBaseLayerCount,
  },

  // We expose those variables due to CSS math functions not yet powerfull enough to replace
  // the JS Math.pow expression.
  __internal: {
    desktopScale: stackBaseDesktopScale,
    mobileScale: stackBaseMobileScale,
    scale: stackBaseScale,
    offsetBlockStart: stackBaseOffsetBlockStart,
    // overlayHeight: stackBaseOverlayHeight,
    translateY: stackBaseTranslateY,
  },
};

const stackBaseTypes = styleVariants({
  modal: {},
  screen: {},
  root: {},
});

const stackBaseVariants = {
  type: stackBaseTypes,
};

const stackBaseIsKeyboardOpened = style({});
const stackBaseIsActive = style({});

const stackBaseStates = {
  isKeyboardOpened: stackBaseIsKeyboardOpened,
  isActive: stackBaseIsActive,
};

const min = (...operands: string[]) => `min(${operands.join(", ")})`;

const stackBaseContainer = style({
  position: "absolute",
  inset: theme.space[0],

  display: "flex",
  flexDirection: "column",

  msOverflowStyle: "none",
  scrollbarWidth: "none",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },

    [`&:is(${stackBaseIsKeyboardOpened})`]: {
      overflowX: "hidden",
      overflowY: "auto",
    },

    [`&:is(${stackBaseIsKeyboardOpened}):before, &:is(${stackBaseIsKeyboardOpened}):after`]:
      {
        content: '""',
        height: theme.borderWidths.border,
        width: theme.sizes.full,

        flexShrink: 0,
        flexGrow: 0,
      },
  },
});

const stackBaseContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",

  flexDirection: "column",

  flexShrink: 0,
  flexGrow: 0,

  width: theme.sizes.full,
  height: theme.sizes.full,

  boxSizing: "border-box",

  selectors: {
    "&:before": {
      content: '""',

      display: "block",

      width: theme.sizes.full,

      paddingBlockStart: min(
        theme.space[1.5],
        calc.multiply(theme.space[1], stackBaseStackCount)
      ),
    },
  },

  vars: {
    [stackBaseScale]: stackBaseMobileScale,

    [stackBaseTranslateY]: calc.multiply(
      calc.divide(1, stackBaseScale),
      calc.multiply(stackBaseStackLevel, calc.multiply(theme.space[0.5], -1))
    ),
  },

  "@media": {
    [breakpoints.medium]: {
      selectors: {
        "&:before": {
          paddingBlockStart: min(
            theme.space[1.5],
            calc.multiply(theme.space[1], stackBaseLayerCount)
          ),
        },
      },

      vars: {
        [stackBaseScale]: stackBaseDesktopScale,

        [stackBaseTranslateY]: calc.multiply(
          calc.divide(1, stackBaseScale),
          calc.multiply(
            stackBaseLayerLevel,
            calc.multiply(theme.space[0.5], -1)
          )
        ),
      },
    },
  },
});

export const stackBase = {
  container: stackBaseContainer,
  content: stackBaseContent,

  variants: stackBaseVariants,

  states: stackBaseStates,

  vars: stackBaseVars,
};
