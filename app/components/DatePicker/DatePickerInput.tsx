import {
  createCalendar,
  endOfYear,
  getLocalTimeZone,
  getWeeksInMonth,
  now,
  startOfYear,
} from "@internationalized/date";
import { Field } from "~/components/Field";
import { InputGroup } from "~/components/InputGroup";
import { ListBox } from "~/components/ListBox";
import { Popover } from "~/components/Popover";
import { Tray } from "~/components/Tray";
import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import { IconArrowInlineEnd } from "~/icons/IconArrowInlineEnd";
import { IconArrowInlineStart } from "~/icons/IconArrowInlineStart";
import { IconCalendar } from "~/icons/IconCalendar";
import { IconChevronBlockEnd } from "~/icons/IconChevronBlockEnd";
import { IconChevronInlineEnd } from "~/icons/IconChevronInlineEnd";
import { mergeRefs } from "~/utils/mergeRefs";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import classNames from "classnames";
import * as React from "react";
import type {
  AriaButtonProps,
  AriaCalendarCellProps,
  AriaCalendarGridProps,
  DateValue,
} from "react-aria";
import {
  FocusScope,
  mergeProps,
  useButton,
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useDateField,
  useDateSegment,
  useFocusRing,
  useHover,
  useId,
  useLocale,
} from "react-aria";
import type {
  CalendarState,
  DateFieldState,
  DateSegment as DateSegmentType,
  Selection,
} from "react-stately";
import {
  useCalendarState,
  useDateFieldState,
  useListData,
  useListState,
} from "react-stately";
import { Button } from "../Button";
import { DatePickerContext } from "./DatePicker";
import {
  calendar,
  calendarGrid,
  calendarGridTableCell,
  dateField,
  datePickerInput,
  dateSegmentsPicker,
  editableSegment,
  literalSegment,
  viewToggle,
} from "./DatePickerInput.css";

type CalendarTableCellProps = AriaCalendarCellProps & {
  state: CalendarState;
};

type DateSegmentPickerProps = {
  segment: DateSegmentType;
  state: DateFieldState;
};

function DateSegmentPicker(props: DateSegmentPickerProps) {
  const context = React.useContext(DatePickerContext);

  const { locale, maxValue, minValue } = context.props;

  const { segment, state } = props;

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
    defaultSelectedKeys: state.value !== null ? [String(segment.value)] : [],
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
  }, [autoFocusInitialKey]);

  return <ListBox state={listState} />;
}

/**
 * UI which is used when the granularity of the datepicker is month or year
 */
function DateSegmentsPicker() {
  const context = React.useContext(DatePickerContext);

  const { locale } = useLocale();

  const { fieldProps: datePickerFieldProps } = context.props;

  const state = useDateFieldState({
    ...datePickerFieldProps,
    locale,
    createCalendar,
  });

  return (
    <div className={dateSegmentsPicker.container}>
      {state.segments
        .filter((segment) => segment.type !== "literal")
        .map((segment) => (
          <DateSegmentPicker
            segment={segment}
            state={state}
            key={segment.type}
          />
        ))}
    </div>
  );
}

function CalendarTableCell(props: CalendarTableCellProps) {
  const { state, date } = props;

  const ref = React.useRef<HTMLButtonElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    formattedDate,
    isPressed,
    isOutsideVisibleRange,
    isDisabled,
  } = useCalendarCell({ date }, state, ref);

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({
    within: true,
  });

  return (
    <td
      {...mergeProps(cellProps, focusProps)}
      className={classNames(calendarGridTableCell.container, {
        [calendarGridTableCell.states.isSelected]: isSelected,
        [calendarGridTableCell.states.isFocused]: isFocused,
        [calendarGridTableCell.states.isPressed]: isPressed,
        [calendarGridTableCell.states.isHovered]: isHovered,
        [calendarGridTableCell.states.isFocusVisible]: isFocusVisible,
        [calendarGridTableCell.states.isDisabled]: isDisabled,
      })}
    >
      <button
        {...mergeProps(buttonProps, hoverProps, focusProps)}
        ref={ref}
        className={calendarGridTableCell.content}
        hidden={isOutsideVisibleRange}
      >
        {formattedDate}
      </button>
    </td>
  );
}

