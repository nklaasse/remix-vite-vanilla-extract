import { mixins, theme } from "~/css";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const periodPickerContainer = style({
  display: "grid",

  gridTemplate: `
    "startDate            delimiter         endDate       " auto
    ".                    .                 .             " ${theme.space[1]}
    "current              current           current       " auto
  /  minmax(0, 1fr)       ${theme.space[2]} minmax(0, 1fr)
  `,
});

const periodPickerDelimiter = style({
  gridArea: "delimiter",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: calc.add(
    theme.space[2],
    calc.multiply(
      mixins.typography.text.fontSize,
      mixins.typography.text.lineHeight
    ),
    theme.space[2]
  ),

  alignSelf: "flex-end",

  color: theme.colors.gray[11],
});

export const periodPicker = {
  container: periodPickerContainer,
  delimiter: periodPickerDelimiter,
};
