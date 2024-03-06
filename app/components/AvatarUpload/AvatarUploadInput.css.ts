import { breakpoints, mixins, modes, theme } from "~/css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { avatarUpload } from "./AvatarUpload.css";

const min = (...operands: Array<string>) => `min(${operands.join(", ")})`;

const avatarUploadInputHiddenInput = style({
  ...mixins.visuallyHidden,
});

export const avatarUploadInput = {
  hiddenInput: avatarUploadInputHiddenInput,
};

const avatarUploadInputDialogTriggerOrientation = styleVariants({
  landscape: {},
  portrait: {},
});

const avatarUploadInputDialogTriggerVariants = {
  orientation: avatarUploadInputDialogTriggerOrientation,
};

const avatarUploadInputDialogTriggerIsLoaded = style({});
const avatarUploadInputDialogTriggerIsFocused = style({});
const avatarUploadInputDialogTriggerIsHovered = style({});
const avatarUploadInputDialogTriggerIsPressed = style({});
const avatarUploadInputDialogTriggerIsExpanded = style({});

const avatarUploadInputDialogTriggerStates = {
  isLoaded: avatarUploadInputDialogTriggerIsLoaded,
  isFocused: avatarUploadInputDialogTriggerIsFocused,
  isHovered: avatarUploadInputDialogTriggerIsHovered,
  isPressed: avatarUploadInputDialogTriggerIsPressed,
  isExpanded: avatarUploadInputDialogTriggerIsExpanded,
};

const avatarUploadInputDialogTriggerContainer = style({
  margin: calc.multiply(theme.space[0.5], -1),
  padding: theme.space[0],

  border: "none",
  outline: "none",
  borderRadius: theme.radii.circle,

  backgroundColor: theme.colors.accent[3],

  cursor: "inherit",

  borderColor: theme.colors.accent[7],
  borderStyle: "solid",
  borderWidth: theme.borderWidths.border,

  selectors: {
    [`&:is(${avatarUploadInputDialogTriggerIsHovered})`]: {
      borderColor: theme.colors.accent[8],
    },

    [`&:is(${avatarUploadInputDialogTriggerIsFocused}, ${avatarUploadInputDialogTriggerIsPressed}, ${avatarUploadInputDialogTriggerIsExpanded})`]:
      {
        borderColor: theme.colors.accent[9],
      },

    [`&:is(${avatarUploadInputDialogTriggerIsLoaded})`]: {
      zIndex: 1,
    },
  },
});

const avatarUploadInputDialogTriggerWrapper = style({
  width: calc.add(
    calc.multiply(theme.fontSizes.text, theme.lineHeights.text),
    calc.multiply(calc.subtract(theme.space[0.5], theme.borderWidths.border), 2)
  ),
  height: calc.add(
    calc.multiply(theme.fontSizes.text, theme.lineHeights.text),
    calc.multiply(calc.subtract(theme.space[0.5], theme.borderWidths.border), 2)
  ),

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  overflow: "hidden",
  borderRadius: theme.radii.circle,
});

const avatarUploadInputDialogTriggerTransform = style({
  transform: `scale(${avatarUpload.vars.scale}) translate(${avatarUpload.vars.translateX}, ${avatarUpload.vars.translateY})`,

  opacity: 0,

  selectors: {
    [`:is(${avatarUploadInputDialogTriggerIsLoaded}) &`]: {
      opacity: 1,
    },

    [`:is(${avatarUploadInputDialogTriggerOrientation.portrait}) &`]: {
      height: "auto",
      width: theme.sizes.full,
    },

    [`:is(${avatarUploadInputDialogTriggerOrientation.landscape}) &`]: {
      width: "auto",
      height: theme.sizes.full,
    },
  },
});