type CalendarGridProps = AriaCalendarGridProps & {
  state: CalendarState;
  locale: string;
};

function DatePickerCalendarGrid(props: CalendarGridProps) {
  const { state, locale } = props;

  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} className={calendarGrid.container}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, i) => (
            <th key={i} className={calendarGrid.tableHead}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(weeksInMonth)).map((_, weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarTableCell
                    key={date.toString()}
                    state={state}
                    date={date}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type DatePickerViewToggleProps = AriaButtonProps & {
  isExpanded: boolean;
};

const DatePickerViewToggle = React.forwardRef(function DatePickerViewToggle(
  props: DatePickerViewToggleProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { isExpanded, children } = props;

  const defaultButtonRef = React.useRef<HTMLButtonElement>(null);

  const { buttonProps } = useButton(
    {
      "aria-expanded": isExpanded,
      ...props,
    },
    defaultButtonRef
  );

  const buttonRef = mergeRefs(defaultButtonRef, ref);

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing({});

  return (
    <button
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      className={classNames(viewToggle.container, {
        [viewToggle.states.isHovered]: isHovered,
        [viewToggle.states.isFocusVisible]: isFocusVisible,
        [viewToggle.states.isExpanded]: isExpanded,
      })}
      ref={buttonRef}
    >
      {children}

      <div className={viewToggle.indicatorExpanded}>
        <IconChevronBlockEnd />
      </div>
      <div className={viewToggle.indicatorCollapsed}>
        <IconChevronInlineEnd />
      </div>
    </button>
  );
});

/**
 * @private
 *
 * UI which is rendered when the granularity of the date field is "day".
 */
function DatePickerCalendar() {
  const context = React.useContext(DatePickerContext);

  const { locale } = useLocale();

  const {
    minValue,
    maxValue,
    calendarProps: contextCalendarProps,
  } = context.props;

  const [view, setView] =
    React.useState<keyof typeof calendar.variants.view>("day");

  const state = useCalendarState({
    ...contextCalendarProps,
    maxValue,
    minValue,
    locale,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(
      {
        ...contextCalendarProps,
        maxValue,
        minValue,
      },
      state
    );

  const list = useListData({
    initialItems: React.useMemo(() => {
      const minYear = minValue ? minValue.year : 1901;
      const maxYear = maxValue ? maxValue.year : 2155;

      const timezone = getLocalTimeZone();

      const base = now(timezone);

      const formatter = new Intl.DateTimeFormat([locale], {
        "year": "numeric",
      });

      return Array.from({
        // Minus one is necessary do to index starting at zero
        length: maxYear - (minYear - 1),
      })
        .map((_, i) => {
          const value = minYear + i;

          const label = formatter.format(base.set({ "year": value }).toDate());

          return {
            key: value,
            label,
          };
        })
        .reverse();
    }, [locale, minValue, maxValue]),
  });

  const handleSelectionChange = (keys: Selection) => {
    const key = Array.from(keys)[0];
    const year = Number(String(key));
    if (!year) {
      return;
    }
    if (state.focusedDate) {
      state.setFocusedDate(state.focusedDate.set({ year }));
    }

    setView("day");
  };

  const listState = useListState({
    items: list.items,
    children: (item) => (
      <ListBox.Item textValue={item.label} key={item.key}>
        <ListBox.Label>{item.label}</ListBox.Label>
      </ListBox.Item>
    ),
    selectionMode: "single",
    onSelectionChange: handleSelectionChange,
  });

  const buttonId = useId();
  const contentId = useId();

  const toggleRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div
      {...calendarProps}
      className={classNames(calendar.container, calendar.variants.view[view])}
    >
      <div className={calendar.navigation}>
        <DatePickerViewToggle
          id={buttonId}
          aria-controls={contentId}
          isExpanded={view === "month"}
          ref={toggleRef}
          onPress={() => {
            setView((prevView) => {
              switch (prevView) {
                case "day":
                  return "month";
                default:
                  return "day";
              }
            });
          }}
        >
          {title}
        </DatePickerViewToggle>

        <div className={calendar.pagination}>
          <Button
            {...prevButtonProps}
            variant="tertiary"
            size="compact"
            isDisabled={view === "month"}
          >
            <Button.Icon>
              <IconArrowInlineStart />
            </Button.Icon>
          </Button>
          <Button
            {...nextButtonProps}
            variant="tertiary"
            size="compact"
            isDisabled={view === "month"}
          >
            <Button.Icon>
              <IconArrowInlineEnd />
            </Button.Icon>
          </Button>
        </div>
      </div>

      <div className={calendar.content}>
        {view === "day" ? (
          <DatePickerCalendarGrid state={state} locale={locale} />
        ) : (
          <ListBox
            selectionMode="single"
            shouldSelectOnPressUp={true}
            state={listState}
            aria-labelledby={buttonId}
            id={contentId}
          />
        )}
      </div>
    </div>
  );
}

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
      <span aria-hidden="true" className={editableSegment.placeholder}>
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

function DateField() {
  const context = React.useContext(DatePickerContext);

  const { fieldProps: datePickerFieldProps, locale } = context.props;
  const { fieldRef } = context.refs;

  const dateFieldState = useDateFieldState({
    ...datePickerFieldProps,
    locale,
    createCalendar,
  });

  const { fieldProps } = useDateField(
    datePickerFieldProps,
    dateFieldState,
    fieldRef
  );

  return (
    <InputGroup.Value
      {...fieldProps}
      ref={fieldRef}
      lang={locale}
      data-script={new Intl.Locale(locale).maximize().script}
    >
      <span className={dateField.dateSegments}>
        {dateFieldState.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={dateFieldState} />
        ))}
      </span>
    </InputGroup.Value>
  );
}

export function DatePickerInput() {
  const context = React.useContext(DatePickerContext);

  const { datePickerState } = context.state;
  const { groupProps, buttonProps, dialogProps } = context.props;
  const { datePickerRef } = context.refs;

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const isPopover = useMediaQuery(breakpoints.medium);

  const [datePickerWidth, setDatePickerWidth] = React.useState<number | null>(
    null
  );

  const onResize = React.useCallback(() => {
    if (isPopover && datePickerRef.current) {
      const width = datePickerRef.current.offsetWidth;
      setDatePickerWidth(width);
    }
  }, [datePickerRef, setDatePickerWidth, isPopover]);

  useResizeObserver({
    ref: datePickerRef,
    onResize: onResize,
  });

  let overlay;

  const content = (
    <FocusScope restoreFocus>
      {datePickerState.granularity == "day" ? (
        <DatePickerCalendar />
      ) : (
        <FocusScope autoFocus restoreFocus>
          <DateSegmentsPicker />
        </FocusScope>
      )}
    </FocusScope>
  );

  if (datePickerState.isOpen) {
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
              style={{ width: `${datePickerWidth}px` }}
              className={datePickerInput.popover}
            >
              {content}
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
            <div {...dialogProps} className={datePickerInput.tray}>
              {content}
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
          {...groupProps}
          ref={datePickerRef}
          states={{
            isExpanded: datePickerState.isOpen,
          }}
        >
          <DateField />
          <InputGroup.Button {...buttonProps} ref={triggerRef}>
            <IconCalendar />
          </InputGroup.Button>
        </InputGroup>
      </Field.Input>
      {overlay}
    </>
  );
}
