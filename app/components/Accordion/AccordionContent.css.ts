import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { accordionItem } from "./AccordionItem.css";

const accordionContentContainer = style({
  ...mixins.typography.text,

  color: theme.colors.gray[11],

  marginBlockStart: calc.negate(theme.space[2]),

  paddingBlockEnd: theme.space[4],

  display: "none",

  selectors: {
    [`:is(${accordionItem.states.isExpanded}) &`]: {
      display: "block",
    },
  },
});

export const accordionContent = {
  container: accordionContentContainer,
};
