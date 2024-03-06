import { breakpoints, mixins, theme } from "~/css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const datePickerInputContainer = style({
  display: "flex",
  flexDirection: "column",

  width: theme.sizes.full,
  height: theme.sizes.full,
});

const datePickerInputTray = style([
  datePickerInputContainer,
  {
    minWidth: theme.sizes.full,
    maxHeight: theme.sizes.full,
  },
]);

const datePickerInputPopover = style([
  datePickerInputContainer,
  {
    maxHeight: "360px",
    minWidth: "300px",
  },
]);

export const datePickerInput = {
  tray: datePickerInputTray,
  popover: datePickerInputPopover,
};

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

const calendarVariantsView = styleVariants({
  "day": {},
  "month": {},
});

const calendarVariants = {
  view: calendarVariantsView,
};

const calendarContainer = style({
  display: "flex",
  flexDirection: "column",

  maxHeight: "inherit",

  width: theme.sizes.full,
  height: theme.sizes.full,
});

const calendarContent = style({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "auto",

  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  gridTemplateRows: "100%",

  maxHeight: theme.sizes.full,

  overflow: "hidden",
});

const calendarNavigation = style({
  flexShrink: 0,
  flexGrow: 0,
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",

  backgroundColor: theme.colors.gray[1],

  paddingBlockStart: theme.space[1.5],
  paddingInline: theme.space[1.5],

  selectors: {
    [`${calendarVariantsView.day} &`]: {
      paddingInline: calc.subtract(
        calc.divide(
          calc.divide(
            calc.subtract("100%", calc.multiply(theme.space[1], 2)),
            7
          ),
          2
        ),
        "1ch"
      ),
    },
  },

  "@media": {
    [breakpoints.medium]: {
      paddingInline: theme.space[1],
    },
  },
});

const calendarPagination = style({
  display: "grid",
  gridAutoColumns: "min-content",
  gridAutoFlow: "column",
  gridColumnGap: theme.space[1],
  alignItems: "center",

  marginInlineStart: "auto",
});

export const calendar = {
  container: calendarContainer,
  content: calendarContent,

  navigation: calendarNavigation,
  pagination: calendarPagination,

  variants: calendarVariants,
};

const viewToggleIsExpanded = style({});
const viewToggleIsHovered = style({});
const viewToggleIsFocusVisible = style({});

const viewToggleStates = {
  isExpanded: viewToggleIsExpanded,
  isHovered: viewToggleIsHovered,
  isFocusVisible: viewToggleIsFocusVisible,
};

const viewToggleContainer = style({
  ...mixins.typography.text,

  position: "relative",

  display: "flex",
  alignItems: "center",

  padding: theme.space[1],
  margin: theme.space[0],

  fontWeight: theme.fontWeights.semiBold,

  color: "inherit",

  border: "none",
  borderRadius: theme.radii[0.5],

  background: "transparent",

  outline: "none",

  cursor: "pointer",

  selectors: {
    [`&:is(${viewToggleIsHovered})`]: {
      textDecoration: "underline",
    },

    [`&:is(${viewToggleIsFocusVisible}):before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, 1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${calc.add(theme.borderWidths.delimiter)} ${
        theme.colors.accent[7]
      }`,
    },
  },
});

const viewToggleIndicator = style({
  marginInlineStart: theme.space[1],
});

const viewToggleIndicatorExpanded = style([
  viewToggleIndicator,
  {
    display: "none",

    selectors: {
      [`:is(${viewToggleIsExpanded}) &`]: {
        display: "flex",
      },
    },
  },
]);

const viewToggleIndicatorCollapsed = style([
  viewToggleIndicator,
  {
    display: "flex",

    selectors: {
      [`:is(${viewToggleIsExpanded}) &`]: {
        display: "none",
      },
    },
  },
]);

