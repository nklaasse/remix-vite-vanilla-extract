import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints, mixins, theme } from "~/css";

const min = (...operands: Array<string>) => `min(${operands.join(", ")})`;
const max = (...operands: Array<string>) => `max(${operands.join(", ")})`;

/***
 * ===================================
 * Header
 * ===================================
 */
const sliderHeaderContainer = style({
  display: "flex",

  flexDirection: "column",
  alignItems: "center",

  width: theme.sizes.full,

  marginBlockEnd: theme.space[1.5],

  "@media": {
    [breakpoints["small"]]: {
      alignItems: "center",
    },
  },
});

const sliderHeaderContent = style({
  display: "flex",

  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",

  inlineSize: theme.sizes.full,
  maxInlineSize: theme.sizes.contentContainer,

  "@media": {
    [breakpoints["small"]]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
});

const sliderHeaderHeading = style({
  ...mixins.typography["heading-5"],

  "@media": {
    [breakpoints["small"]]: {
      ...mixins.typography["heading-4"],
    },
  },
});

const sliderHeaderSubject = style({
  ...mixins.typography["text"],

  display: "grid",

  gridAutoFlow: "column",
  gap: theme.space[1],

  alignItems: "center",

  color: theme.colors.gray[12],
});

export const sliderHeader = {
  container: sliderHeaderContainer,
  content: sliderHeaderContent,
  heading: sliderHeaderHeading,
  subject: sliderHeaderSubject,
};

/***
 * ===================================
 * Slider
 * ===================================
 */

const componentPaddingInline = createVar();

const componentContainer = style({
  inlineSize: theme.sizes.full,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  paddingInline: componentPaddingInline,

  vars: {
    [componentPaddingInline]: theme.space[3],
  },

  "@media": {
    [breakpoints["small"]]: {
      vars: {
        [componentPaddingInline]: theme.space[5],
      },
    },
  },
});

export const component = {
  container: componentContainer,
};

/***
 * ===================================
 * Pill
 * ===================================
 */

const pillIsActive = style({});
const pillIsFocused = style({});
const pillIsPressed = style({});
const pillIsFocusVisible = style({});
const pillIsHovered = style({});

const pillStates = {
  isActive: pillIsActive,
  isFocused: pillIsFocused,
  isHovered: pillIsHovered,
  isPressed: pillIsPressed,
  isFocusVisible: pillIsFocusVisible,
};

const pillContainer = style({
  inlineSize: theme.sizes[4],

  paddingBlock: theme.space[2],
  paddingInline: theme.space[0.5],
  marginBlock: calc.negate(theme.space[2]),

  borderWidth: 0,

  transition: "background-color 0.35s ease-in",

  boxSizing: "content-box",

  outline: "none",

  "@media": {
    [breakpoints["large"]]: {
      width: theme.sizes[5],
    },
  },

  selectors: {
    [`&:hover`]: {
      cursor: "pointer",
    },
  },
});

const pillIndicator = style({
  position: "relative",

  display: "flex",

  height: theme.sizes[0.5],

  backgroundColor: theme.colors.gray[6],

  borderRadius: theme.radii[0.5],

  selectors: {
    [`:is(${pillIsHovered}, ${pillIsFocused}) &`]: {
      backgroundColor: theme.colors.gray[7],
    },

    [`:is(${pillIsPressed}) &`]: {
      backgroundColor: theme.colors.gray[8],
    },

    [`:is(${pillIsActive}) &`]: {
      backgroundColor: theme.colors.gray[9],
    },

    [`:is(${pillIsActive}):is(${pillIsHovered}, ${pillIsFocused}) &`]: {
      backgroundColor: theme.colors.gray[10],
    },

    [`:is(${pillIsActive}):is(${pillIsPressed}) &`]: {
      backgroundColor: theme.colors.gray[8],
    },

    [`${pillIsFocusVisible} &:after`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const pill = {
  container: pillContainer,
  indicator: pillIndicator,

  states: pillStates,
};

const sliderView = style({
  justifySelf: "center",

  inlineSize: calc.add(
    theme.space[1.5],
    min(theme.sizes.full, theme.sizes.contentContainer),
    theme.space[1.5]
  ),
  marginInline: calc.negate(theme.space[1.5]),
});

const sliderSlidesVerticalSpace = createVar();

const sliderSlides = style({
  display: "flex",
  position: "relative",

  flexDirection: "row",

  inlineSize: "100vw",

  marginInlineStart: theme.sizes["1/2"],

  paddingBlock: "2px",

  scrollbarWidth: "none",
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",

  overflowY: "scroll",

  transform: `translateX(${calc.negate(theme.sizes["1/2"])})`,

  vars: {
    [sliderSlidesVerticalSpace]: max(
      calc.subtract(componentPaddingInline, theme.space[1.5]),
      calc.divide(
        calc.subtract(
          theme.sizes.full,
          calc.add(
            theme.sizes.contentContainer,
            calc.multiply(theme.space[1.5], 2)
          )
        ),
        2
      )
    ),
  },

  selectors: {
    "&:after": {
      content: "''",

      display: "flex",

      flexGrow: 0,
      flexShrink: 0,

      inlineSize: sliderSlidesVerticalSpace,
      paddingInlineStart: sliderSlidesVerticalSpace,

      boxSizing: "content-box",
    },

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const sliderFooter = style({
  display: "flex",

  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",

  position: "relative",

  inlineSize: theme.sizes.full,
  maxInlineSize: theme.sizes.contentContainer,

  blockSize: calc.add(theme.sizes[5], theme.sizes[1.5]),

  marginInline: "auto",
  marginBlock: theme.space[2],

  "@media": {
    [breakpoints["medium"]]: { marginBlock: theme.space[4] },
    [breakpoints["large"]]: { marginBlock: theme.space[5] },
  },
});

const sliderNavigation = style({
  display: "none",

  "@media": {
    [breakpoints["medium"]]: {
      display: "grid",

      gridAutoFlow: "column",
      gap: theme.space[1],

      position: "absolute",
      insetInlineEnd: theme.space[0],

      inlineSize: "auto",
    },
  },
});

const sliderPills = style({
  display: "flex",

  "@media": {
    [breakpoints["small"]]: {
      display: "flex",
    },
  },
});

const sliderPillsDefault = style({
  display: "contents",

  "@media": {
    [breakpoints["medium"]]: {
      display: "none",
    },
  },
});

const sliderPillsMedium = style({
  display: "none",

  "@media": {
    [breakpoints["medium"]]: {
      display: "contents",
    },

    [breakpoints["large"]]: {
      display: "none",
    },
  },
});

const sliderPillsLarge = style({
  display: "none",

  "@media": {
    [breakpoints["large"]]: {
      display: "contents",
    },
  },
});

export const slider = {
  view: sliderView,
  slides: sliderSlides,
  footer: sliderFooter,
  navigation: sliderNavigation,
  pills: sliderPills,
  pillsDefault: sliderPillsDefault,
  pillsMedium: sliderPillsMedium,
  pillsLarge: sliderPillsLarge,
};

/***
 * ===================================
 * Slides
 * ===================================
 */

const slideIsVisible = style({});

const slideStates = {
  isVisible: slideIsVisible,
};

const slideCount = createVar();

const slideContainer = style({
  zIndex: 1,

  flexShrink: 0,

  display: "flex",

  blockSize: "auto",

  maxInlineSize: min(
    calc.multiply(
      calc.subtract("100vw", calc.multiply(componentPaddingInline)),
      0.85
    ),
    calc.divide(
      calc.add(
        theme.sizes.contentContainer,
        calc.multiply(2, theme.space[1.5])
      ),
      3
    )
  ),
  inlineSize: calc.divide(
    calc.subtract(
      theme.sizes.full,
      calc.multiply(sliderSlidesVerticalSpace, 2)
    ),
    slideCount
  ),

  paddingInlineStart: sliderSlidesVerticalSpace,
  marginInlineEnd: calc.negate(sliderSlidesVerticalSpace),

  boxSizing: "content-box",

  pointerEvents: "none",

  scrollSnapAlign: "start",

  vars: {
    [slideCount]: "1",
  },

  "@media": {
    [breakpoints["medium"]]: {
      vars: {
        [slideCount]: "2",
      },
    },
    [breakpoints["large"]]: {
      vars: {
        [slideCount]: "3",
      },
    },
  },
});

const slideContent = style({
  display: "flex",

  pointerEvents: "auto",
});

export const slide = {
  container: slideContainer,
  content: slideContent,
  states: slideStates,
};
