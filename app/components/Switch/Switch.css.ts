import { style, styleVariants } from "@vanilla-extract/css";

const switchStates = styleVariants({
  isFocusVisible: {},
  isFocused: {},
  isSelected: {},
});

const switchContainer = style({
  display: "grid",

  gridTemplate: `
    "label                     input        " auto
    "description               input        " minmax(0px, min-content)
  /  minmax(auto, max-content) auto min-content
  `,

  alignItems: "center",

  cursor: "default",
});

export const _switch = {
  container: switchContainer,

  states: switchStates,
};
