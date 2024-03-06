import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints, mixins, theme } from "~/css";

const imagesSectionContent = style({
  display: "flex",
  flexDirection: "column",

  maxInlineSize: theme.sizes.page,
  inlineSize: theme.sizes.full,

  "@media": {
    [breakpoints["medium"]]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
});

// Image Start
// ------------------------------
const imagesSectionStartColumn = style({
  display: "flex",
  maxInlineSize: theme.sizes.full,

  position: "relative",

  marginBlockEnd: theme.space[6],

  "@media": {
    [breakpoints["medium"]]: {
      maxInlineSize: theme.sizes["1/3"],
      marginBlockEnd: theme.space[0],
    },
  },
});

const imageContainerStart = style({
  aspectRatio: "5/4",

  inlineSize: "80%",

  overflow: "hidden",

  "@media": {
    [breakpoints["medium"]]: {
      inlineSize: theme.sizes.full,
    },
  },
});

const imagesSectionStartImage = style({
  objectFit: "cover",
  inlineSize: theme.sizes.full,
  blockSize: theme.sizes.full,

  borderStartEndRadius: theme.space[5],
});

const imagesSectionShapeStart = style({
  ...mixins.accents.indigo,

  position: "absolute",
  insetBlockStart: "100%",
  insetInlineStart: "15%",

  backgroundColor: theme.colors.accent[5],

  borderRadius: theme.radii.circle,

  transform: `translateY(-50%) rotate(45deg)`,

  inlineSize: calc.multiply(theme.sizes[1], 10),
  blockSize: calc.multiply(theme.sizes[1], 6),

  "@media": {
    [breakpoints["large"]]: {
      inlineSize: calc.multiply(theme.sizes[1], 16),
      blockSize: calc.multiply(theme.sizes[1], 9.5),
    },
  },
});

// Image Center
// ------------------------------
const imagesSectionCenterColumn = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "end",

  maxInlineSize: theme.sizes.full,

  "@media": {
    [breakpoints["medium"]]: {
      maxWidth: theme.sizes["1/4"],
    },
  },
});

const imageContainerCenter = style({
  aspectRatio: "9/10",

  position: "relative",

  inlineSize: theme.sizes["3/4"],

  "@media": {
    [breakpoints["medium"]]: {
      inlineSize: theme.sizes.full,
      transform: `translateY(${theme.space[3]})`,
    },
    [breakpoints["large"]]: {},
  },

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

const imagesSectionCenterImage = style({
  position: "relative",

  inlineSize: theme.sizes.full,
  blockSize: theme.sizes.full,

  objectFit: "cover",

  borderEndStartRadius: theme.space[5],
});

// Image End
// ------------------------------
const imagesSectionEndColumn = style({
  display: "none",

  position: "relative",

  inlineSize: theme.sizes["1/3"],

  "@media": {
    [breakpoints["medium"]]: {
      display: "flex",
    },
  },
});

const imageContainerEnd = style({
  inlineSize: theme.sizes.full,

  position: "relative",

  transform: `translateY(${calc.negate(theme.space[3])})`,

  aspectRatio: "5 / 4",
});

const imagesSectionEndImage = style({
  objectFit: "cover",
  inlineSize: theme.sizes.full,
  blockSize: theme.sizes.full,

  borderStartStartRadius: theme.space[5],
});

const imagesSectionShapeEnd = style({
  ...mixins.accents.tomato,

  position: "absolute",
  insetInlineEnd: "15%",
  insetBlockStart: theme.space[0],

  backgroundColor: theme.colors.accent[5],

  borderRadius: theme.radii.circle,

  transform: `translateY(${calc.negate(theme.sizes["1/2"])})`,

  inlineSize: calc.multiply(theme.sizes[1], 7),
  blockSize: calc.multiply(theme.sizes[1], 7),

  "@media": {
    [breakpoints["large"]]: {
      inlineSize: calc.multiply(theme.sizes[1], 14),
      blockSize: calc.multiply(theme.sizes[1], 14),
    },
  },
});

// Exports
// ------------------------------
export const imagesSection = {
  content: imagesSectionContent,

  columnStart: imagesSectionStartColumn,
  columnCenter: imagesSectionCenterColumn,
  columnEnd: imagesSectionEndColumn,

  imageContainerStart: imageContainerStart,
  imageContainerCenter: imageContainerCenter,
  imageContainerEnd: imageContainerEnd,

  imageStart: imagesSectionStartImage,
  imageCenter: imagesSectionCenterImage,
  imageEnd: imagesSectionEndImage,

  shapeStart: imagesSectionShapeStart,
  shapeEnd: imagesSectionShapeEnd,
};
