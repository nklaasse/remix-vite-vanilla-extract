import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const fileUploadInputContainer = style({
  display: "block",

  width: theme.sizes.full,
});

const fileUploadInputContent = style({
  display: "flex",

  flexDirection: "column",

  justifyContent: "center",
  alignItems: "center",

  marginInline: "auto",

  minHeight: calc.multiply(
    calc.multiply(
      mixins.typography.text.fontSize,
      mixins.typography.text.lineHeight
    ),
    7
  ),
});

const fileUploadInputIcon = style({
  height: calc.multiply(
    calc.multiply(
      mixins.typography.text.fontSize,
      mixins.typography.text.lineHeight
    ),
    5
  ),
  width: calc.multiply(
    calc.multiply(
      mixins.typography.text.fontSize,
      mixins.typography.text.lineHeight
    ),
    5
  ),

  marginBlockEnd: theme.space[0.5],
});

const fileUploadInputLabel = style({
  ...mixins.typography.text,

  width: theme.sizes.full,

  whiteSpace: "normal",

  boxSizing: "content-box",

  textAlign: "center",
});

const fileUploadInputValue = style({
  ...mixins.typography.compact,

  color: theme.colors.gray[11],

  maxWidth: theme.sizes.full,
});

const fileUploadInputFileName = style({
  overflow: "hidden",
  textOverflow: "ellipsis",

  textAlign: "center",
  display: "block",
});

export const fileUploadInput = {
  container: fileUploadInputContainer,
  content: fileUploadInputContent,
  icon: fileUploadInputIcon,
  label: fileUploadInputLabel,

  value: fileUploadInputValue,
  fileName: fileUploadInputFileName,
};

const fakeUploadTriggerIsHovered = style({});
const fakeUploadTriggerIsPressed = style({});

const fakeUploadTriggerStates = {
  isHovered: fakeUploadTriggerIsHovered,
  isPressed: fakeUploadTriggerIsPressed,
};

const fakeUploadTriggerContainer = style({
  display: "inline",

  ...mixins.typography.inherit,

  fontWeight: theme.fontWeights.semiBold,

  backgroundColor: "transparent",
  border: "none",

  padding: theme.space[0],
  margin: theme.space[0],

  selectors: {
    [`&:is(${fakeUploadTriggerIsHovered})`]: {
      textDecoration: "underline",
    },
    [`&:is(${fakeUploadTriggerIsPressed})`]: {
      textDecoration: "underline double",
    },
  },
});

export const fakeUploadTrigger = {
  container: fakeUploadTriggerContainer,

  states: fakeUploadTriggerStates,
};
