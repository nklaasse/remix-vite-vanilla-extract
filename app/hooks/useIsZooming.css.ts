import { globalStyle, style } from "@vanilla-extract/css";

const bodyIsZoomingIn = style({});
const bodyIsZoomingOut = style({});

const bodyStates = {
  isZoomingIn: bodyIsZoomingIn,
  isZoomingOut: bodyIsZoomingOut,
};

globalStyle(`${bodyIsZoomingIn} *`, {
  cursor: "zoom-in !important",
});

globalStyle(`${bodyIsZoomingOut} *`, {
  cursor: "zoom-out !important",
});

export const body = {
  states: bodyStates,
};
