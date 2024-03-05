import { breakpoints, mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const errorPageContainer = style({
  inlineSize: theme.sizes.full,
  minBlockSize: "100vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  overflow: "hidden",

  backgroundColor: theme.colors.gray[3],
});

const errorPageContent = style({
  maxInlineSize: theme.sizes.contentContainer,
  inlineSize: theme.sizes.full,

  paddingInline: theme.space["2"],
  paddingBlock: calc.multiply(theme.space[2], 2),

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  "@media": {
    [breakpoints["small"]]: {
      paddingInline: calc.multiply(theme.space[3], 2.5),
    },
    [breakpoints["medium"]]: {
      paddingInline: calc.multiply(theme.space[5], 3),
    },
    [breakpoints["large"]]: {
      paddingInlineStart: calc.multiply(theme.space[3], 2),
      paddingInlineEnd: 0,
      paddingBlock: 0,

      flexDirection: "row",
    },
    [breakpoints["x-large"]]: {
      paddingInlineStart: 0,
    },
  },
});

const errorPageColumn = style({
  inlineSize: theme.sizes.full,

  selectors: {
    [`&:first-child`]: {
      marginBlockEnd: calc.multiply(theme.space[5], 2.5),

      "@media": {
        [breakpoints["large"]]: {
          minInlineSize: theme.sizes["1/2"],

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          paddingInlineEnd: calc.multiply(theme.space[3], 2),
          marginBlockEnd: 0,
        },
        [breakpoints["x-large"]]: {
          paddingInlineEnd: calc.multiply(theme.space[5], 2.5),
        },
      },
    },
    [`&:last-child`]: {
      display: "flex",
      justifyContent: "center",
    },
  },

  "@media": {
    [breakpoints["large"]]: {
      maxInlineSize: theme.sizes["1/2"],
    },
  },
});

const errorPageLogo = style({
  maxInlineSize: "160px",

  marginBlockEnd: calc.multiply(theme.space[3], 2),
});

const errorPageTitle = style({
  ...mixins.typography["heading-4"],

  marginBlockEnd: theme.space["2.5"],

  "@media": {
    [breakpoints["medium"]]: {
      ...mixins.typography["heading-2"],
    },
  },
});

const errorPageParagraph = style({
  ...mixins.typography.intro,

  color: theme.colors.gray[11],

  marginBlockEnd: theme.space["2.5"],

  "@media": {
    [breakpoints["medium"]]: {
      ...mixins.typography["heading-5"],
    },
  },
});

const errorPageButton = style({
  inlineSize: "fit-content",

  paddingBlockStart: theme.space["2.5"],
});

const errorPageShapeContainer = style({
  position: "relative",

  display: "flex",
  justifyContent: "center",

  insetBlockStart: theme.space[0],
  insetInlineStart: theme.space[0],

  inlineSize: theme.sizes.full,
  maxInlineSize: "560px",

  "@media": {
    [breakpoints["x-large"]]: {
      inlineSize: "fit-content",
    },
  },
});

const errorPageShape1 = style({
  ...mixins.accents.yellow,

  position: "absolute",

  borderRadius: theme.radii.circle,

  inlineSize: calc.multiply(theme.sizes["4"], 6),
  blockSize: calc.multiply(theme.sizes["4"], 6),

  insetBlockStart: "84%",
  insetInlineStart: "-13%",

  backgroundColor: theme.colors.accent[6],
});

const errorPageShape2 = style({
  ...mixins.accents.indigo,

  position: "absolute",

  borderRadius: theme.radii.circle,

  inlineSize: calc.multiply(theme.sizes["4"], 5.5),
  blockSize: calc.multiply(theme.sizes["4"], 5.5),

  insetBlockStart: "-10%",
  insetInlineStart: "27%",

  backgroundColor: theme.colors.accent[8],

  "@media": {
    [breakpoints["medium"]]: {
      insetInlineStart: "33%",
    },
  },
});

const errorPageShape3 = style({
  position: "absolute",

  zIndex: 1,

  borderRadius: theme.radii.circle,

  inlineSize: calc.multiply(theme.sizes[5], 5.75),
  blockSize: calc.multiply(theme.sizes[5], 3),

  insetBlockStart: "87%",
  insetInlineStart: "70%",

  backgroundColor: theme.colors.gray[5],

  transform: "rotate(-45deg)",
});

const errorPageImage = style({
  position: "relative",

  inlineSize: theme.sizes.full,
  maxInlineSize: "560px",

  "@media": {
    [breakpoints["x-large"]]: {
      inlineSize: "fit-content",
    },
  },
});

export const errorPage = {
  container: errorPageContainer,
  content: errorPageContent,
  column: errorPageColumn,

  logo: errorPageLogo,
  title: errorPageTitle,
  paragraph: errorPageParagraph,
  button: errorPageButton,

  shapeContainer: errorPageShapeContainer,
  shape1: errorPageShape1,
  shape2: errorPageShape2,
  shape3: errorPageShape3,
  image: errorPageImage,
};
