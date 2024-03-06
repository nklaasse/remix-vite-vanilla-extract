import { breakpoints, mixins, theme } from "~/css";
import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const templateSelectInputTemplateCount = createVar();
const templateSelectInputContainerWidth = createVar();
const templateSelectInputScrollContainerWidth = createVar();

const templateSelectInputMaxTemplates = createVar();

const templateSelectInputVars = {
  templateCount: templateSelectInputTemplateCount,
  containerWidth: templateSelectInputContainerWidth,
  scrollContainerWidth: templateSelectInputScrollContainerWidth,
};

const templateSelectInputContainer = style({
  display: "flex",

  position: "relative",

  vars: {
    [templateSelectInputMaxTemplates]: String(2),
  },

  "@media": {
    [breakpoints.medium]: {
      vars: {
        [templateSelectInputMaxTemplates]: String(3),
      },
    },
  },
});

const templateSelectInputNavigation = style({
  position: "absolute",
  insetBlockStart: "50%",

  transform: "translateY(-50%)",

  "@media": {
    [`(pointer: coarse)`]: {
      display: "none",
    },
  },
});

const templateSelectInputNext = style([
  templateSelectInputNavigation,
  { insetInlineEnd: theme.space[1] },
]);

const templateSelectInputPrev = style([
  templateSelectInputNavigation,
  { insetInlineStart: theme.space[1] },
]);

const spaceAround = calc.divide(
  calc.subtract(
    templateSelectInputScrollContainerWidth,
    templateSelectInputContainerWidth
  ),
  2
);

const minmax = (...operands: Array<string>) => `minmax(${operands.join(", ")})`;

const gridTemplateColumn = minmax(
  calc.divide(
    calc.subtract(
      calc.subtract(templateSelectInputContainerWidth, theme.space[5]),

      calc.multiply(
        theme.space[2],
        calc.subtract(templateSelectInputMaxTemplates, 1)
      )
    ),
    templateSelectInputMaxTemplates
  ),
  calc.divide(
    calc.subtract(
      calc.subtract(templateSelectInputContainerWidth),

      calc.multiply(
        theme.space[2],
        calc.subtract(templateSelectInputTemplateCount, 1)
      )
    ),
    templateSelectInputTemplateCount
  )
);

const templateSelectInputItems = style({
  display: "grid",
  gridAutoFlow: "column",
  gridColumnGap: theme.space[2],
  gridTemplateColumns: `
    repeat(
      ${templateSelectInputTemplateCount},
      ${gridTemplateColumn}
    )
  `,

  width: templateSelectInputScrollContainerWidth,

  paddingBlock: theme.borderWidths.delimiter,
  marginBlock: calc.multiply(theme.borderWidths.delimiter, -1),
  marginInline: calc.multiply(spaceAround, -1),

  isolation: "isolate",

  overflowX: "auto",
  overflowY: "hidden",

  scrollSnapType: "x mandatory",

  boxSizing: "content-box",

  msOverflowStyle: "none",
  scrollbarWidth: "none",

  scrollBehavior: "smooth",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },

    "&:after": {
      content: "''",

      width: calc.subtract(calc.multiply(spaceAround, 2), theme.space[2]),
    },
  },
});

export const templateSelectInput = {
  container: templateSelectInputContainer,

  next: templateSelectInputNext,
  prev: templateSelectInputPrev,

  items: templateSelectInputItems,

  vars: templateSelectInputVars,
};

const templateSelectInputItemIsSelected = style({});
const templateSelectInputItemIsHovered = style({});
const templateSelectInputItemIsFocused = style({});
const templateSelectInputItemIsFocusVisible = style({});

const templateSelectInputItemStates = {
  isSelected: templateSelectInputItemIsSelected,
  isHovered: templateSelectInputItemIsHovered,
  isFocused: templateSelectInputItemIsFocused,
  isFocusVisible: templateSelectInputItemIsFocusVisible,
};

const templateSelectInputItemContainer = style({
  flexShrink: 0,

  position: "static",

  display: "flex",
  flexDirection: "row",

  scrollSnapAlign: "start",

  marginInlineEnd: calc.multiply(spaceAround, -1),

  selectors: {
    "&:before": {
      flexGrow: 0,
      flexShrink: 0,

      content: "''",

      display: "block",

      width: spaceAround,

      height: theme.sizes.full,

      position: "relative",
      zIndex: 0,
    },
  },
});

const templateSelectInputItemSlide = style({
  ...mixins.accents.neutral,

  display: "flex",
  flexDirection: "column",

  position: "relative",

  zIndex: 1,

  flexShrink: 1,
  flexGrow: 0,

  width: theme.sizes.full,

  padding: calc.subtract(theme.space[2], theme.borderWidths.border),

  borderWidth: theme.borderWidths.border,
  borderColor: theme.colors.accent[7],
  borderStyle: "solid",

  borderRadius: theme.radii[0.5],

  backgroundColor: theme.colors.accent[3],

  cursor: "pointer",

  selectors: {
    [`&:is(${templateSelectInputItemIsHovered},  ${templateSelectInputItemIsSelected})`]:
      {
        borderColor: theme.colors.accent[8],
      },

    [`&:is(${templateSelectInputItemIsFocused})`]: {
      borderColor: theme.colors.accent[9],
    },

    [`&:is(${templateSelectInputItemIsSelected})`]: {
      backgroundColor: theme.colors.accent[5],
    },

    [`&:is(${templateSelectInputItemIsFocusVisible}):before`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

const templateSelectInputItemInput = style(mixins.visuallyHidden);

const templateSelectInputItemContent = style({
  display: "flex",

  flexDirection: "column",
});

const templateSelectInputItemIndicator = style({
  visibility: "hidden",

  position: "absolute",
  insetBlockStart: theme.space[3],
  insetInlineEnd: theme.space[3],

  display: "flex",

  borderColor: theme.colors.accent[10],
  borderRadius: theme.radii[0.5],
  borderWidth: "0px",
  borderStyle: "solid",

  color: theme.colors.accent[1],

  backgroundColor: theme.colors.accent[9],

  selectors: {
    "&:before": {
      content: "''",

      position: "absolute",
      inset: theme.space[0],

      display: "block",

      borderWidth: theme.borderWidths.border,
      borderColor: "inherit",
      borderStyle: "solid",
      borderRadius: "inherit",
    },

    [`:is(${templateSelectInputItemIsSelected}) &`]: {
      ...mixins.accents.selection,

      visibility: "visible",
    },
  },
});

export const templateSelectInputItem = {
  container: templateSelectInputItemContainer,
  slide: templateSelectInputItemSlide,
  input: templateSelectInputItemInput,
  content: templateSelectInputItemContent,
  indicator: templateSelectInputItemIndicator,

  states: templateSelectInputItemStates,
};
