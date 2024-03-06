import { mergeRefs } from "~/utils/mergeRefs";
import type { FocusStrategy } from "@react-types/shared";
import * as React from "react";
import type { AriaListBoxOptions } from "react-aria";
import { useListBox } from "react-aria";
import type { ListState } from "react-stately";
import { Item, Section } from "react-stately";
import { listBox } from "./ListBox.css";
import { ListBoxDescription } from "./ListBoxDescription";
import { ListBoxIcon } from "./ListBoxIcon";
import { ListBoxItem } from "./ListBoxItem";
import { ListBoxLabel } from "./ListBoxLabel";
import { ListBoxSection } from "./ListBoxSection";

export interface ListBoxProps<T>
  extends Omit<AriaListBoxOptions<T>, "isVirtualized" | "keyboardDelegate"> {
  state: ListState<T>;
  autoFocus?: boolean | FocusStrategy;
}

const _ListBox = React.forwardRef(function ListBox<T>(
  props: ListBoxProps<T>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const {
    state,
    shouldSelectOnPressUp = true,
    shouldFocusOnHover = true,
  } = props;

  const defaultListBoxRef = React.useRef<HTMLUListElement>(null);

  const listBoxRef = mergeRefs(ref, defaultListBoxRef);

  const { listBoxProps } = useListBox(
    {
      ...props,
      shouldSelectOnPressUp,
      shouldFocusOnHover,
    },
    state,
    defaultListBoxRef
  );

  return (
    <ul className={listBox.container} ref={listBoxRef} {...listBoxProps}>
      {Array.from(state.collection).map((item) => {
        if (item.type === "section") {
          return (
            <ListBoxSection key={item.key} item={item}>
              {Array.from(item.childNodes).map((item) => (
                <ListBoxItem key={item.key} item={item} state={state} />
              ))}
            </ListBoxSection>
          );
        }

        return <ListBoxItem key={item.key} item={item} state={state} />;
      })}
    </ul>
  );
});

export const ListBox = Object.assign({}, _ListBox, {
  Section,
  Item,
  Label: ListBoxLabel,
  Description: ListBoxDescription,
  Icon: ListBoxIcon,
});
