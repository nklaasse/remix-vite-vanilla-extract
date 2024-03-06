import { mixins, theme } from "~/css";
import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const dateFieldDateSegments = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",

  marginInline: calc.multiply(theme.space[0.5], -1),
});

export const dateField = {
  dateSegments: dateFieldDateSegments,
};

const editableSegmentCharCount = createVar();

const editableSegmentVars = {
  charCount: editableSegmentCharCount,
};

const editableSegmentIsPlaceholder = style({});

const editableSegmentVariants = {
  isPlaceholder: editableSegmentIsPlaceholder,
};

const editableSegmentIsFocused = style({});
const editableSegmentIsHovered = style({});

const editableSegmentStates = {
  isFocused: editableSegmentIsFocused,
  isHovered: editableSegmentIsHovered,
};

const editableSegmentContainer = style({
  ...mixins.typography.text,

  paddingInline: calc.subtract(theme.space[0.5], theme.borderWidths.border),
  marginInline: theme.borderWidths.delimiter,
  marginBlock: calc.multiply(theme.borderWidths.border, -1),

  minWidth: calc.multiply(editableSegmentCharCount, "1ch"),

  borderWidth: theme.borderWidths.border,
  borderColor: "transparent",
  borderStyle: "solid",

  borderRadius: theme.radii[0.5],

  textAlign: "end",

  fontVariantNumeric: "tabular-nums",

  caretColor: "transparent",

  outline: "none",

  selectors: {
    [`&:is(${editableSegmentIsFocused}, ${editableSegmentIsHovered})`]: {
      background: theme.colors.accent[3],
      color: theme.colors.accent[12],
      borderColor: theme.colors.accent[9],
    },
  },
});

const editableSegmentPlaceholder = style({
  display: "none",

  color: theme.colors.accent[9],

  pointerEvents: "none",

  selectors: {
    [`${editableSegmentIsPlaceholder} &`]: {
      display: "block",
    },

    [`:is(${editableSegmentIsFocused}) &`]: {
      color: "inherit",
    },
  },
});

export const editableSegment = {
  container: editableSegmentContainer,
  placeholder: editableSegmentPlaceholder,

  vars: editableSegmentVars,

  variants: editableSegmentVariants,

  states: editableSegmentStates,
};

const literalSegmentContainer = style({
  ...mixins.typography.text,

  fontVariantNumeric: "tabular-nums",

  selectors: {
    [`${editableSegmentIsPlaceholder} + &`]: {
      color: theme.colors.accent[9],
    },
  },
});

export const literalSegment = {
  container: literalSegmentContainer,
};

const segmentPickersContainer = style({
  flexBasis: "auto",
  flexGrow: 0,
  flexShrink: 1,

  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  gridTemplateRows: "100%",

  maxHeight: "100%",

  overflowY: "hidden",
  overflowX: "hidden",
});

export const segmentPickers = {
  container: segmentPickersContainer,
};

const periodPickerInputPickerContainer = style({
  display: "flex",
  flexDirection: "column",

  height: theme.sizes.full,
  width: theme.sizes.full,
});

const periodPickerInputPickerTray = style([
  periodPickerInputPickerContainer,
  {
    minWidth: theme.sizes.full,
    maxHeight: theme.sizes.full,
  },
]);

const periodPickerInputPickerPopover = style([
  periodPickerInputPickerContainer,
  {
    maxHeight: "360px",
    minWidth: "300px",
  },
]);

const periodPickerInputPickerContent = style({
  display: "flex",
  flexDirection: "column",

  maxHeight: "inherit",
  height: theme.sizes.full,
  width: theme.sizes.full,
});

const periodPickerInputPickerGranularity = style({
  flexShrink: 0,
  flexGrow: 0,

  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "stretch",

  background: theme.colors.accent[1],

  padding: theme.space[1],
});

export const periodPickerInput = {
  tray: periodPickerInputPickerTray,
  popover: periodPickerInputPickerPopover,

  content: periodPickerInputPickerContent,
  granularity: periodPickerInputPickerGranularity,
};
