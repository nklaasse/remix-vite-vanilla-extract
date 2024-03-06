import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { theme, mixins, breakpoints } from "~/css";

const detailsSectionContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  inlineSize: theme.sizes.full,

  paddingInline: theme.space[3],
});

const detailsSectionContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  maxInlineSize: theme.sizes.contentContainer,
  inlineSize: theme.sizes.full,

  paddingBlock: calc.multiply(theme.space[4], 2),

  "@media": {
    [breakpoints["x-large"]]: {
      flexDirection: "row",
    },
  },
});

const detailsSectionTitle = style({
  ...mixins.typography["heading-4"],

  "@media": {
    [breakpoints["large"]]: {
      ...mixins.typography["heading-2"],
    },
  },
});

const detailsSectionColumn = style({
  position: "relative",

  "@media": {
    [breakpoints["medium"]]: {
      inlineSize: theme.sizes["1/2"],
    },
  },

  selectors: {
    [`&:first-child`]: {
      textAlign: "center",

      "@media": {
        [breakpoints["x-large"]]: {
          textAlign: "start",
        },
      },
    },

    [`&:last-child`]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      paddingBlockStart: calc.multiply(theme.space[4], 2),

      overflow: "hidden",

      "@media": {
        [breakpoints["medium"]]: {
          overflow: "visible",
        },
        [breakpoints["x-large"]]: {
          alignItems: "end",

          paddingBlock: theme.space[4],
        },
      },
    },
  },
});

const detailsSectionAddress = style({
  ...mixins.typography["heading-5"],

  color: theme.colors.gray[12],

  fontStyle: "normal",

  marginBlockStart: calc.multiply(theme.space[3], 2),
});

const detailsSectionCompanyName = style({
  display: "block",

  fontWeight: "bold",

  marginBlockEnd: theme.space[2.5],
});

const detailsSectionCompanyCoC = style({
  display: "block",

  marginBlockStart: theme.space[3],
});

const detailsSectionShapeContainer = style({
  position: "relative",

  inlineSize: theme.sizes.full,

  insetBlockStart: theme.space[0],
  insetInlineStart: theme.space[0],

  "@media": {
    [breakpoints["small"]]: {
      maxInlineSize: "80%",
    },
  },
});

const detailsSectionShape1 = style({
  position: "absolute",

  borderRadius: theme.radii.circle,

  inlineSize: calc.multiply(theme.sizes["2.5"], 5),
  blockSize: calc.multiply(theme.sizes["2.5"], 2.5),

  insetBlockStart: "0%",
  insetInlineStart: "100%",

  backgroundColor: theme.colors.brand[7],

  transform: "translate(-60%,-40%) rotate(45deg)",
});

const detailsSectionShape2 = style({
  ...mixins.accents.yellow,

  position: "absolute",

  borderRadius: theme.radii.circle,

  inlineSize: calc.multiply(theme.sizes["4"], 5),
  blockSize: calc.multiply(theme.sizes["4"], 2.5),

  insetBlockStart: "100%",
  insetInlineStart: "0%",

  backgroundColor: theme.colors.accent[5],

  transform: "translate(-20%,-86%) rotate(45deg)",
});

const detailsSectionImage = style({
  position: "relative",

  objectFit: "cover",

  borderTopLeftRadius: theme.sizes[4],
});

export const detailsSection = {
  title: detailsSectionTitle,
  container: detailsSectionContainer,
  content: detailsSectionContent,
  column: detailsSectionColumn,
  address: detailsSectionAddress,
  companyName: detailsSectionCompanyName,
  companyCoC: detailsSectionCompanyCoC,
  shapeContainer: detailsSectionShapeContainer,
  shape1: detailsSectionShape1,
  shape2: detailsSectionShape2,
  image: detailsSectionImage,
};