const avatarUploadInputDialogTriggerPlaceholder = style({
  height: calc.add(
    calc.multiply(theme.fontSizes.text, theme.lineHeights.text),
    theme.space[1]
  ),
  width: calc.add(
    calc.multiply(theme.fontSizes.text, theme.lineHeights.text),
    theme.space[1]
  ),

  borderRadius: theme.radii.circle,
});

export const avatarUploadInputDialogTrigger = {
  container: avatarUploadInputDialogTriggerContainer,
  wrapper: avatarUploadInputDialogTriggerWrapper,
  transform: avatarUploadInputDialogTriggerTransform,
  placeholder: avatarUploadInputDialogTriggerPlaceholder,

  states: avatarUploadInputDialogTriggerStates,

  variants: avatarUploadInputDialogTriggerVariants,
};

const avatarUploadDialogIsDropTarget = style({});

const avatarUploadDialogStates = {
  isDropTarget: avatarUploadDialogIsDropTarget,
};

const avatarUploadDialogContainer = style({
  display: "flex",
  flexDirection: "column",

  maxHeight: theme.sizes.full,
  height: theme.sizes.full,
});

const avatarUploadDialogWrapper = style([
  modes.dark,
  {
    height: theme.sizes.full,

    flexGrow: 0,
    flexShrink: 1,

    display: "flex",
    flexDirection: "column",

    marginInline: calc.multiply(theme.space[3], -1),

    paddingInline: theme.space[3],
    paddingBlock: theme.space[1],

    backgroundColor: theme.colors.gray[1],

    "selectors": {
      [`:is(${avatarUploadDialogStates.isDropTarget}) &`]: {
        backgroundColor: theme.colors.accent[2],
      },
    },

    "@media": {
      [breakpoints.medium]: {
        paddingInline: theme.space[5],
        marginInline: calc.multiply(theme.space[5], -1),
      },
    },
  },
]);

const avatarUploadDialogActions = style({
  display: "grid",
  gap: theme.space[1],
  justifyContent: "flex-end",
  gridTemplateColumns: "auto auto",

  marginBlockStart: theme.space[2],
});

export const avatarUploadDialog = {
  container: avatarUploadDialogContainer,
  wrapper: avatarUploadDialogWrapper,
  actions: avatarUploadDialogActions,

  states: avatarUploadDialogStates,
};

const avatarUploadCropOrientation = styleVariants({
  landscape: {},
  portrait: {},
});

const avatarUploadVariants = {
  orientation: avatarUploadCropOrientation,
};

const avatarUploadCropIsHovered = style({});
const avatarUploadCropIsFocused = style({});
const avatarUploadCropIsFocusVisible = style({});
const avatarUploadCropIsLoaded = style({});

const avatarUploadCropStates = {
  isHovered: avatarUploadCropIsHovered,
  isFocused: avatarUploadCropIsFocused,
  isFocusVisible: avatarUploadCropIsFocusVisible,
  isLoaded: avatarUploadCropIsLoaded,
};

const avatarUploadCropCanvasWidth = createVar();
const avatarUploadCropCanvasHeight = createVar();

const avatarUploadCropVars = {
  canvasWidth: avatarUploadCropCanvasWidth,
  canvasHeight: avatarUploadCropCanvasHeight,
};

const avatarUploadCropContainer = style({
  flexGrow: 1,
  flexShrink: 0,

  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  marginBlockEnd: theme.space[1],
  marginBlockStart: calc.multiply(theme.space[1], -1),
  marginInline: calc.multiply(theme.space[2], -1),

  width: calc.add(theme.sizes.full, calc.multiply(theme.space[2], 2)),

  boxSizing: "border-box",

  overflow: "hidden",

  selectors: {
    "&:after": {
      content: "",

      paddingTop: `min(${theme.sizes.full}, ${avatarUploadCropCanvasWidth})`,
    },
  },
});

const avatarUploadCropCanvas = style({
  position: "absolute",
  inset: theme.space[2],

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  maxWidth: "320px",

  margin: "0 auto",
});

