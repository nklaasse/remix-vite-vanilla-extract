/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/

import { globalStyle } from "@vanilla-extract/css";

globalStyle(`*, *::before, *::after`, {
  boxSizing: "border-box",
});

globalStyle(`*`, {
  margin: 0,
});

globalStyle(`html, body`, {
  blockSize: "100%",
});

globalStyle(`body`, {
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
});

globalStyle(`img, picture, video, canvas, svg`, {
  display: "block",
  maxInlineSize: "100%",
});

globalStyle(`input, button, textarea, select`, {
  font: "inherit",
});

globalStyle(`p, h1, h2, h3, h4, h5, h6`, {
  overflowWrap: "break-word",
});
