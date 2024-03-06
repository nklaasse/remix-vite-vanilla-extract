import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const switchLabelContainer = style({
  ...mixins.typography.text,

  gridArea: "label",

  marginInlineEnd: theme.space[1],

  fontWeight: theme.fontWeights.medium,

  color: theme.colors.gray[12],

  overflow: "hidden",

  selectors: {
    // This is a hack to let the label fill up all the available space,
    // in the grid container, when it's added in the switch component.
    [`&:before`]: {
      content: '""',

      display: "block",

      height: theme.borderWidths.border,

      width: "999999px",

      marginInlineStart: calc.negate(theme.borderWidths.border),
    },
  },
});

export const switchLabel = {
  container: switchLabelContainer,
};
