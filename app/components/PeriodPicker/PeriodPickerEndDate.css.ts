import { style } from "@vanilla-extract/css";

const periodPickerEndDateContainer = style({
  gridArea: "endDate",
});

const periodPickerEndDateInfinite = style({});

export const periodPickerEndDate = {
  container: periodPickerEndDateContainer,

  infinite: periodPickerEndDateInfinite,
};
