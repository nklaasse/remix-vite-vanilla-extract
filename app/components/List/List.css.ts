import { breakpoints, mixins, theme } from "~/css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const listContainerWidth = createVar();

const listVars = {
  containerWidth: listContainerWidth,
};

const listIsFocusVisible = style({});
const listIsFocused = style({});

const listStates = {
  isFocused: listIsFocused,
  isFocusVisible: listIsFocusVisible,
};

const listContainer = style({
  position: "relative",

  display: "grid",

  gridAutoFlow: "row",

  padding: theme.space[0],
  margin: theme.space[0],

  borderWidth: theme.borderWidths.border,
  borderColor: theme.colors.accent[7],
  borderStyle: "solid",

  borderRadius: theme.radii[0.5],

  listStyleType: "none",

  isolation: "isolate",

  outline: "none",

  selectors: {
    [`&:is(${listIsFocused})`]: {
      borderColor: theme.colors.accent[8],
    },

    [`&${listIsFocusVisible}:before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      borderRadius: theme.radii[0.5],

      zIndex: 1,

      display: "block",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const list = {
  container: listContainer,

  vars: listVars,

  states: listStates,
};

const listItemDragPreviewIsSelected = style({});

const listItemDragPreviewStates = {
  isSelected: listItemDragPreviewIsSelected,
};

const listItemDragPreviewTypes = styleVariants({
  single: {},
  multiple: {},
});

const listItemDragPreviewVariants = {
  type: listItemDragPreviewTypes,
};

const listItemDragPreviewContainer = style({
  position: "relative",

  display: "flex",
  justifyContent: "stretch",
  alignItems: "stretch",

  backgroundColor: "white",
  width: listContainerWidth,

  margin: theme.space[2],
  padding: theme.space[0],

  borderRadius: theme.radii[0.5],

  selectors: {
    [`&:is(${listItemDragPreviewIsSelected})`]: {
      ...mixins.accents.selection,
    },

    [`&${listItemDragPreviewTypes.multiple}:before`]: {
      content: "''",

      position: "absolute",
      inset: 0,

      borderWidth: theme.borderWidths.border,
      borderColor: theme.colors.accent[6],
      borderStyle: "solid",

      borderRadius: theme.radii[0.5],

      transform: `translateY(${calc.multiply(
        theme.space[0.5],
        -1
      )}) scale(0.99)`,

      backgroundColor: "white",
    },

    [`&${listItemDragPreviewTypes.multiple}:is(${listItemDragPreviewIsSelected}):before`]:
      {
        backgroundColor: theme.colors.accent[5],
      },
  },
});

const listItemDragPreviewTotal = style({
  ...mixins.typography.compact,

  position: "absolute",

  zIndex: 3,

  display: "none",

  fontWeight: theme.fontWeights.semiBold,

  color: theme.colors.accent[1],
  backgroundColor: theme.colors.accent[9],

  insetBlockStart: theme.space[0],
  insetInlineEnd: theme.space[0],

  paddingInline: theme.space[0.5],

  borderRadius: theme.radii[0.5],

  transform: "translate(50%, -50%)",

  selectors: {
    [`${listItemDragPreviewTypes.multiple} &`]: {
      display: "block",
    },
  },
});

export const listItemDragPreview = {
  container: listItemDragPreviewContainer,
  total: listItemDragPreviewTotal,

  variants: listItemDragPreviewVariants,
  states: listItemDragPreviewStates,
};

const dropIndicatorIsTarget = style({});

const dropIndicatorStates = {
  isTarget: dropIndicatorIsTarget,
};

export const dropIndicatorContainer = style({
  ...mixins.accents.selection,

  display: "none",
  position: "relative",

  zIndex: 2,

  height: theme.sizes[0],
  width: theme.sizes.full,

  outline: "none",

  selectors: {
    "&:before": {
      content: "''",

      position: "absolute",
      height: theme.borderWidths.delimiter,
      insetInline: theme.space[0],
      insetBlock: calc.multiply(
        calc.divide(theme.borderWidths.delimiter, 2),
        -1
      ),

      backgroundColor: theme.colors.accent[9],
    },

    [`&${dropIndicatorIsTarget}`]: {
      display: "block",
    },
  },
});

export const listItemDropIndicatorDot = style({
  position: "absolute",
  insetBlockStart: calc.multiply(theme.space[0.5], -1),

  backgroundColor: theme.colors.accent[9],

  width: theme.sizes[1],
  height: theme.sizes[1],
  borderRadius: theme.radii.circle,
});

const listItemDropIndicatorStart = style([
  listItemDropIndicatorDot,
  {
    insetInlineStart: calc.multiply(theme.space[0.5], -1),
  },
]);

const listItemDropIndicatorEnd = style([
  listItemDropIndicatorDot,
  {
    insetInlineEnd: calc.multiply(theme.space[0.5], -1),
  },
]);

export const listItemDropIndicator = {
  container: dropIndicatorContainer,
  start: listItemDropIndicatorStart,
  end: listItemDropIndicatorEnd,

  states: dropIndicatorStates,
};

const listItemIsSelected = style({});
const listItemIsFocusVisible = style({});
const listItemIsFocusVisibleWithin = style({});
const listItemIsHovered = style({});
const listItemIsFocused = style({});

const listItemStates = {
  isSelected: listItemIsSelected,
  isFocusVisible: listItemIsFocusVisible,
  isFocusVisibleWithin: listItemIsFocusVisibleWithin,
  isHovered: listItemIsHovered,
  isFocused: listItemIsFocused,
};

export const listItemContainer = style({
  position: "relative",
  zIndex: 0,

  display: "flex",
  flexDirection: "column",

  boxSizing: "border-box",

  padding: theme.space[1],

  color: theme.colors.accent[12],

  width: theme.sizes.full,

  listStyleType: "none",

  cursor: "grab",

  outline: "none",

  selectors: {
    "&:first-child": {
      borderStartStartRadius: theme.radii[0.5],
      borderStartEndRadius: theme.radii[0.5],
    },

    "&:last-child": {
      borderEndStartRadius: theme.radii[0.5],
      borderEndEndRadius: theme.radii[0.5],
    },

    [`${listItemDragPreviewContainer} &`]: {
      borderRadius: theme.radii[0.5],
    },

    "&:before": {
      content: "''",

      position: "absolute",
      insetInline: calc.multiply(theme.borderWidths.border, -1),
      insetBlockStart: calc.multiply(theme.borderWidths.border, -1),
      insetBlockEnd: 0,

      backgroundColor: "transparent",

      borderColor: "transparent",
      borderInlineWidth: 0,
      borderBlockWidth: 0,
      borderStyle: "solid",

      borderRadius: "inherit",
    },

    [`&:is(${listItemIsHovered})`]: {
      zIndex: 1,
    },

    [`&:is(${listItemIsFocused})`]: {
      zIndex: 2,
    },

    [`&:is(${listItemIsSelected}, ${listItemIsHovered}, ${listItemIsFocused})`]:
      {
        ...mixins.accents.selection,
      },

    [`&:is(${listItemIsSelected}, ${listItemIsHovered}, ${listItemIsFocused}):before`]:
      {
        borderInlineWidth: theme.borderWidths.border,
        borderBlockWidth: theme.borderWidths.border,
      },

    [`&:is(${listItemIsSelected}) + &:is(${listItemIsSelected}):not(${listItemIsHovered}, ${listItemIsFocused}):before`]:
      {
        borderBlockStartWidth: 0,
        borderBlockEndWidth: theme.borderWidths.border,
      },

    [`&:is(${listItemIsSelected}) + ${listItemDropIndicator.container} + &:is(${listItemIsSelected}):not(${listItemIsHovered}, ${listItemIsFocused}):before`]:
      {
        borderBlockStartWidth: 0,
        borderBlockEndWidth: theme.borderWidths.border,
      },

    [`&:is(${listItemIsHovered}, ${listItemIsFocused}):before`]: {
      borderBlockStartWidth: theme.borderWidths.border,
      borderBlockEndWidth: theme.borderWidths.border,

      backgroundColor: theme.colors.accent[3],
      borderColor: theme.colors.accent[8],
    },

    [`&:is(${listItemIsSelected}):before`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&:is(${listItemIsSelected}):not(${listItemIsHovered}, ${listItemIsFocused}):before`]:
      {
        borderColor: theme.colors.accent[7],
      },

    [`&${listItemIsFocusVisible}:after`]: {
      content: "''",

      position: "absolute",
      insetInline: calc.multiply(theme.borderWidths.border, -1),
      insetBlockStart: calc.multiply(theme.borderWidths.border, -1),
      insetBlockEnd: 0,

      zIndex: 1,

      borderRadius: "inherit",

      display: "block",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const listItemContent = style({
  display: "grid",

  fontWeight: "medium",

  position: "relative",

  isolation: "isolate",

  minHeight: calc.add(
    calc.multiply(
      mixins.typography.text.fontSize,
      mixins.typography.text.lineHeight
    ),
    calc.multiply(
      mixins.typography.compact.fontSize,
      mixins.typography.compact.lineHeight
    )
  ),

  gridTemplate: `
      "checkbox                  .           actions     " 1fr
      "checkbox                  title       actions     " min-content
      "checkbox                  description actions     " min-content
      "checkbox                  .           actions     " 1fr
    /  minmax(auto, max-content) 1fr         max-content
  `,

  alignItems: "center",
});

export const listItemSelectionIndicator = style({
  gridArea: "checkbox",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  paddingInline: theme.space[0.5],
  marginInlineEnd: theme.space[0.5],

  "@media": {
    [breakpoints.large]: {
      paddingInline: theme.space[1],
      marginInlineEnd: theme.space[0],
    },
  },
});

export const listItem = {
  container: listItemContainer,
  content: listItemContent,

  selectionIndicator: listItemSelectionIndicator,

  states: listItemStates,
};

const listItemDragHandleIsFocusVisible = style({});

const listItemDragHandleStates = {
  isFocusVisible: listItemDragHandleIsFocusVisible,
};

const listItemDragHandleContainer = style({
  display: "none",

  position: "absolute",
  insetInlineStart: calc.multiply(theme.space[1.5], -1),

  transform: "scale(0.5)",
  transformOrigin: "center",

  padding: theme.space[0.5],

  outline: "none",

  "selectors": {
    [`:is(${listItemIsFocusVisibleWithin}) &`]: {
      display: "flex",
    },

    [`&:is(${listItemDragHandleIsFocusVisible}):before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      zIndex: 1,

      borderRadius: theme.radii[0.5],

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

export const listItemDragHandle = {
  container: listItemDragHandleContainer,

  states: listItemDragHandleStates,
};
