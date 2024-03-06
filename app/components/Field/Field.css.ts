import { style, styleVariants } from "@vanilla-extract/css";

const fieldHideLabel = styleVariants({
  [String(true)]: {},
  [String(false)]: {},
});

const hasErrorMessage = styleVariants({
  [String(true)]: {},
  [String(false)]: {},
});

const fieldVariants = {
  hideLabel: fieldHideLabel,
  hasErrorMessage: hasErrorMessage,
};

const fieldContainer = style({
  display: "grid",

  gridAutoFlow: "dense",

  gridTemplate: `
      "label       reset       contextualHelp .           valueLabel " auto
      "input       input       input          input       input      " auto
      "description description description    description description" auto
    /  auto        max-content max-content    1fr         max-content
    `,
});

export const field = {
  container: fieldContainer,

  variants: fieldVariants,
};
