import { globalStyle, style } from "@vanilla-extract/css";

const bodyIsDragging = style({});

const bodyStates = {
  isDragging: bodyIsDragging,
};

globalStyle(`${bodyIsDragging} *`, {
  cursor: "grabbing !important",
});

export const body = {
  states: bodyStates,
};