const avatarUploadCropImage = style({
  position: "absolute",

  boxSizing: "content-box",

  transform: `scale(${avatarUpload.vars.scale}) translate(${avatarUpload.vars.translateX}, ${avatarUpload.vars.translateY})`,

  overflow: "hidden",

  opacity: 0,

  selectors: {
    [`:is(${avatarUploadCropIsLoaded}) &`]: {
      opacity: 1,
    },
  },
});

const avatarUploadCropBorder = style({
  position: "absolute",
  inset: theme.space[0],

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  selectors: {
    "&:before, &:after": {
      content: '""',

      position: "absolute",

      zIndex: 1,

      width: calc.subtract(
        min(avatarUploadCropCanvasWidth, avatarUploadCropCanvasHeight),
        calc.multiply(theme.borderWidths.border, 2)
      ),
      height: calc.subtract(
        min(avatarUploadCropCanvasWidth, avatarUploadCropCanvasHeight),
        calc.multiply(theme.borderWidths.border, 2)
      ),

      margin: "0 auto",

      borderRadius: theme.radii.circle,
    },

    "&:before": {
      insetInline: theme.space[0],

      borderWidth: theme.borderWidths.border,
      borderStyle: "solid",
      borderColor: theme.colors.accent[7],
    },

    "&:after": {
      padding: calc.add(theme.borderWidths.border, theme.borderWidths.border),
    },

    [`:is(${avatarUploadCropIsHovered}, ${avatarUploadCropIsFocused}) &:before`]:
      {
        borderColor: theme.colors.accent[8],
      },

    [`:is(${avatarUploadCropIsFocusVisible}) &:after`]: {
      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

const avatarUploadCropOverlay = style({
  position: "absolute",
  inset: theme.space[0],

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  transform: `translate(${calc.multiply(
    avatarUpload.vars.translateX,
    -1
  )}, ${calc.multiply(avatarUpload.vars.translateY, -1)})`,

  selectors: {
    "&:before": {
      content: '""',

      position: "absolute",

      zIndex: 1,

      width: min(avatarUploadCropCanvasWidth, avatarUploadCropCanvasHeight),
      height: min(avatarUploadCropCanvasWidth, avatarUploadCropCanvasHeight),

      margin: "0 auto",

      transform: `scale(${calc.divide(1, avatarUpload.vars.scale)})`,

      borderRadius: theme.radii.circle,

      insetInline: theme.space[0],

      boxShadow: `0 0 0 9999px ${theme.colors.overlay[10]}`,
    },
  },
});

const avatarUploadCropSource = style({
  display: "block",

  opacity: 0,

  selectors: {
    [`:is(${avatarUploadCropOrientation.portrait}) &`]: {
      width: min(avatarUploadCropCanvasWidth, avatarUploadCropCanvasHeight),
    },

    [`:is(${avatarUploadCropOrientation.landscape}) &`]: {
      height: min(avatarUploadCropCanvasWidth, avatarUploadCropCanvasHeight),
    },

    [`:is(${avatarUploadCropIsLoaded}) &`]: {
      opacity: 1,
    },
  },
});

const avatarUploadCropWrapper = style([
  modes.light,
  {
    position: "relative",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: min(avatarUploadCropCanvasWidth, avatarUploadCropCanvasHeight),
    height: min(avatarUploadCropCanvasWidth, avatarUploadCropCanvasHeight),

    outline: "none",

    marginInline: "auto",

    background: "transparent",
  },
]);

export const avatarUploadCrop = {
  container: avatarUploadCropContainer,
  canvas: avatarUploadCropCanvas,
  image: avatarUploadCropImage,
  source: avatarUploadCropSource,
  wrapper: avatarUploadCropWrapper,
  overlay: avatarUploadCropOverlay,
  border: avatarUploadCropBorder,

  states: avatarUploadCropStates,

  variants: avatarUploadVariants,

  vars: avatarUploadCropVars,
};
