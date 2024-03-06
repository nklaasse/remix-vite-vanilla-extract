import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const disclosureSummaryIsExpanded = style({});
const disclosureSummaryIsHovered = style({});
const disclosureSummaryIsFocusVisible = style({});

const disclosureSummaryStates = {
  isExpanded: disclosureSummaryIsExpanded,
  isHovered: disclosureSummaryIsHovered,
  isFocusVisible: disclosureSummaryIsFocusVisible,
};

const disclosureSummaryContainer = style({
  ...mixins.typography.text,
  ...mixins.accents.brand,

  position: "relative",

  display: "flex",
  alignItems: "center",

  padding: theme.space[1],
  marginInline: calc.multiply(theme.space[1], -1),

  fontWeight: theme.fontWeights.semiBold,

  color: theme.colors.accent[11],

  borderRadius: theme.radii[0.5],

  background: "none",
  border: "none",

  outline: "none",

  cursor: "pointer",

  selectors: {
    [`&:is(${disclosureSummaryIsHovered})`]: {
      textDecoration: "underline",
    },

    [`&:is(${disclosureSummaryIsFocusVisible}):before`]: {
      content: "''",

      position: "absolute",
      inset: theme.space[0.5],

      display: "block",

      borderRadius: "inherit",

      boxShadow: `0 0 0 ${calc.add(theme.borderWidths.delimiter)} ${
        theme.colors.accent[7]
      }`,
    },
  },
});

const disclosureSummaryIndicator = style({
  marginInlineStart: theme.space[0.5],
});

const disclosureSummaryIndicatorExpanded = style([
  disclosureSummaryIndicator,
  {
    display: "none",

    selectors: {
      [`:is(${disclosureSummaryIsExpanded}) &`]: {
        display: "flex",
      },
    },
  },
]);

const disclosureSummaryIndicatorCollapsed = style([
  disclosureSummaryIndicator,
  {
    display: "flex",

    selectors: {
      [`:is(${disclosureSummaryIsExpanded}) &`]: {
        display: "none",
      },
    },
  },
]);

export const disclosureSummary = {
  container: disclosureSummaryContainer,
  indicatorExpanded: disclosureSummaryIndicatorExpanded,
  indicatorCollapsed: disclosureSummaryIndicatorCollapsed,

  states: disclosureSummaryStates,
};
