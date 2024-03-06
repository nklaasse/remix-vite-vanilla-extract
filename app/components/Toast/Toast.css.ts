import { mixins, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const toastTypes = styleVariants({
  info: {},
  success: {},
  error: {},
});

const toastVariants = {
  type: toastTypes,
};

const toastContainer = style({
  display: "flex",
  justifyContent: "space-between",

  padding: theme.space[2],

  borderRadius: theme.radii[1],

  boxShadow: `0 2px ${theme.space[2]} 0 ${theme.colors.gray[8]}`,

  selectors: {
    [`&:is(${toastVariants.type.info})`]: {
      ...mixins.accents.indigo,
      color: theme.colors.accent[9],
    },
    [`&:is(${toastVariants.type.success})`]: {
      color: theme.colors.success[10],
    },
    [`&:is(${toastVariants.type.error})`]: {
      color: theme.colors.error[9],
    },
    [`&:not(:last-child)`]: {
      marginBlockEnd: theme.space[1],
    },
  },
});

const toastHeader = style({
  display: "flex",
});

const toastIcon = style({
  display: "flex",
  alignItems: "center",

  blockSize: theme.sizes[3],
  minInlineSize: theme.sizes[3],

  marginInlineEnd: theme.space[1],
});

const toastContent = style({
  display: "flex",
  flexDirection: "column",
});

const toastButton = style({
  marginBlock: calc.multiply(calc.multiply(theme.space["0.5"], 1.5), -1),
  marginInlineEnd: calc.multiply(calc.multiply(theme.space["0.5"], 1.5), -1),
});

export const toast = {
  container: toastContainer,

  header: toastHeader,
  icon: toastIcon,
  content: toastContent,

  button: toastButton,

  variants: toastVariants,
};
