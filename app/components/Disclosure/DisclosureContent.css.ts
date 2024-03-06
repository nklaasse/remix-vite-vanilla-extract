import { mixins } from "~/css";
import { style } from "@vanilla-extract/css";

const disclosureContentStateIsExpanded = style({});

const disclosureContentStates = {
  isExpanded: disclosureContentStateIsExpanded,
};

const disclosureContentContainer = style({
  ...mixins.typography.text,

  display: "none",

  selectors: {
    [`&:is(${disclosureContentStateIsExpanded})`]: {
      display: "flex",
    },
  },
});

export const disclosureContent = {
  container: disclosureContentContainer,

  states: disclosureContentStates,
};
