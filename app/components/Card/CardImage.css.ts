import { theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { card } from "./Card.css";

const cardIsOdd = style({});

const cardImageStates = {
  isOdd: cardIsOdd,
};

const cardImgContainer = style({
  width: theme.sizes.full,

  objectFit: "cover",
  aspectRatio: "1/1",

  order: 1,

  selectors: {
    [`:is(${card.container}:nth-of-type(even)) &`]: {
      borderTopLeftRadius: theme.space[5],
    },
  },
});

export const cardImg = {
  container: cardImgContainer,
  states: cardImageStates,
};
