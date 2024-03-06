import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints, mixins, modes, theme } from "~/css";

// highlightSection Styles -----
const highlightSectionContainer = style({
  maxInlineSize: theme.sizes.contentContainer,
  paddingInline: theme.space[3],

  "@media": {
    [breakpoints["small"]]: {
      paddingInline: theme.space[5],
    },
  },
});

const highlightSectionContent = style({
  display: "flex",
  flexDirection: "column",
});

const highlightSectionTitle = style({});

const highlightSectionHeading = style({
  display: "flex",
  flexDirection: "column",

  marginBlockEnd: theme.space[6],
});

const highlightSectionDescription = style({
  ...mixins.typography.intro,

  marginBlockStart: theme.space[2],
});

const highlightSectionItems = style({
  display: "grid",
  gridTemplateColumns: "1fr",

  gridRowGap: theme.space[5],
  gridColumnGap: theme.space[0],

  padding: theme.space[0],

  counterReset: "number",

  "@media": {
    [breakpoints["medium"]]: {
      gridTemplateColumns: "1fr 1fr",
      gridRowGap: theme.space[6],
      gridColumnGap: theme.space[4],
    },
    [breakpoints["large"]]: {
      gridColumnGap: theme.space[5],
    },
  },
});

export const highlightSection = {
  container: highlightSectionContainer,
  content: highlightSectionContent,

  title: highlightSectionTitle,

  heading: highlightSectionHeading,
  items: highlightSectionItems,

  description: highlightSectionDescription,
};

// highlightSectionItem Styles -----
const highlightSectionItemContainer = style({
  ...mixins.typography.intro,

  counterIncrement: "number",

  display: "grid",

  gridTemplate: `
    "number      title      " max-content
    "description description" 1fr
  /  min-content 1fr
  `,

  "@media": {
    [breakpoints["medium"]]: {
      gridTemplate: `
        "number      title      " min-content
        "number      description" 1fr
      /  max-content 1fr
      `,
    },
  },

  "selectors": {
    "&:before": {
      content: 'counter(number) ". "',

      gridArea: "number",

      whiteSpace: "pre",

      ...mixins.typography["heading-5"],

      "@media": {
        [breakpoints["medium"]]: {
          content: "counter(number)",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          borderRadius: theme.radii.circle,

          padding: theme.space[1],
          marginBlockStart: calc.negate(theme.space[1]),

          width: calc.multiply(
            mixins.typography["heading-5"].fontSize,
            mixins.typography["heading-5"].lineHeight
          ),

          boxSizing: "content-box",

          height: "max-content",

          marginInlineEnd: theme.space[2],

          backgroundColor: theme.colors.brand[9],

          color: theme.colors.gray[1],
        },
      },
    },

    [`:is(.${modes.dark}) &:before`]: {
      "@media": {
        [breakpoints["medium"]]: {
          color: "inherit",
        },
      },
    },
  },
});

const highlightSectionItemTitle = style({
  ...mixins.typography["heading-5"],

  display: "flex",
  flexDirection: "column",

  gridArea: "title",

  marginBlockEnd: theme.space[1],

  fontWeight: theme.fontWeights.semiBold,
});

const highlightSectionItemDescription = style({
  gridRow: "3",
  gridColumn: "1",

  gridArea: "description",
});

export const highlightSectionItem = {
  container: highlightSectionItemContainer,
  title: highlightSectionItemTitle,
  description: highlightSectionItemDescription,
};
