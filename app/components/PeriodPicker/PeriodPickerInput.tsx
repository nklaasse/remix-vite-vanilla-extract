import {
  createCalendar,
  endOfYear,
  getLocalTimeZone,
  now,
  startOfYear,
} from "@internationalized/date";
import { Field } from "~/components/Field";
import { ListBox } from "~/components/ListBox";
import { Popover } from "~/components/Popover";
import { Switch } from "~/components/Switch";
import { Tray } from "~/components/Tray";
import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import { IconCalendar } from "~/icons/IconCalendar";
import { useIntl } from "react-intl";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import classNames from "classnames";
import * as React from "react";
import type { AriaDateFieldProps, DateValue } from "react-aria";
import {
  mergeProps,
  useDateField,
  useDateSegment,
  useFocusRing,
  useHover,
  useLocale,
} from "react-aria";
import type {
  DateFieldState,
  DateSegment as DateSegmentType,
} from "react-stately";
import { useDateFieldState, useListState } from "react-stately";
import { InputGroup } from "../InputGroup";
import { TextField } from "../TextField";
import {
  PeriodPickerDateBaseContext,
  useElementType,
} from "./_PeriodPickerDateBase";
import {
  dateField,
  editableSegment,
  literalSegment,
  periodPickerInput,
  segmentPickers,
} from "./PeriodPickerInput.css";

type LiteralSegmentProps = {
  segment: DateSegmentType;
};

function LiteralSegment(props: LiteralSegmentProps) {
  const { segment } = props;

  return (
    <span aria-hidden="true" className={literalSegment.container}>
      {segment.text}
    </span>
  );
}

type EditableSegmentProps = {
  segment: DateSegmentType;
  state: DateFieldState;
};

