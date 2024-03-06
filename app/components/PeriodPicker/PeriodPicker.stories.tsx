import { getLocalTimeZone, now, parseDate } from "@internationalized/date";
import { PeriodPicker } from "~/components/PeriodPicker";
import type { DateValue } from "@react-types/datepicker";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

export default {
  title: "Components/PeriodPicker",
  component: PeriodPicker,
} as Meta<typeof PeriodPicker>;

type Granularity = "month" | "year";

export const Default: StoryFn<typeof PeriodPicker> = () => {
  const [startDateGranularity, setStartDateGranularity] =
    React.useState<Granularity>("month");

  const [endDateGranularity, setEndDateGranularity] =
    React.useState<Granularity>("month");

  return (
    <PeriodPicker>
      <PeriodPicker.StartDate
        granularity={startDateGranularity}
        onGranularityChange={(granularity: Granularity) => {
          setStartDateGranularity(granularity);
        }}
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.Label>Start Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.StartDate>
      <PeriodPicker.EndDate
        granularity={endDateGranularity}
        onGranularityChange={(granularity: Granularity) => {
          setEndDateGranularity(granularity);
        }}
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.Label>End Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.EndDate>
    </PeriodPicker>
  );
};

export const Year: StoryFn<typeof PeriodPicker> = () => {
  return (
    <PeriodPicker>
      <PeriodPicker.StartDate
        granularity="year"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.Label>Start Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.StartDate>
      <PeriodPicker.EndDate
        granularity="year"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.Label>End Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.EndDate>
    </PeriodPicker>
  );
};

export const Month: StoryFn<typeof PeriodPicker> = () => {
  return (
    <PeriodPicker>
      <PeriodPicker.StartDate
        granularity="month"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.Label>Start Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.StartDate>
      <PeriodPicker.EndDate
        granularity="year"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.Label>End Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.EndDate>
    </PeriodPicker>
  );
};

export const Current: StoryFn<typeof PeriodPicker> = () => {
  const [isCurrentJob, setIsCurrentJob] = React.useState(false);

  return (
    <PeriodPicker>
      <PeriodPicker.StartDate
        granularity="month"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.Label>Start Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.StartDate>
      <PeriodPicker.EndDate
        granularity="year"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.Label>End Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.EndDate>

      <PeriodPicker.Current
        name="finished"
        label="It is my current job"
        value="currentJob"
        isSelected={isCurrentJob}
        onChange={() =>
          setIsCurrentJob((prevIsCurrentJob) => !prevIsCurrentJob)
        }
      />
    </PeriodPicker>
  );
};

export const Reset: StoryFn<typeof PeriodPicker> = () => {
  const [startDate, setStartDate] = React.useState<DateValue | null>(null);
  const [endDate, setEndDate] = React.useState<DateValue | null>(null);

  const [isCurrentJob, setIsCurrentJob] = React.useState(false);

  return (
    <PeriodPicker>
      <PeriodPicker.StartDate
        granularity="month"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
        value={startDate as DateValue}
        onChange={setStartDate}
      >
        <PeriodPicker.Reset
          onPress={() => {
            setStartDate(null);
          }}
        />
        <PeriodPicker.Label>Start Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.StartDate>
      <PeriodPicker.EndDate
        granularity="year"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
        value={endDate as DateValue}
        onChange={setEndDate}
      >
        <PeriodPicker.Reset
          onPress={() => {
            setEndDate(null);
          }}
        />
        <PeriodPicker.Label>End Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.EndDate>

      <PeriodPicker.Current
        name="finished"
        label="It is my current job"
        value="currentJob"
        isSelected={isCurrentJob}
        onChange={() =>
          setIsCurrentJob((prevIsCurrentJob) => !prevIsCurrentJob)
        }
      />
    </PeriodPicker>
  );
};

export const ContextualHelp: StoryFn<typeof PeriodPicker> = () => {
  return (
    <PeriodPicker>
      <PeriodPicker.StartDate
        granularity="month"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.ContextualHelp>
          Start date should be before end date
        </PeriodPicker.ContextualHelp>
        <PeriodPicker.Label>Start Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.StartDate>
      <PeriodPicker.EndDate
        granularity="year"
        minValue={parseDate("1901-01-01")}
        maxValue={now(getLocalTimeZone())}
      >
        <PeriodPicker.ContextualHelp>
          End date should be after start date
        </PeriodPicker.ContextualHelp>
        <PeriodPicker.Label>End Date</PeriodPicker.Label>
        <PeriodPicker.Input />
      </PeriodPicker.EndDate>
    </PeriodPicker>
  );
};
