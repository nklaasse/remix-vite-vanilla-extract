import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { mixins, theme } from "~/css";

const treeNodeIsSelected = style({});
const treeNodeIsExpanded = style({});
const treeNodeIsPressed = style({});
const treeNodeIsHovered = style({});
const treeNodeIsFocused = style({});

const treeNodeStates = {
  isSelected: treeNodeIsSelected,
  isExpanded: treeNodeIsExpanded,
  isPressed: treeNodeIsPressed,
  isHovered: treeNodeIsHovered,
  isFocused: treeNodeIsFocused,
};

const treeNodeContainer = style({
  position: "relative",

  color: theme.colors.accent[11],

  outline: "none",

  paddingBlock: theme.space[0.5],

  selectors: {
    "& &": {
      paddingInlineStart: calc.subtract(theme.space[2.5]),
    },

    "& &:before": {
      content: "''",

      position: "absolute",
      insetInlineStart: theme.space[0],
      insetBlock: theme.space[0],

      width: theme.borderWidths.delimiter,

      borderRadius: theme.radii.circle,
    },

    [`&:is(${treeNodeIsSelected}):before`]: {
      background: theme.colors.accent[6],
    },

    [`&:is(${treeNodeIsHovered}, ${treeNodeIsFocused}):before`]: {
      background: theme.colors.accent[8],
    },

    [`&:is(${treeNodeIsSelected})`]: {
      ...mixins.accents.brand,
    },
  },
});

const treeNodeLink = style({
  ...mixins.typography.text,

  color: "inherit",

  textDecoration: "none",

  selectors: {
    [`:is(${treeNodeIsHovered}, ${treeNodeIsFocused}) > &`]: {
      textDecoration: "underline",
    },

    [`:is(${treeNodeIsPressed}) > &`]: {
      textDecoration: "double underline",
    },
  },
});

const treeNodeIndicator = style({
  float: "right",

  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  height: calc.multiply(
    mixins.typography.text.fontSize,
    mixins.typography.text.lineHeight
  ),
  width: calc.multiply(
    mixins.typography.text.fontSize,
    mixins.typography.text.lineHeight
  ),
});

export const treeNode = {
  container: treeNodeContainer,
  link: treeNodeLink,
  indicator: treeNodeIndicator,

  states: treeNodeStates,
};

const treeBranchIsExpanded = style({});

const treeBranchStates = {
  isExpanded: treeBranchIsExpanded,
};

const treeBranchContainer = style({
  ...mixins.accents.neutral,

  listStyle: "none",
  padding: theme.space[0],
  margin: theme.space[0],

  position: "relative",

  selectors: {
    [`${treeNodeContainer} > &`]: {
      ...mixins.typography.text,

      display: "none",

      color: theme.colors.gray[11],

      marginBlockStart: theme.space[1],
    },

    [`${treeNodeContainer}:is(${treeNodeIsExpanded}) > &`]: {
      display: "block",
    },

    [`${treeNodeContainer}:is(${treeNodeIsExpanded}) > &:before`]: {
      content: "''",
      position: "absolute",
      insetBlock: theme.space[0],
      insetInlineStart: theme.space[0],

      width: theme.borderWidths.delimiter,

      background: theme.colors.gray[6],

      borderRadius: theme.radii.circle,
    },
  },
});

export const treeBranch = {
  container: treeBranchContainer,

  states: treeBranchStates,
};

const toggleIsHovered = style({});
const toggleIsFocused = style({});
const toggleIsPressed = style({});
const toggleIsSelected = style({});

const toggleStates = {
  isHovered: toggleIsHovered,
  isFocused: toggleIsFocused,
  isPressed: toggleIsPressed,
  isSelected: toggleIsSelected,
};

const toggleContainer = style({
  ...mixins.typography.text,

  flexShrink: 0,
  flexGrow: 0,

  float: "right",

  position: "relative",

  display: "inline-flex",

  padding: theme.space[0.5],

  color: theme.colors.accent[11],

  background: "transparent",
  border: "none",

  borderRadius: theme.radii[0.5],

  cursor: "pointer",

  outline: "none",

  isolation: "isolate",

  boxSizing: "content-box",

  selectors: {
    "&:after, &:before": {
      content: "''",

      position: "absolute",

      zIndex: -1,

      inset: theme.borderWidths.delimiter,

      borderRadius: "inherit",
    },

    [`&:is(${toggleIsHovered}, ${toggleIsFocused}):before`]: {
      backgroundColor: theme.colors.accent[4],
    },

    [`&:is(${toggleIsPressed}):before`]: {
      backgroundColor: theme.colors.accent[5],
    },
  },
});

const toggleIcon = style({
  display: "flex",

  width: theme.sizes.icon,
  height: theme.sizes.icon,

  transition: "transform 0.3s ease-in-out",

  selectors: {
    [`:is(${toggleIsSelected}) &`]: {
      transform: "rotate(-180deg)",
    },
  },
});

export const toggle = {
  container: toggleContainer,
  icon: toggleIcon,

  states: toggleStates,
};
