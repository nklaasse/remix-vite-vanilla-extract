import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints, mixins, theme } from "~/css";

const linearSectionContainer = style({
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

const linearSectionContent = style({
  display: "grid",

  gridTemplate: `
    "textContainer" auto
    "imageContainer" auto
  `,

  columnGap: theme.space[0],
  rowGap: theme.space[2],

  maxInlineSize: theme.sizes.contentContainer,
  inlineSize: theme.sizes.full,

  "@media": {
    [breakpoints["x-large"]]: {
      columnGap: theme.space[5],
      rowGap: theme.space[2],

      gridTemplate: '"textContainer  imageContainer" auto / 7fr 5fr',
    },
  },
});

const linearSectionImageContainer = style({
  gridArea: "imageContainer",

  marginBlockStart: theme.space[8],

  "@media": {
    [breakpoints["medium"]]: {
      display: "none",
    },
    [breakpoints["x-large"]]: {
      display: "initial",

      marginBlockStart: 0,
    },
  },
});

const linearSectionImageInnerContainer = style({
  display: "flex",

  position: "relative",

  flexShrink: 0,

  inlineSize: theme.sizes.full,
});

const linearSectionImageShape = style({
  ...mixins.accents.amber,

  content: "",

  position: "absolute",
  insetInlineEnd: 0,
  insetBlockStart: 0,

  backgroundColor: theme.colors.accent["6"],

  borderRadius: theme.radii.circle,

  transform: `translate(${theme.sizes[1]}, -50%) rotate(135deg)`,

  inlineSize: calc.multiply(theme.sizes[1], 12.5),
  blockSize: calc.multiply(theme.sizes[1], 8),

  "@media": {
    [breakpoints["large"]]: {
      transform: `translate(${calc.multiply(
        theme.sizes[1],
        1.5
      )}, -50%) rotate(135deg)`,

      inlineSize: calc.multiply(theme.sizes[1], 21),
      blockSize: calc.multiply(theme.sizes[1], 14),
    },
  },
});

const linearSectionTextContainer = style({
  gridArea: "textContainer",

  display: "grid",
  gridRowGap: theme.space["2"],
  gridAutoRows: "min-content",
  alignItems: "flex-start",
});

const linearSectionImage = style({
  isolation: "isolate",
  position: "relative",

  width: theme.sizes.full,
  height: "fit-content",

  aspectRatio: "1/1",
  objectFit: "cover",

  borderRadius: "1px",
  borderStartStartRadius: theme.space[5],
});

export const linearSection = {
  container: linearSectionContainer,
  content: linearSectionContent,

  imageContainer: linearSectionImageContainer,
  imageInnerContainer: linearSectionImageInnerContainer,
  textContainer: linearSectionTextContainer,

  image: linearSectionImage,

  shape: linearSectionImageShape,
};
