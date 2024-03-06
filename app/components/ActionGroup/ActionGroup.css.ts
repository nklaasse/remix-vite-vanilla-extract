import { theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const actionGroupVariantAlign = styleVariants({
  start: {},
  center: {},
  end: {},
});

const actionGroupVariants = {
  align: actionGroupVariantAlign,
};

const actionGroupStates = styleVariants({
  isCollapsed: {},
});

const actionGroupContainer = style({
  display: "flex",

  flexDirection: "row",

  width: theme.sizes.full,

  selectors: {
    [`&:is(${actionGroupVariantAlign.start})`]: {
      justifyContent: "flex-start",
    },

    [`&:is(${actionGroupVariantAlign.center})`]: {
      justifyContent: "center",
    },

    [`&:is(${actionGroupVariantAlign.end})`]: {
      justifyContent: "flex-end",
    },
  },
});

const actionGroupItems = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",

  margin: calc.negate(theme.space[0.5]),

  overflowX: "hidden",
});

const actionGroupItem = style({
  display: "flex",

  padding: theme.space[0.5],
});

const actionGroupMenu = style([
  actionGroupItem,
  {
    display: "none",

    flexGrow: 0,
    flexShrink: 0,

    marginBlock: calc.negate(theme.space[0.5]),

    marginInlineEnd: calc.negate(theme.space[0.5]),
    marginInlineStart: theme.space[0.5],

    selectors: {
      [`${actionGroupStates.isCollapsed} &`]: {
        display: "flex",
      },
    },
  },
]);

export const actionGroup = {
  container: actionGroupContainer,
  items: actionGroupItems,
  item: actionGroupItem,
  menu: actionGroupMenu,

  states: actionGroupStates,

  variants: actionGroupVariants,
};
