import { Field } from "~/components/Field";
import { InputGroup } from "~/components/InputGroup";
import { ListBox } from "~/components/ListBox";
import { Popover } from "~/components/Popover";
import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import { IconChevronBlockEnd } from "~/icons/IconChevronBlockEnd";
import * as React from "react";
import type { AriaSelectProps } from "react-aria";
import { FocusScope, useButton } from "react-aria";
import { Tray } from "../Tray";
import type { PickerContextValue } from "./Picker";
import { PickerContext, ElementTypeProvider } from "./Picker";
import { pickerSelect } from "./PickerSelect.css";

export type PickerSelectProps<T extends Record<string, unknown>> = Pick<
  AriaSelectProps<T>,
  "items" | "children"
>;

/**
 * PickerSelect is a component which is used to render the provided items
 * of the picker, it will also fill the state of the Picker component.
 */
export function PickerSelect<T extends Record<string, unknown>>(
  props: PickerSelectProps<T>
) {
  const { items, children } = props;

  const context = React.useContext(PickerContext) as PickerContextValue<T>;

  const { setSelectProps, selectState } = context.state;
  const { triggerProps, menuProps, valueProps, placeholderProps, states } =
    context.props;
  const { triggerRef, triggerButtonRef } = context.refs;

  React.useLayoutEffect(() => {
    setSelectProps({
      items,
      children,
    });
  }, [items, children, setSelectProps]);

  const selectedItem = selectState?.selectedItem;

  const { buttonProps, isPressed } = useButton(
    { ...triggerProps, elementType: "div" },
    triggerRef
  );

  const isPopover = useMediaQuery(breakpoints.medium);

  // Manage the width of the popover, this makes the popover always be as
  // wide as the input
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  const onResize = React.useCallback(() => {
    if (isPopover && triggerRef.current) {
      const width = triggerRef.current.offsetWidth;
      setTriggerWidth(width);
    }
  }, [triggerRef, setTriggerWidth, isPopover]);

  useResizeObserver({
    ref: triggerRef,
    onResize: onResize,
  });

  let overlay;

  if (selectState.isOpen) {
    const contents = (
      <FocusScope contain autoFocus restoreFocus>
        <ListBox
          {...menuProps}
          state={selectState}
          autoFocus={selectState.focusStrategy || true}
        />
      </FocusScope>
    );

    if (isPopover) {
      overlay = (
        <Popover.Provider
          value={{
            isOpen: selectState.isOpen,
            onOpenChange: selectState.setOpen,
          }}
        >
          <Popover
            triggerRef={triggerButtonRef}
            shouldUpdatePosition={true}
            placement="bottom end"
            arrowBoundaryOffset={28}
          >
            <div
              style={{ minWidth: `${triggerWidth}px` }}
              className={pickerSelect.popover}
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
            isOpen: selectState.isOpen,
            onOpenChange: selectState.setOpen,
          }}
        >
          <div className={pickerSelect.tray}>{contents}</div>
        </Tray.Provider>
      );
    }
  }

  return (
    <ElementTypeProvider type="select">
      <Field.Input>
        <InputGroup
          {...buttonProps}
          ref={triggerRef}
          states={{
            ...states,
            isPressed,
          }}
        >
          <InputGroup.Value>
            {selectedItem?.rendered ? (
              <div className={pickerSelect.value} {...valueProps}>
                {selectedItem.rendered}
              </div>
            ) : (
              <div className={pickerSelect.placeholder}>
                {placeholderProps.children}
              </div>
            )}
          </InputGroup.Value>
          <InputGroup.Addon ref={triggerButtonRef}>
            <IconChevronBlockEnd />
          </InputGroup.Addon>
        </InputGroup>
      </Field.Input>
      {overlay}
    </ElementTypeProvider>
  );
}
