import { Field } from "~/components/Field";
import { InputGroup } from "~/components/InputGroup";
import { ListBox } from "~/components/ListBox";
import { Popover } from "~/components/Popover";
import { TextField } from "~/components/TextField";
import { Tray } from "~/components/Tray";
import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import { IconChevronBlockEnd } from "~/icons/IconChevronBlockEnd";
import * as React from "react";
import type { AriaComboBoxProps } from "react-aria";
import { useDialog, useId } from "react-aria";
import { useOverlayTrigger } from "react-aria";
import { mergeProps, useButton } from "react-aria";
import { FocusScope } from "react-aria";
import type { ComboboxContextValue } from "./ComboBox";
import {
  ComboBoxContext,
  ElementTypeProvider,
  useElementType,
} from "./ComboBox";
import { defaultComboBox, mobileComboBox } from "./ComboBoxSelect.css";

function DefaultCombobox() {
  const context = React.useContext(ComboBoxContext);

  const { comboboxState } = context.state;
  const { inputProps, buttonProps, listBoxProps } = context.props;
  const { inputRef, buttonRef, listBoxRef } = context.refs;

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = React.useState(0);

  const onResize = React.useCallback(() => {
    if (triggerRef.current) {
      const width = triggerRef.current.offsetWidth;
      setContainerWidth(width);
    }
  }, [triggerRef, setContainerWidth]);

  useResizeObserver({
    ref: triggerRef,
    onResize: onResize,
  });

  return (
    <>
      <InputGroup ref={triggerRef}>
        <InputGroup.Input {...inputProps} ref={inputRef} />
        <InputGroup.Button {...buttonProps} ref={buttonRef}>
          <IconChevronBlockEnd />
        </InputGroup.Button>
      </InputGroup>

      {comboboxState.isOpen ? (
        <Popover.Provider
          value={{
            isOpen: comboboxState.isOpen,
            onOpenChange: comboboxState.setOpen,
          }}
        >
          <Popover
            ref={popoverRef}
            triggerRef={triggerRef}
            scrollRef={listBoxRef}
            placement="bottom end"
            arrowBoundaryOffset={28}
            isNonModal
          >
            <FocusScope autoFocus restoreFocus contain>
              <div
                style={{ minWidth: `${containerWidth}px` }}
                className={defaultComboBox.content}
              >
                <ListBox
                  {...listBoxProps}
                  disallowEmptySelection
                  autoFocus={comboboxState.focusStrategy}
                  shouldSelectOnPressUp
                  shouldFocusOnHover
                  state={comboboxState}
                  ref={listBoxRef}
                />
              </div>
            </FocusScope>
          </Popover>
        </Popover.Provider>
      ) : null}
    </>
  );
}

function MobileComboBox() {
  const context = React.useContext(ComboBoxContext);

  const { comboboxState } = context.state;
  const {
    children,
    listBoxProps,
    inputProps,
    labelProps,
    buttonProps: comboBoxButtonProps,
    placeholderProps,
  } = context.props;
  const { listBoxRef, inputRef, buttonRef } = context.refs;

  const dialogRef = React.useRef<HTMLDivElement>(null);

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "listbox" },
    comboboxState,
    buttonRef
  );

  const { dialogProps } = useDialog(
    {
      "aria-labelledby": useId(labelProps.id),
    },
    dialogRef
  );

  const { buttonProps, isPressed } = useButton(
    {
      ...triggerProps,
      elementType: "div",
    },
    buttonRef
  );

  return (
    <>
      <InputGroup
        {...mergeProps(comboBoxButtonProps, buttonProps)}
        states={{ isPressed }}
        ref={buttonRef as unknown as React.RefObject<HTMLDivElement>}
      >
        <InputGroup.Value>
          {comboboxState.inputValue ? (
            comboboxState.inputValue
          ) : (
            <span className={mobileComboBox.placeholder}>
              {placeholderProps.children}
            </span>
          )}
        </InputGroup.Value>
        <InputGroup.Addon>
          <IconChevronBlockEnd aria-hidden />
        </InputGroup.Addon>
      </InputGroup>
      {comboboxState.isOpen ? (
        <Tray.Provider
          value={{
            isOpen: comboboxState.isOpen,
            onOpenChange: comboboxState.setOpen,
          }}
        >
          <Tray>
            <div
              className={mobileComboBox.container}
              ref={dialogRef}
              {...mergeProps(overlayProps, dialogProps)}
            >
              <div className={mobileComboBox.input}>
                <ElementTypeProvider type="input">
                  <TextField
                    {...inputProps}
                    // input need's to be synced with the input value state
                    value={comboboxState.inputValue}
                    defaultValue={undefined}
                    // Omit onFocus and onBlur event's because they're incompatible
                    onFocus={undefined}
                    onBlur={undefined}
                    autoFocus={true}
                    onChange={comboboxState.setInputValue}
                  >
                    {children}
                    <TextField.Input
                      ref={inputRef}
                      placeholder={placeholderProps.children}
                    />
                  </TextField>
                </ElementTypeProvider>
              </div>
              <div className={mobileComboBox.items}>
                <ListBox
                  {...listBoxProps}
                  disallowEmptySelection
                  autoFocus={comboboxState.focusStrategy}
                  shouldSelectOnPressUp
                  shouldFocusOnHover
                  state={comboboxState}
                  ref={listBoxRef}
                />
              </div>
            </div>
          </Tray>
        </Tray.Provider>
      ) : null}
    </>
  );
}

export type ComboBoxSelectProps<T extends Record<string, unknown>> = Pick<
  AriaComboBoxProps<T>,
  "items" | "defaultItems" | "children"
>;

export function RootComboboxSelect<T extends Record<string, unknown>>(
  props: ComboBoxSelectProps<T>
) {
  const context = React.useContext(ComboBoxContext) as ComboboxContextValue<T>;

  const { setSelectProps } = context.state;

  const { children, items, defaultItems } = props;

  const isPopover = useMediaQuery(breakpoints.medium);

  React.useLayoutEffect(() => {
    setSelectProps({
      items,
      defaultItems,
      children,
    });
  }, [items, defaultItems, children, setSelectProps]);

  let content;

  if (isPopover) {
    content = <DefaultCombobox />;
  } else {
    content = <MobileComboBox />;
  }

  return (
    <ElementTypeProvider type="select">
      <Field.Input>{content}</Field.Input>
    </ElementTypeProvider>
  );
}

export function ComboBoxSelect<T extends Record<string, unknown>>(
  props: ComboBoxSelectProps<T>
) {
  const type = useElementType();

  switch (type) {
    case "root":
      return <RootComboboxSelect {...props} />;
    default:
      return null;
  }
}
