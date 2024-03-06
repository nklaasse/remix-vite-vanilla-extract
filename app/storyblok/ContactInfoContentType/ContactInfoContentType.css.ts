import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { theme, mixins, breakpoints } from "~/css";

const contactSectionContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  inlineSize: theme.sizes.full,

  marginBlock: calc.multiply(theme.space[4], 2),

  paddingInline: theme.space[3],
  "@media": {
    [breakpoints["small"]]: {
      paddingInline: theme.space[5],
    },
  },
});

const contactSectionContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",

  inlineSize: theme.sizes.full,

  maxInlineSize: theme.sizes.contentContainer,
});

const contactSectionTitle = style({
  ...mixins.typography["heading-4"],

  marginBlockEnd: theme.space["1.5"],

  textAlign: "center",

  "@media": {
    [breakpoints["large"]]: {
      ...mixins.typography["heading-2"],
    },
  },
});

const contactSectionSubtitle = style({
  ...mixins.typography["heading-6"],

  color: theme.colors.gray[12],

  marginBlockEnd: calc.multiply(theme.space[3], 2.5),

  textAlign: "center",

  "@media": {
    [breakpoints["large"]]: {
      ...mixins.typography["heading-5"],
    },
  },
});

const contactSectionCards = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexWrap: "wrap",

  margin: calc.multiply(theme.space[2], -1),
  alignItems: "center",

  "@media": {
    [breakpoints["medium"]]: {
      alignItems: "flex-start",
      flexDirection: "row",
      margin: calc.multiply(theme.space["2.5"], -1),
    },
  },
});

const contactCardContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  boxSizing: "border-box",

  padding: theme.space[4],
  margin: theme.space[2],

  maxInlineSize: theme.sizes.card,

  backgroundColor: theme.colors.gray[1],

  textAlign: "center",

  "@media": {
    [breakpoints["medium"]]: {
      margin: theme.space["2.5"],
    },
  },
});

const contactCardImage = style({
  maxInlineSize: calc.multiply(theme.space[4], 5),

  marginBlockEnd: theme.space[1.5],
});

const contactCardTitle = style({
  ...mixins.typography["heading-5"],
});

const contactCardDescription = style({
  ...mixins.typography.intro,

  color: theme.colors.gray[12],

  marginBlockStart: theme.space[1],
  marginBlockEnd: theme.space[4],
});

const contactCardTime = style({
  ...mixins.typography.compact,

  marginBlockStart: theme.space[2.5],

  color: theme.colors.gray[12],
});

export const contactSection = {
  container: contactSectionContainer,
  content: contactSectionContent,
  cards: contactSectionCards,
  title: contactSectionTitle,
  subtitle: contactSectionSubtitle,
};

export const contactCard = {
  card: contactCardContainer,
  image: contactCardImage,
  title: contactCardTitle,
  description: contactCardDescription,
  time: contactCardTime,
};
