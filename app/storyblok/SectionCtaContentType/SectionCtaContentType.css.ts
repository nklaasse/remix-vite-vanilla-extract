import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints, theme } from "~/css";

// Variants
const ctaDirection = styleVariants({
  start: {},
  end: {},
});

const ctaVariants = {
  direction: ctaDirection,
};

// Styles
const ctaContainer = style({
  display: "flex",
  justifyContent: "center",

  inlineSize: theme.sizes.full,

  paddingInline: theme.space[3],

  "@media": {
    [breakpoints["small"]]: {
      paddingInline: theme.space[5],
    },
  },
});

const ctaContent = style({
  display: "grid",

  gridTemplate: `
    "imageContainer" auto
    "textContainer" auto
  `,

  gridColumnGap: theme.space[0],
  gridRowGap: theme.space[5],

  maxInlineSize: theme.sizes.contentContainer,
  inlineSize: theme.sizes.full,

  "@media": {
    [breakpoints["medium"]]: {
      gridColumnGap: theme.space[5],
      gridRowGap: theme.space[0],

      selectors: {
        [`&:is(${ctaDirection.start})`]: {
          gridTemplate: `
            "imageContainer  textContainer" auto
          `,
        },
        [`&:is(${ctaDirection.end})`]: {
          gridTemplate: `
            "textContainer imageContainer" auto
          `,
        },
      },
    },
  },
});

const ctaImageContainer = style({
  gridArea: "imageContainer",
});

const ctaImageInnerContainer = style({
  display: "flex",

  flexShrink: 0,

  inlineSize: theme.sizes.full,

  position: "relative",

  "selectors": {
    "&:before": {
      content: "''",
      position: "absolute",
      inset: 0,
      backgroundColor: theme.colors.gray[5],
      borderEndStartRadius: calc.add(
        theme.space[5],
        calc.divide(theme.space[1.5], 2)
      ),
      transform: `translateX(${calc.negate(theme.space[1.5])}) translateY(${
        theme.space[1.5]
      })`,
    },
  },
});

const ctaTextContainer = style({
  display: "flex",

  gridArea: "textContainer",

  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",

  width: theme.sizes.full,
});

const ctaButton = style({
  display: "flex",
  flexDirection: "column",

  width: theme.sizes.full,

  marginBlockStart: theme.space[4],

  "@media": {
    [breakpoints["medium"]]: {
      flexDirection: "row",
    },
  },
});

const ctaText = style({
  marginBlockStart: theme.space[2],
});

const ctaImage = style({
  isolation: "isolate",
  position: "relative",

  width: "100%",
  height: "fit-content",

  aspectRatio: "1/1",
  objectFit: "cover",

  borderEndStartRadius: theme.space[5],
});

export const cta = {
  container: ctaContainer,
  content: ctaContent,

  imageContainer: ctaImageContainer,
  imageInnerContainer: ctaImageInnerContainer,
  textContainer: ctaTextContainer,

  text: ctaText,
  image: ctaImage,

  button: ctaButton,

  variants: ctaVariants,
};
