import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { theme, mixins, breakpoints } from "~/css";

const emailFormSectionTitle = style({
  ...mixins.typography["heading-5"],

  marginBlockEnd: theme.space[3],

  "@media": {
    [breakpoints["large"]]: {
      ...mixins.typography["heading-3"],
    },
  },
});

const emailFormSectionFormTitle = style({
  ...mixins.typography["heading-5"],
});

const emailFormSectionDescription = style({
  "@media": {
    [breakpoints["x-large"]]: {
      maxInlineSize: theme.sizes.card,
    },
  },
});

const emailFormSectionParagraph = style({
  marginBlockStart: theme.space["1.5"],
});

const emailFormSectionContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  maxInlineSize: theme.sizes.contentContainer,
  inlineSize: theme.sizes.full,

  paddingBlock: calc.multiply(theme.space[4], 2),

  paddingInline: theme.space[3],

  "@media": {
    [breakpoints["small"]]: {
      paddingInline: theme.space[5],
    },

    [breakpoints["x-large"]]: {
      flexDirection: "row",
    },
  },
});

const emailFormSectionColumn = style({
  position: "relative",

  inlineSize: theme.sizes.full,

  // uses form size and emailFormSectionForm padding to calculate max width
  maxInlineSize: calc.add(theme.sizes.form, calc.multiply(theme.space[3], 4)),

  selectors: {
    [`&:last-child`]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBlockStart: calc.multiply(theme.space[4], 2),

      overflow: "hidden",

      "@media": {
        [breakpoints["medium"]]: {
          overflow: "visible",
        },

        [breakpoints["x-large"]]: {
          alignItems: "end",
          marginBlockStart: theme.space[0],
          paddingBlock: theme.space[4],
        },
      },
    },
  },
});

const emailFormSectionShapeContainer = style({
  position: "relative",

  inlineSize: theme.sizes.full,

  insetBlockStart: theme.space[0],
  insetInlineStart: theme.space[0],
});

const emailFormSectionShape1 = style({
  ...mixins.accents.indigo,

  position: "absolute",

  borderRadius: theme.radii.circle,

  inlineSize: calc.multiply(theme.sizes[4], 3),
  blockSize: calc.multiply(theme.sizes[4], 3),

  insetBlockStart: "-4%",
  insetInlineStart: "65%",

  backgroundColor: theme.colors.accent[8],

  "@media": {
    [breakpoints["large"]]: {
      insetBlockStart: "7%",
      insetInlineStart: "88%",
    },
  },
});

const emailFormSectionShape2 = style({
  ...mixins.accents.yellow,

  position: "absolute",

  borderRadius: theme.radii.circle,

  inlineSize: calc.multiply(theme.sizes["4"], 5),
  blockSize: calc.multiply(theme.sizes["4"], 5),

  insetBlockStart: "73%",
  insetInlineStart: "0%",

  backgroundColor: theme.colors.accent[6],

  "@media": {
    [breakpoints["large"]]: {
      insetBlockStart: "54%",
      insetInlineStart: "-11%",
    },
  },
});

const emailFormSectionForm = style({
  position: "relative",

  padding: theme.space[3],

  backgroundColor: theme.colors.gray[1],

  "@media": {
    [breakpoints["medium"]]: {
      padding: calc.multiply(theme.space[5], 1.5),
    },
  },
});

export const emailFormSection = {
  title: emailFormSectionTitle,
  formTitle: emailFormSectionFormTitle,
  description: emailFormSectionDescription,
  paragraph: emailFormSectionParagraph,
  content: emailFormSectionContent,
  column: emailFormSectionColumn,
  shapeContainer: emailFormSectionShapeContainer,
  shape1: emailFormSectionShape1,
  shape2: emailFormSectionShape2,
  form: emailFormSectionForm,
};
