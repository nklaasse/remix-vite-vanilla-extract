import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { theme, mixins, breakpoints } from "~/css";

// States ======================================================================

// Styles ======================================================================

// ARTICLE CONTAINER
const articleContainer = style({
  maxWidth: theme.sizes.textContainer,
  marginInline: "auto",
  paddingInline: theme.space[2],
  marginBlockEnd: theme.space[2],

  "@media": {
    [breakpoints["medium"]]: {
      paddingInline: theme.space[0],
    },
  },
});

// ARTICLE HEADER
const blogPostHeader = style({
  display: "flex",
  flexDirection: "column-reverse",
  maxWidth: theme.sizes.full,
  marginInline: "auto",
  marginBlockEnd: theme.space[3],

  "@media": {
    [breakpoints["medium"]]: {
      maxWidth: theme.sizes.textContainer,
      flexDirection: "row",
    },
    [breakpoints["large"]]: {
      flexDirection: "row",
      maxWidth: theme.sizes.contentContainer,
    },
  },
});

const blogPostHeaderTitleContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: theme.sizes.full,
  paddingInlineStart: theme.space[2],

  "@media": {
    [breakpoints["medium"]]: {
      width: "50%",
    },
  },
});

const blogPostHeaderTitle = style({
  ...mixins.typography["heading-3"],
  fontSize: theme.fontSizes["heading-4"],
  width: theme.sizes.full,

  "@media": {
    [breakpoints["medium"]]: {
      fontSize: theme.fontSizes["heading-3"],
      width: theme.sizes["3/4"],
    },
    [breakpoints["large"]]: {
      fontSize: theme.fontSizes["heading-2"],
      width: theme.sizes["3/4"],
    },
  },
});

const blogPostHeaderImg = style({
  width: theme.sizes.full,
  borderEndEndRadius: calc.multiply(theme.space[3], 2),
  maxHeight: "560px",
  objectFit: "cover",

  "@media": {
    [breakpoints["medium"]]: {
      width: "50%",
    },
  },
});

// AUTHOR SECTION
const authorSectionContainer = style({
  ...mixins.typography.text,

  width: theme.sizes.full,

  borderBlockStart: "1px solid",
  borderColor: theme.colors.gray[6],

  paddingBlock: theme.space[5],

  paddingInline: theme.space[2],

  "@media": {
    [breakpoints["medium"]]: {
      paddingInline: theme.space[0],
    },
  },
});

const authorSectionInnerContainer = style({
  maxWidth: theme.sizes.textContainer,
  marginInline: "auto",
});

const authorSectionTitle = style({
  textAlign: "center",
  marginBlockEnd: theme.space[2],

  "@media": {
    [breakpoints["medium"]]: {
      textAlign: "left",
      marginBlockEnd: theme.space[2.5],
    },
  },
});

const authorSectionInfos = style({
  display: "grid",
  gridColumnGap: theme.space[0],
  justifyItems: "center",
  gridRowGap: theme.space[2],

  "@media": {
    [breakpoints["medium"]]: {
      display: "inline-grid",

      gridTemplateColumns: "auto auto",
      gridColumnGap: theme.space[2.5],
      gridRowGap: theme.space[0],
    },
  },
});

// Blog Post Infos
const blogPostInfosContainer = style({
  ...mixins.typography["compact"],

  fontWeight: theme.fontWeights.bold,
  marginBlockStart: theme.space["3"],

  color: theme.colors.gray[12],
});

const blogPostInfosTopInnerContainer = style({
  display: "inline-grid",
  gridTemplateColumns: "auto auto",
  gridColumnGap: theme.space[2],
  alignItems: "center",
  marginBlockEnd: theme.space["1.5"],
});

const blogPostInfosBottomInnerContainer = style({
  display: "flex",
  flexDirection: "row",
});

const blogPostInfosSubject = style({
  color: theme.colors.gray[11],
});

const blogPostInfosDate = style({
  marginInline: theme.space["0.5"],

  ":before": {
    content: "·",
    marginInlineEnd: theme.space["0.5"],
  },

  ":after": {
    content: "·",
    marginInlineStart: theme.space["0.5"],
  },
});

// Exports =====================================================================
export const blogPost = {
  header: blogPostHeader,
  headerImg: blogPostHeaderImg,
  headerTitleContainer: blogPostHeaderTitleContainer,
  headerTitle: blogPostHeaderTitle,
  content: articleContainer,
};

export const authorSection = {
  container: authorSectionContainer,
  innerContainer: authorSectionInnerContainer,
  title: authorSectionTitle,
  informations: authorSectionInfos,
};

export const blogPostInfos = {
  container: blogPostInfosContainer,
  topInnerContainer: blogPostInfosTopInnerContainer,
  bottomInnerContainer: blogPostInfosBottomInnerContainer,
  subject: blogPostInfosSubject,
  date: blogPostInfosDate,
};
