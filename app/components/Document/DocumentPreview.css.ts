import { theme } from "~/css";
import { keyframes, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { document } from "./Document.css";

const documentPreviewIsHovered = style({});
const documentPreviewIsFocused = style({});
const documentPreviewIsFocusVisible = style({});

const documentPreviewStates = {
  isHovered: documentPreviewIsHovered,
  isFocused: documentPreviewIsFocused,
  isFocusVisible: documentPreviewIsFocusVisible,
};

const documentPreviewContainer = style({
  gridArea: "preview",

  position: "relative",

  background: theme.colors.gray[1],
  color: theme.colors.gray[4],
  borderRadius: theme.radii[1],
  boxShadow: `0px 0px 32px 0px rgba(0, 0, 0, 0.08)`,

  borderWidth: theme.borderWidths.border,
  borderColor: theme.colors.gray[7],
  borderStyle: "solid",

  outline: "none",

  selectors: {
    "&:before": {
      content: "''",

      display: "block",

      width: theme.sizes.full,

      paddingBlockEnd: calc.multiply(theme.sizes.full, 1.41),
    },

    [`&:is(${documentPreviewIsFocused}, ${documentPreviewIsHovered})`]: {
      borderColor: theme.colors.accent[8],
      color: theme.colors.gray[5],
    },

    [`&:is(${documentPreviewIsFocusVisible}):after`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

const documentPreviewImage = style({
  position: "absolute",
  inset: theme.space[0],
  width: theme.sizes.full,
  height: theme.sizes.full,

  borderRadius: "inherit",

  // Hides the broken image icon
  textIndent: -9999,
});

export const documentPreview = {
  container: documentPreviewContainer,
  image: documentPreviewImage,

  states: documentPreviewStates,
};

const pulse = keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.65 },
  "100%": { opacity: 1 },
});

const placeholderContainer = style({
  position: "absolute",
  inset: theme.space[0],

  display: "flex",

  width: theme.sizes.full,

  animationName: pulse,
  animationDuration: "3s",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
});

const placeholderResume = style({
  display: "none",

  selectors: {
    [`:is(${document.variants["resume"]}) &`]: {
      display: "initial",
    },
  },
});

const placeholderCoverLetter = style({
  display: "none",

  selectors: {
    [`:is(${document.variants["cover-letter"]}) &`]: {
      display: "initial",
    },
  },
});

export const placeholder = {
  container: placeholderContainer,

  resume: placeholderResume,
  coverLetter: placeholderCoverLetter,
};
