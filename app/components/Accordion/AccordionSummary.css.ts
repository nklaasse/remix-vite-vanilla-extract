import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { accordionItem } from "./AccordionItem.css";

const accordionSummaryIsHovered = style({});
const accordionSummaryIsFocusVisible = style({});
const accordionSummaryIsPressed = style({});

const accordionSummaryStates = {
  isHovered: accordionSummaryIsHovered,
  isFocusVisible: accordionSummaryIsFocusVisible,
  isPressed: accordionSummaryIsPressed,
};

const accordionSummaryContainer = style({
  ...mixins.typography["heading-5"],
  fontWeight: theme.fontWeights.bold,
  textAlign: "start",
  overflowWrap: "break-word",

  color: theme.colors.gray[12],
  background: "none",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",

  inlineSize: theme.sizes.full,

  paddingBlock: theme.space[4],

  border: "none",

  cursor: "pointer",

  outline: "none",
});

const accordionSummaryContent = style({
  selectors: {
    [`:is(${accordionSummaryIsHovered}) &`]: {
      textDecoration: "underline",
    },

    [`:is(${accordionSummaryIsFocusVisible}, ${accordionSummaryIsPressed}) &`]:
      {
        textDecoration: "underline double",
      },
  },
});

const accordionSummaryIndicator = style({
  display: "inline-flex",

  paddingInline: theme.space[1],
  marginInlineStart: theme.space[1],

  boxSizing: "content-box",

  transition: "transform 0.2s ease-in-out",

  transform: "translateY(2px)",

  selectors: {
    [`:is(${accordionItem.states.isExpanded}) &`]: {
      transform: "rotate(-45deg) translateY(2px)",
    },
  },
});

export const accordionSummary = {
  container: accordionSummaryContainer,
  content: accordionSummaryContent,
  indicator: accordionSummaryIndicator,
  states: accordionSummaryStates,
};
