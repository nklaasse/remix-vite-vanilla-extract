import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { breakpoints, mixins, theme } from "~/css";

const statisticsRoWContainer = style({
  display: "flex",

  flexDirection: "column",
  alignItems: "center",

  inlineSize: theme.sizes.full,

  paddingInline: theme.space[3],

  "@media": {
    [breakpoints["small"]]: {
      paddingInline: theme.space[5],
    },
  },
});

const statisticsRoWContentContainer = style({
  display: "grid",

  gridTemplateRows: "auto 1fr",
  gridTemplateColumns: "1fr 1fr",

  rowGap: theme.space[4],
  columnGap: theme.space[1.5],

  maxInlineSize: theme.sizes.contentContainer,
  inlineSize: theme.sizes.full,

  justifyItems: "center",

  "@media": {
    [breakpoints["medium"]]: {
      columnGap: theme.space[3],
      gridTemplateRows: "1fr",
      gridTemplateColumns: `1fr 1fr 1fr`,
    },
    [breakpoints["large"]]: {
      columnGap: theme.space[5],
    },
  },
});

const statisticContainer = style({
  selectors: {
    "&:nth-child(1)": {
      gridRow: "1 / span 1",
      gridColumn: "1 / span 1",
    },
    "&:nth-child(2)": {
      gridRow: "1 / span 1",
      gridColumn: "2 / span 1",
    },
    "&:nth-child(3)": {
      gridRow: "2 / span 1",
      gridColumn: "1 / span 2",

      "@media": {
        [breakpoints["medium"]]: {
          gridRow: "1 / span 1",
          gridColumn: "3 / span 1",
        },
      },
    },
  },
});

const statisticCardNumber = style({
  ...mixins.typography["heading-4"],

  fontWeight: theme.fontWeights.bold,

  textAlign: "center",

  "@media": {
    [breakpoints["medium"]]: {
      ...mixins.typography["heading-3"],
    },
    [breakpoints["large"]]: {
      ...mixins.typography["heading-2"],
    },
  },
});

const statisticCardCaption = style({
  ...mixins.typography.text,
  ...mixins.accents.brand,

  fontWeight: theme.fontWeights.semiBold,

  color: theme.colors.accent[9],

  textAlign: "center",

  maxInlineSize: calc.multiply(theme.sizes[1], 28),

  "@media": {
    [breakpoints["medium"]]: {
      ...mixins.typography.intro,
    },
    [breakpoints["large"]]: {
      ...mixins.typography["heading-5"],
    },
  },
});

export const statisticsRow = {
  container: statisticsRoWContainer,
  contentContainer: statisticsRoWContentContainer,
};

export const statistic = {
  container: statisticContainer,
  number: statisticCardNumber,
  caption: statisticCardCaption,
};
