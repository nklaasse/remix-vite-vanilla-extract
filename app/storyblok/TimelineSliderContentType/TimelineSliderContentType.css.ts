import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints, mixins, theme } from "~/css";

const min = (...operands: Array<string>) => `min(${operands.join(", ")})`;
const max = (...operands: Array<string>) => `max(${operands.join(", ")})`;

// States
const slideIsVisible = style({});

const slideStates = {
  isVisible: slideIsVisible,
};

// Variables
const timelineFooterProgressBarPercentage = createVar();
const timelineFooterVars = {
  progressBarPercentage: timelineFooterProgressBarPercentage,
};

// Timeline
//---------------------
const componentPaddingInline = createVar(); // keep track of the padding left and right of the component
const contentPaddingInline = createVar(); // keep track of the padding used to create gap between slides

const componentContainer = style({
  display: "flex",
  flexDirection: "column",

  inlineSize: theme.sizes.full,

  paddingInline: componentPaddingInline,

  vars: {
    [componentPaddingInline]: theme.space[3],
    [contentPaddingInline]: theme.space[3],
  },

  "@media": {
    [breakpoints["small"]]: {
      vars: {
        [componentPaddingInline]: theme.space[5],
      },
    },
    [breakpoints["large"]]: {
      vars: {
        [contentPaddingInline]: theme.space[5],
      },
    },
  },
});

const timelineHeading = style({
  ...mixins.typography["heading-4"],

  alignSelf: "center",

  textAlign: "center",

  inlineSize: theme.sizes.full,
  maxInlineSize: theme.sizes.contentContainer,

  "@media": {
    [breakpoints["large"]]: {
      ...mixins.typography["heading-3"],
    },
  },
});

const timelineSliderView = style({
  alignSelf: "center",

  inlineSize: min(theme.sizes.full, theme.sizes.contentContainer),

  marginBlock: theme.space["4"],

  "@media": {
    [breakpoints["large"]]: {
      marginBlock: theme.space["8"],
    },
  },
});

const timelineSlidesVerticalSpace = createVar();

const timelineSlides = style({
  position: "relative",

  display: "flex",
  flexDirection: "row",

  inlineSize: "100vw",

  scrollbarWidth: "none",
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",

  overflowY: "scroll",

  marginInlineStart: theme.sizes["1/2"],

  transform: `translateX(${calc.negate(theme.sizes["1/2"])})`,

  vars: {
    [timelineSlidesVerticalSpace]: max(
      calc.subtract(
        componentPaddingInline,
        calc.divide(contentPaddingInline, 2)
      ),
      calc.divide(
        calc.subtract(
          theme.sizes.full,
          calc.add(
            theme.sizes.contentContainer,
            calc.multiply(calc.divide(contentPaddingInline, 2), 2)
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

      inlineSize: timelineSlidesVerticalSpace,
      paddingInlineStart: timelineSlidesVerticalSpace,

      boxSizing: "content-box",
    },

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

// Timeline Item
//---------------------

const slideCount = createVar();

const timelineSlideContainer = style({
  display: "flex",

  zIndex: 1,

  flexShrink: 0,

  blockSize: "auto",

  overflow: "hidden",

  paddingInlineStart: timelineSlidesVerticalSpace,
  marginInlineEnd: calc.negate(timelineSlidesVerticalSpace),

  boxSizing: "content-box",

  pointerEvents: "none",

  scrollSnapAlign: "start",

  maxInlineSize: min(
    calc.multiply(
      calc.subtract("100vw", calc.multiply(componentPaddingInline)),
      0.85
    ),
    calc.divide(
      calc.add(
        theme.sizes.contentContainer,
        calc.multiply(2, calc.divide(contentPaddingInline, 2))
      ),
      3
    )
  ),

  inlineSize: calc.divide(
    calc.subtract(
      theme.sizes.full,
      calc.multiply(timelineSlidesVerticalSpace, 2)
    ),
    slideCount
  ),

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

const timelineSlideContent = style({
  inlineSize: theme.sizes.full,
  paddingInline: calc.divide(contentPaddingInline, 2),
});

const timelineSlideImage = style({
  inlineSize: theme.sizes.full,
  marginBlockEnd: theme.space[3],

  "selectors": {
    [`${timelineSlideContainer}:nth-of-type(even) & `]: {
      borderStartStartRadius: theme.space[5],
    },
  },
});

const timelineSlideTitle = style({
  ...mixins.typography["heading-5"],

  fontWeight: theme.fontWeights.bold,

  marginBlockEnd: theme.space[2],
});

const timelineSlideCaption = style({
  ...mixins.typography.intro,

  color: theme.colors.gray[11],
});

// Timeline Footer
//---------------------

export const timelineFooterContainer = style({
  position: "relative",

  display: "flex",

  alignSelf: "center",
  justifyContent: "center",

  inlineSize: theme.sizes.full,
  maxInlineSize: theme.sizes.contentContainer,
});

export const timelineFooterNavigation = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridColumnGap: theme.space[1.5],

  alignSelf: "center",

  flexShrink: 0,
  flexGrow: 0,

  "@media": {
    [breakpoints["large"]]: {
      position: "absolute",

      insetBlockStart: 0,
      insetInlineEnd: 0,
    },
  },
});

export const timelineFooterProgressBarContainer = style({
  flexGrow: 1,

  display: "none",

  "@media": {
    [breakpoints["medium"]]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  paddingBlock: calc.divide(theme.sizes["5.5"], 2),
});

export const timelineFooterProgressBar = style({
  ...mixins.accents.tomato,

  position: "relative",

  display: "flex",

  overflow: "hidden",

  inlineSize: theme.sizes["3/4"],
  maxInlineSize: calc.multiply(theme.sizes[1], 70), //560

  height: theme.space["0.5"],
  borderRadius: theme.space["0.5"],

  backgroundColor: theme.colors.gray[8],

  "selectors": {
    "&:after": {
      content: "''",

      position: "absolute",

      inlineSize: theme.sizes.full,
      height: theme.sizes.full,

      background: theme.colors.accent[9],

      left: calc.negate(theme.sizes.full),
      transform: `translateX(${timelineFooterProgressBarPercentage})`,

      transition: "transform 0.33s ease-out",
    },
  },
});

// Exports
//---------------------
export const component = {
  container: componentContainer,
};

export const heading = {
  container: timelineHeading,
};

export const footer = {
  container: timelineFooterContainer,
  navigation: timelineFooterNavigation,
  progressBarContainer: timelineFooterProgressBarContainer,
  progressBar: timelineFooterProgressBar,
  vars: timelineFooterVars,
};

export const slider = {
  view: timelineSliderView,
  slides: timelineSlides,
};

export const slide = {
  container: timelineSlideContainer,
  content: timelineSlideContent,
  title: timelineSlideTitle,
  caption: timelineSlideCaption,
  image: timelineSlideImage,
  states: slideStates,
};
