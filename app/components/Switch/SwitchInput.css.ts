import { mixins, modes, theme } from "~/css";
import { style, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";
import { _switch } from "./Switch.css";

const switchInputStates = styleVariants({
  isHovered: {},
});

const switchInputContainer = style({
  gridArea: "input",

  position: "relative",

  flexGrow: 0,
  flexShrink: 0,

  display: "flex",
  alignItems: "stretch",
  justifyContent: "flex-start",

  cursor: "pointer",

  height: calc.subtract(theme.sizes[3.5]),
  width: calc.subtract(calc.multiply(theme.sizes[3.5], 2), theme.space[1]),

  borderRadius: theme.radii.circle,

  background: theme.colors.accent[4],

  boxSizing: "content-box",

  selectors: {
    [`:is(${_switch.states.isSelected}) &`]: {
      ...mixins.accents.brand,

      justifyContent: "flex-end",

      background: theme.colors.accent[9],

      borderColor: theme.colors.accent[7],
    },

    [`${_switch.container}:is(${_switch.states.isSelected}):is(${_switch.states.isFocused}) &`]:
      {
        borderColor: theme.colors.accent[8],
      },

    [`${_switch.container}:is(${_switch.states.isSelected}) &:is(${switchInputStates.isHovered})`]:
      {
        borderColor: theme.colors.accent[8],
      },

    [`:is(${_switch.states.isFocusVisible}) &:after`]: {
      content: "''",

      position: "absolute",
      inset: calc.multiply(theme.borderWidths.border, -1),

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${theme.borderWidths.delimiter} ${theme.colors.accent[7]}`,
    },
  },
});

const switchInputIndicator = style({
  position: "relative",

  padding: calc.subtract(theme.space[0.5], theme.borderWidths.delimiter),

  borderWidth: theme.borderWidths.delimiter,
  borderStyle: "solid",
  borderColor: theme.colors.accent[9],
  borderRadius: theme.radii.circle,

  background: theme.colors.accent[1],
  color: theme.colors.accent[1],

  boxSizing: "border-box",

  selectors: {
    [`:is(${_switch.states.isSelected}) &`]: {
      borderColor: theme.colors.accent[11],
      color: theme.colors.accent[11],
    },

    [`${modes.dark} &`]: {
      backgroundColor: theme.colors.accent[7],
      color: theme.colors.accent[7],
    },

    [`${modes.dark} :is(${_switch.states.isSelected}) &`]: {
      backgroundColor: theme.colors.accent[12],
      color: theme.colors.accent[9],
      borderColor: theme.colors.accent[9],
    },
  },
});

export const switchInput = {
  container: switchInputContainer,
  indicator: switchInputIndicator,

  states: switchInputStates,
};
