import { useIsDragging } from "~/hooks/useIsDragging";
import { useGlobalListeners } from "@react-aria/utils";
import { assignVars } from "@vanilla-extract/css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import classNames from "classnames";
import * as React from "react";
import type { AriaRadioProps } from "react-aria";
import {
  mergeProps,
  useFocusRing,
  useHover,
  useMove,
  useRadio,
} from "react-aria";
import type { RadioGroupState, SingleSelectListProps } from "react-stately";
import { Field } from "../Field";
import type { RangeButtonGroupContextValue } from "./RangeButtonGroup";
import {
  ElementTypeProvider,
  RangeButtonGroupContext,
} from "./RangeButtonGroup";
import {
  rangeButtonGroup,
  rangeButtonGroupRadio,
} from "./RangeButtonGroupInput.css";

export type RangeButtonGroupRadioProps = Omit<AriaRadioProps, "isDisabled"> & {
  /**
   * The value of the radio button, used when submitting an HTML form.
   */
  value: AriaRadioProps["value"];
  /**
   * Textual representation of the value
   *
   * @default value
   */
  children?: React.ReactNode;
  /**
   * State of the containing radio group
   */
  state: RadioGroupState;
};

/**
 * RangeButtonGroup renders a selectable option in a clickable range
 */
export function RangeButtonGroupRadio(props: RangeButtonGroupRadioProps) {
  const { value, children, state } = props;

  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useRadio(
    {
      ...props,
      children,
    },
    state,
    ref
  );

  return (
    <>
      <label
        data-key={value}
        className={classNames(rangeButtonGroupRadio.container, {
          [rangeButtonGroupRadio.states.isSelected]:
            value === state.selectedValue,
        })}
      >
        <input
          {...inputProps}
          className={rangeButtonGroupRadio.input}
          ref={ref}
        />
        {children}
      </label>
    </>
  );
}

export type RangeButtonGroupInputProps<T> = {
  /**
   * Item objects in the collection.
   */
  items?: SingleSelectListProps<T>["items"];
  /**
   * The contents of the collection.
   */
  children: SingleSelectListProps<T>["children"];
};

/**
 * RangeButtonGroups allow user to choose from a list (rate) of hierarchical data.
 */
export function RangeButtonGroupInput<T extends Record<string, unknown>>(
  props: RangeButtonGroupInputProps<T>
) {
  const { children, items } = props;

  const context = React.useContext(
    RangeButtonGroupContext
  ) as RangeButtonGroupContextValue<T>;

  const { setInputProps, listState, radioGroupState } = context.state;
  const { radioGroupProps } = context.props;
  const { rangeButtonGroupRef } = context.refs;

  React.useLayoutEffect(() => {
    setInputProps({
      items,
      children,
    });
  }, [items, children, setInputProps]);

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible, isFocused } = useFocusRing({
    within: true,
    isTextInput: true,
  });

  const { addGlobalListener, removeGlobalListener } = useGlobalListeners();

  const startPosition = React.useRef<null | number>(null);
  const currentPointerId = React.useRef<number | undefined>(undefined);

  const onUpTrack = React.useCallback(
    (event: UIEvent) => {
      // Check if the pointerId matches the pointer which started the drag
      if (
        event instanceof PointerEvent &&
        currentPointerId.current !== event.pointerId
      ) {
        return;
      }

      if (
        event instanceof TouchEvent &&
        currentPointerId.current !== event.changedTouches[0].identifier
      ) {
        return;
      }

      if (
        event instanceof MouseEvent &&
        currentPointerId.current !== undefined
      ) {
        return;
      }

      currentPointerId.current = undefined;

      // Detach all the global listeners
      removeGlobalListener(window, "mouseup", onUpTrack, false);
      removeGlobalListener(window, "touchend", onUpTrack, false);
      removeGlobalListener(window, "pointerup", onUpTrack, false);
    },
    [removeGlobalListener]
  );

  const onDownTrack = React.useCallback(
    (event: React.UIEvent, pointerId: number | undefined, clientX: number) => {
      startPosition.current = clientX;
      currentPointerId.current = pointerId;

      event.preventDefault();

      addGlobalListener(window, "mouseup", onUpTrack, false);
      addGlobalListener(window, "touchend", onUpTrack, false);
      addGlobalListener(window, "pointerup", onUpTrack, false);
    },
    [addGlobalListener, onUpTrack]
  );

  const dragProps = {
    onMouseDown: (e: React.MouseEvent) => {
      if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }

      onDownTrack(e, undefined, e.clientX);
    },
    onPointerDown: (e: React.PointerEvent) => {
      if (
        e.pointerType === "mouse" &&
        (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey)
      ) {
        return;
      }

      onDownTrack(e, e.pointerId, e.clientX);
    },
    onTouchStart: (e: React.TouchEvent) => {
      onDownTrack(
        e,
        e.changedTouches[0].identifier,
        e.changedTouches[0].clientX
      );
    },
  };

  const [isDragging, setIsDragging] = React.useState(false);

  const findMatchingOption = (x: number) => {
    if (!rangeButtonGroupRef.current) {
      return;
    }

    // Get all options in the rangeButtonGroup
    const options = rangeButtonGroupRef.current.querySelectorAll(
      `.${rangeButtonGroupRadio.container}`
    );

    for (const option of options) {
      const { left: optionLeft, width: optionWidth } =
        option.getBoundingClientRect();

      const start = Math.floor(optionLeft);
      const end = Math.ceil(optionLeft + optionWidth);

      // If the pointer is within the boundaries of the option, select it
      if (start <= x && x <= end) {
        const key = (option as HTMLLabelElement).dataset.key;

        if (key) {
          return key;
        }
      }
    }
  };

  const { moveProps } = useMove({
    onMoveStart(e) {
      if (e.pointerType !== "keyboard") {
        setIsDragging(true);
      }
    },
    onMove: (e) => {
      if (e.pointerType !== "keyboard" && startPosition.current != null) {
        startPosition.current += e.deltaX;

        const matchedOption = findMatchingOption(startPosition.current);

        if (matchedOption) {
          radioGroupState.setSelectedValue(matchedOption);
        }
      }
    },
    onMoveEnd() {
      setIsDragging(false);
    },
  });

  // Sets the dragging cursor
  useIsDragging(isDragging);

  return (
    <ElementTypeProvider type="input">
      <Field.Input>
        <div
          {...mergeProps(
            radioGroupProps,
            focusProps,
            hoverProps,
            dragProps,
            moveProps
          )}
          className={classNames(rangeButtonGroup.container, {
            [rangeButtonGroup.states.isFocusVisible]: isFocusVisible,
            [rangeButtonGroup.states.isHovered]: isHovered,
            [rangeButtonGroup.states.isFocused]: isFocused,
            [rangeButtonGroup.states.isEmpty]:
              radioGroupState.selectedValue == null,
          })}
          ref={rangeButtonGroupRef}
          style={assignInlineVars(
            assignVars(rangeButtonGroup.vars, {
              totalCount: String(listState.collection.size),
              selectedIndex: String(listState.selectedItem?.index ?? 0),
            })
          )}
        >
          <div className={rangeButtonGroup.underlay} />

          <div className={rangeButtonGroup.items}>
            {Array.from(listState.collection).map((item) => (
              <RangeButtonGroupRadio
                value={String(item.key)}
                key={item.key}
                state={radioGroupState}
              >
                {item.rendered}
              </RangeButtonGroupRadio>
            ))}
          </div>
        </div>
      </Field.Input>
    </ElementTypeProvider>
  );
}
