import type { AriaDatePickerProps } from "@react-types/datepicker";
import * as React from "react";
import type { DateValue } from "react-aria";

export type PeriodPickerContextValue = {
  props: {
    endFieldProps: AriaDatePickerProps<DateValue>;
    startFieldProps: AriaDatePickerProps<DateValue>;
    locale: string;
  };
  state: {
    endDateIsCurrent: string | null;
    setEndDateIsCurrent: React.Dispatch<React.SetStateAction<string | null>>;
  };
};

export const PeriodPickerContext =
  React.createContext<PeriodPickerContextValue>(null!);
