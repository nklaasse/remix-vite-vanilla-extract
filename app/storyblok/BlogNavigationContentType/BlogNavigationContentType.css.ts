import { style } from "@vanilla-extract/css";
import { breakpoints, mixins, theme } from "~/css";

const blogNavigationContainer = style({
  display: "grid",
  gridGap: theme.space["3"],
  gridAutoFlow: "column",
  justifyContent: "start",
  padding: theme.space["2"],
  overflowX: "auto",
  whiteSpace: "nowrap",
  background: theme.colors.gray["3"],

  "@media": {
    [breakpoints.medium]: {
      justifyContent: "center",
      paddingInline: theme.space["3"],
      gridGap: theme.space["5"],
    },
  },
});

const linkIsActive = style({});
const linkStates = {
  isActive: linkIsActive,
};

const blogNavigationLinks = style({
  ...mixins.typography.text,
  textDecoration: "none",
  color: theme.colors.gray["12"],
  fontWeight: 500,

  selectors: {
    "&:hover": {
      color: theme.colors.brand["9"],
    },

    [`&:is(${linkStates.isActive})`]: {
      color: theme.colors.brand["10"],
    },
  },
});

export const blogNavigation = {
  container: blogNavigationContainer,
  blogNavigationLinks,
  linkStates,
};
