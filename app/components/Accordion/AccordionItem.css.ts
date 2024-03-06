import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const accordionItemIsExpanded = style({});

const accordionItemStates = {
  isExpanded: accordionItemIsExpanded,
};

const accordionItemContainer = style({
  borderBottomWidth: theme.borderWidths.border,
  borderBottomColor: theme.colors.gray[8],
  borderBottomStyle: "solid",

  selectors: {
    [`&:last-of-type`]: {
      borderBottomWidth: 0,
    },
  },
});

export const accordionItem = {
  container: accordionItemContainer,

  states: accordionItemStates,
};