export const viewToggle = {
  container: viewToggleContainer,

  indicatorExpanded: viewToggleIndicatorExpanded,
  indicatorCollapsed: viewToggleIndicatorCollapsed,

  states: viewToggleStates,
};

const calendarGridContainer = style({
  width: calc.subtract(theme.sizes.full, calc.multiply(theme.space[1], 2)),

  marginInline: theme.space[1],
  marginBlockEnd: theme.space[1],
  marginBlockStart: theme.space[2],

  tableLayout: "fixed",

  borderCollapse: "collapse",
});

const calendarGridTableHead = style({
  ...mixins.typography.compact,

  paddingBlockStart: theme.space[0],
  paddingBlockEnd: theme.space[0.5],
  paddingInline: theme.space[0],

  color: theme.colors.accent[11],
});

export const calendarGrid = {
  container: calendarGridContainer,
  tableHead: calendarGridTableHead,
};

const calendarGridTableCellIsSelected = style({});
const calendarGridTableCellIsFocused = style({});
const calendarGridTableCellIsHovered = style({});
const calendarGridTableCellIsPressed = style({});
const calendarGridTableCellIsFocusVisible = style({});
const calendarGridTableCellIsDisabled = style({});

const calendarGridTableCellStates = {
  isSelected: calendarGridTableCellIsSelected,
  isFocused: calendarGridTableCellIsFocused,
  isHovered: calendarGridTableCellIsHovered,
  isPressed: calendarGridTableCellIsPressed,
  isFocusVisible: calendarGridTableCellIsFocusVisible,
  isDisabled: calendarGridTableCellIsDisabled,
};

const calendarGridTableCellContainer = style({
  ...mixins.typography.text,

  fontWeight: theme.fontWeights.semiBold,

  verticalAlign: "middle",

  fontVariantNumeric: "tabular-nums",

  padding: calc.add(theme.borderWidths.border, theme.borderWidths.delimiter),
});

const calendarGridTableCellContent = style({
  ...mixins.typography.text,

  position: "relative",

  textAlign: "center",
  borderRadius: theme.radii[0.5],
  justifyContent: "center",
  boxSizing: "border-box",

  background: "transparent",
  border: "none",

  padding: calc.subtract(
    theme.space[0.5],
    calc.add(theme.borderWidths.border, theme.borderWidths.delimiter)
  ),

  color: theme.colors.accent[12],

  width: "100%",

  outline: "none",

  cursor: "pointer",

  selectors: {
    [`:is(${calendarGridTableCellIsHovered}, ${calendarGridTableCellIsFocused}) &`]:
      {
        backgroundColor: theme.colors.accent[3],
      },

    [`:is(${calendarGridTableCellIsPressed}) &`]: {
      backgroundColor: theme.colors.accent[4],
    },

    [`:is(${calendarGridTableCellIsSelected}) &`]: {
      ...mixins.accents.brand,

      backgroundColor: theme.colors.accent[9],
      color: theme.colors.accent[12],
    },

    [`:is(${calendarGridTableCellIsSelected}):is(${calendarGridTableCellIsHovered}, ${calendarGridTableCellIsFocused}) &`]:
      {
        backgroundColor: theme.colors.accent[10],
      },

    [`:is(${calendarGridTableCellIsDisabled}) &`]: {
      backgroundColor: "transparent",
      color: theme.colors.gray[8],

      cursor: "not-allowed",
    },

    [`:is(${calendarGridTableCellIsDisabled}):is(${calendarGridTableCellIsSelected}) &`]:
      {
        backgroundColor: theme.colors.gray[3],
      },

    [`:is(${calendarGridTableCellIsFocusVisible}) &:before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const calendarGridTableCell = {
  container: calendarGridTableCellContainer,
  content: calendarGridTableCellContent,

  states: calendarGridTableCellStates,
};

const dateSegmentsPickerContainer = style({
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

export const dateSegmentsPicker = {
  container: dateSegmentsPickerContainer,
};
