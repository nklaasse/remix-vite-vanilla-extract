import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

// States
const cardIsHovered = style({});
const cardIsFocusVisible = style({});

const cardStates = {
  isCardHovered: cardIsHovered,
  isCardFocusVisible: cardIsFocusVisible,
};

const cardContainer = style({
  position: "relative",

  display: "flex",
  flexDirection: "column",

  width: "100%",
  boxSizing: "content-box",

  padding: theme.space["1.5"],

  border: `1px solid transparent`,

  color: theme.colors.gray[12],

  cursor: "pointer",

  selectors: {
    [`&:nth-of-type(even)`]: {
      borderTopLeftRadius: theme.space[5],
    },

    [`&:is(${cardIsHovered})`]: {
      border: `1px solid ${theme.colors.accent[8]}`,
      backgroundColor: theme.colors.accent[2],
    },

    [`&:is(${cardIsFocusVisible})`]: {
      backgroundColor: theme.colors.accent[2],
      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const card = {
  container: cardContainer,
  states: cardStates,
};
