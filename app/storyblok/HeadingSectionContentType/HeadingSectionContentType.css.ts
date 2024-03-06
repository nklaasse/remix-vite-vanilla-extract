import { style } from "@vanilla-extract/css";
import { breakpoints, mixins, theme } from "~/css";

const headingContainer = style({
  paddingInline: theme.space[3],

  "@media": {
    [breakpoints["small"]]: {
      paddingInline: theme.space[5],
    },
  },
});
const headingContentContainer = style({
  display: "flex",
  flexDirection: "column",

  textAlign: "center",

  maxInlineSize: theme.sizes.contentContainer,
  inlineSize: theme.sizes.full,
});

const headingSectionTitle = style({
  ...mixins.typography["heading-4"],

  color: theme.colors.gray[12],

  marginBlockEnd: theme.space[3],

  "@media": {
    [breakpoints["medium"]]: {
      ...mixins.typography["heading-3"],

      marginBlockEnd: theme.space[4],
    },
    [breakpoints["large"]]: {
      ...mixins.typography["heading-2"],
    },
  },
});

const headingContent = style({
  ...mixins.typography.intro,

  color: theme.colors.gray[11],
});

export const headingSection = {
  container: headingContainer,
  contentContainer: headingContentContainer,
  title: headingSectionTitle,
  content: headingContent,
};