function EditableSegment(props: EditableSegmentProps) {
  const { segment, state } = props;

  const ref = React.useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  const { focusProps, isFocused } = useFocusRing({
    within: true,
  });

  const { hoverProps, isHovered } = useHover({});

  return (
    <div
      {...mergeProps(segmentProps, hoverProps, focusProps)}
      ref={ref}
      className={classNames(editableSegment.container, {
        [editableSegment.variants.isPlaceholder]: segment.isPlaceholder,
        [editableSegment.states.isFocused]: isFocused,
        [editableSegment.states.isHovered]: isHovered,
      })}
      style={assignInlineVars(editableSegment.vars, {
        charCount: String(String(segment.maxValue).length || 0),
      })}
    >
      <span aria-hidden className={editableSegment.placeholder}>
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
}

type DateSegmentProps = {
  segment: DateSegmentType;
  state: DateFieldState;
};

function DateSegment(props: DateSegmentProps) {
  const { segment } = props;

  switch (segment.type) {
    case "literal":
      return <LiteralSegment segment={segment} />;
    default:
      return <EditableSegment {...props} />;
  }
}

type DateFieldProps = AriaDateFieldProps<DateValue> & { locale: string } & {
  state: DateFieldState;
};

function DateField(props: DateFieldProps) {
  const { state, locale, ...otherProps } = props;

  const context = React.useContext(PeriodPickerDateBaseContext);

  const { fieldRef } = context.refs;

  const { fieldProps } = useDateField(otherProps, state, fieldRef);

  return (
    <InputGroup.Value ref={fieldRef} {...fieldProps} lang={locale}>
      <span className={dateField.dateSegments}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </span>
    </InputGroup.Value>
  );
}

type SegmentPickerProps = {
  segment: DateSegmentType;
  state: DateFieldState;
  maxValue?: DateValue;
  minValue?: DateValue;
};

function SegmentPicker(props: SegmentPickerProps) {
  const { segment, maxValue, minValue, state } = props;

  const { locale } = useLocale();

  let minSegmentValue = 0;
  let maxSegmentValue = 0;

  let value: DateValue = state.value;

  if (!value) {
    value = now(getLocalTimeZone());
  }

  if (minValue) {
    if (segment.type === "year") {
      minSegmentValue = minValue.year;
    } else if (segment.type === "month") {
      minSegmentValue = startOfYear(value).month;
    }
  } else if (segment.minValue) {
    minSegmentValue = segment.minValue;
  }

  if (maxValue) {
    if (segment.type === "year") {
      maxSegmentValue = maxValue.year;
    } else if (segment.type === "month") {
      maxSegmentValue = endOfYear(value).month;
    }
  } else if (segment.maxValue) {
    maxSegmentValue = segment.maxValue;
  }

  const listState = useListState({
    children: (item) => (
      <ListBox.Item key={item.key} textValue={item.label}>
        <ListBox.Label>{item.label}</ListBox.Label>
      </ListBox.Item>
    ),

    items: React.useMemo(() => {
      const formatter = new Intl.DateTimeFormat([locale], {
        [segment.type]: segment.type === "year" ? "numeric" : "long",
      });

      const items = Array.from({
        // Minus one is necessary do to zero index
        length: maxSegmentValue - (minSegmentValue - 1),
      }).map((_, i) => {
        const itemValue = minSegmentValue + i;

        const label = formatter.format(
          value
            .copy()
            .set({ [segment.type]: itemValue })
            .toDate(getLocalTimeZone())
        );

        return {
          key: itemValue,
          label,
        };
      });

      if (segment.type === "year") {
        return items.reverse();
      } else {
        return items;
      }
    }, [segment.type, locale, value, minSegmentValue, maxSegmentValue]),
    selectionMode: "single",
    defaultSelectedKeys: state.value != null ? [String(segment.value)] : [],
    disallowEmptySelection: true,

    onSelectionChange: (keys) => {
      const value = Array.from(keys).pop();
      state.setSegment(segment.type, Number(value));
    },
  });

  // If there is a key selected we should make it visible in the scroll container,
  // otherwise we should make the segment value (default key) visible.
  const autoFocusInitialKey = React.useRef(() => {
    if (listState.selectionManager.lastSelectedKey) {
      listState.selectionManager.setFocusedKey(
        listState.selectionManager.lastSelectedKey
      );
    } else {
      listState.selectionManager.setFocusedKey(String(segment.value));
    }
  });

  React.useEffect(() => {
    autoFocusInitialKey.current();
  }, [listState.selectionManager.lastSelectedKey]);

  return <ListBox state={listState} />;
}

type SegmentPickersProps = {
  state: DateFieldState;
  maxValue?: DateValue;
  minValue?: DateValue;
};

function SegmentPickers(props: SegmentPickersProps) {
  const { state, maxValue, minValue } = props;

  return (
    <div className={segmentPickers.container}>
      {state.segments
        .filter((segment) => segment.type !== "literal")
        .map((segment) => (
          <SegmentPicker
            state={state}
            segment={segment}
            maxValue={maxValue}
            minValue={minValue}
            key={segment.type}
          />
        ))}
    </div>
  );
}

/**
 * PeriodPickerDateBase is a component which handles a single DateInput + Picker
 */
function PeriodPickerDateInput() {
  const intl = useIntl();
  const context = React.useContext(PeriodPickerDateBaseContext);

  const { datePickerState } = context.state;
  const { fieldProps, buttonProps, dialogProps, locale, granularityProps } =
    context.props;

  const periodPickerDateInputRef = React.useRef<HTMLDivElement>(null!);

  const triggerRef = React.useRef<HTMLButtonElement>(null!);

  const { maxValue, minValue } = fieldProps;

  const dateFieldState = useDateFieldState({
    ...fieldProps,
    createCalendar,
    maxValue,
    minValue,
    locale,
  });

  // Open close the popover or modal
  const isPopover = useMediaQuery(breakpoints.medium);

  // Watch Input size so we can update the popover size accordingly
  const [inputWidth, setInputWidth] = React.useState(0);

  const onResize = React.useCallback(() => {
    if (isPopover && periodPickerDateInputRef.current) {
      const width = periodPickerDateInputRef.current.offsetWidth;
      setInputWidth(width);
    }
  }, [periodPickerDateInputRef, setInputWidth, isPopover]);

  useResizeObserver({
    ref: periodPickerDateInputRef,
    onResize: onResize,
  });

  let overlay = null;

  if (datePickerState.isOpen) {
    const contents = (
      <div className={periodPickerInput.content}>
        <SegmentPickers
          state={dateFieldState}
          maxValue={maxValue}
          minValue={minValue}
        />
        {granularityProps?.onChange ? (
          <div className={periodPickerInput.granularity}>
            <Switch {...granularityProps}>
              <Switch.Label>
                {intl.formatMessage({
                  id: "components.periodPicker.dateRangeYearOnly",
                  description:
                    "Label for changing the granularity within the period picker",
                  defaultMessage: "Year only",
                })}
              </Switch.Label>
              <Switch.Input />
            </Switch>
          </div>
        ) : null}
      </div>
    );

    if (isPopover) {
      overlay = (
        <Popover.Provider
          value={{
            isOpen: datePickerState.isOpen,
            onOpenChange: datePickerState.setOpen,
          }}
        >
          <Popover
            triggerRef={triggerRef}
            placement="bottom end"
            arrowBoundaryOffset={28}
          >
            <div
              {...dialogProps}
              className={periodPickerInput.popover}
              style={{ minWidth: `${inputWidth}px` }}
            >
              {contents}
            </div>
          </Popover>
        </Popover.Provider>
      );
    } else {
      overlay = (
        <Tray.Provider
          value={{
            isOpen: datePickerState.isOpen,
            onOpenChange: datePickerState.setOpen,
          }}
        >
          <Tray>
            <div
              {...dialogProps}
              className={periodPickerInput.tray}
              style={{ minWidth: "100%" }}
            >
              {contents}
            </div>
          </Tray>
        </Tray.Provider>
      );
    }
  }

  return (
    <>
      <Field.Input>
        <InputGroup
          ref={periodPickerDateInputRef}
          states={{ isExpanded: datePickerState.isOpen }}
        >
          <DateField {...fieldProps} locale={locale} state={dateFieldState} />

          <InputGroup.Button {...buttonProps} ref={triggerRef}>
            <IconCalendar />
          </InputGroup.Button>
        </InputGroup>
      </Field.Input>

      {overlay}
    </>
  );
}

function PeriodPickerInputPresent() {
  return <TextField.Input />;
}

export function PeriodPickerInput() {
  const type = useElementType();

  switch (type) {
    case "date":
      return <PeriodPickerDateInput />;
    case "present":
      return <PeriodPickerInputPresent />;
  }
}
