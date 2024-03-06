import { IconCheckCircleSolid } from "~/icons/IconCheckCircleSolid";
import { IconChevronInlineEnd } from "~/icons/IconChevronInlineEnd";
import {
  useSelectableCollection,
  useSelectableItem,
} from "@react-aria/selection";
import { useResizeObserver } from "@react-aria/utils";
import type { Direction, KeyboardDelegate } from "@react-types/shared";
import classnames from "classnames";
import * as React from "react";
import {
  mergeProps,
  useFocusRing,
  useHover,
  useKeyboard,
  useLocale,
} from "react-aria";
import type {
  Collection,
  Node,
  SingleSelectListProps,
  SingleSelectListState,
} from "react-stately";
import { Item, useSingleSelectListState } from "react-stately";
import { stepList, stepListItem } from "./StepList.css";

type StepListItemProps<T> = {
  item: Node<T>;
  state: SingleSelectListState<T>;
};

function StepListItem<T>(props: StepListItemProps<T>) {
  const { item, state } = props;

  const { selectionManager, selectedKey } = state;

  const isSelected = selectedKey === item.key;

  const { hoverProps, isHovered } = useHover({});
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({});

  const { keyboardProps } = useKeyboard({
    onKeyDown(e) {
      if (e.key === "ArrowRight") {
        const nextKey = state.collection.getKeyAfter(item.key);

        if (nextKey) {
          state.selectionManager.setFocusedKey(nextKey);
        }
      } else if (e.key === "ArrowLeft") {
        const prevKey = state.collection.getKeyBefore(item.key);

        if (prevKey) {
          state.selectionManager.setFocusedKey(prevKey);
        }
      }
    },
  });

  const ref = React.useRef<HTMLLIElement>(null);

  const { itemProps } = useSelectableItem({
    selectionManager,
    key: item.key,
    ref,
  });

  return (
    <li
      {...mergeProps(itemProps, keyboardProps, focusProps, hoverProps)}
      aria-current={isSelected ? "step" : "false"}
      ref={ref}
      key={item.key}
      className={classnames(stepListItem.container, {
        [stepListItem.states.isActive]: isSelected,
        [stepListItem.states.isFocused]: isFocused,
        [stepListItem.states.isHovered]: isHovered,
        [stepListItem.states.isFocusVisible]: isFocusVisible,
      })}
    >
      <span className={stepListItem.content}>
        <span className={stepListItem.counter} aria-hidden />
        <span className={stepListItem.completed} aria-hidden>
          <IconCheckCircleSolid />
        </span>

        <span className={stepListItem.label}>{item.rendered}</span>
      </span>

      {item.nextKey ? (
        <span className={stepListItem.delimiter} aria-hidden>
          <IconChevronInlineEnd />
        </span>
      ) : null}
    </li>
  );
}

class StepListKeyboardDelegate<T> implements KeyboardDelegate {
  constructor(
    private collection: Collection<T>,
    private direction: Direction
  ) {}

  getKeyLeftOf(key: React.Key) {
    if (this.direction === "rtl") {
      return this.collection.getKeyAfter(key);
    } else {
      return this.collection.getKeyBefore(key);
    }
  }

  getKeyRightOf(key: React.Key) {
    if (this.direction === "rtl") {
      return this.collection.getKeyBefore(key);
    } else {
      return this.collection.getKeyAfter(key);
    }
  }

  getFirstKey() {
    return this.collection.getFirstKey();
  }

  getLastKey() {
    return this.collection.getLastKey();
  }
}

export type StepListProps<T> = Pick<
  SingleSelectListProps<T>,
  "onSelectionChange" | "items" | "children"
> &
  (
    | {
        selectedKey: SingleSelectListProps<T>["selectedKey"];
        defaultSelectedKey?: never;
      }
    | {
        defaultSelectedKey: SingleSelectListProps<T>["defaultSelectedKey"];
        selectedKey?: never;
      }
  );

/**
 * The StepList component is used to display a list of steps, those steps can inidcate a process or a flow.
 */
export function StepList<T extends object>(props: StepListProps<T>) {
  const state = useSingleSelectListState({
    selectedKey: props.selectedKey,
    defaultSelectedKey: props.defaultSelectedKey,
    onSelectionChange: props.onSelectionChange,
    items: props.items,
    children: props.children,
  });

  const { direction } = useLocale();

  const ref = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLOListElement>(null);

  const { collectionProps } = useSelectableCollection({
    ref,
    selectionManager: state.selectionManager,
    keyboardDelegate: React.useMemo(
      () => new StepListKeyboardDelegate(state.collection, direction),
      [direction, state.collection]
    ),
    disallowEmptySelection: false,
  });

  const [visibility, setVisibility] = React.useState<
    keyof typeof stepList.variants.visibility | null
  >(null);

  const calculateVisibility = React.useCallback(() => {
    if (!ref.current || !listRef.current) {
      return;
    }

    ref.current.classList.remove(stepList.variants.visibility.selected);
    ref.current.classList.add(stepList.variants.visibility.all);

    const { scrollWidth, clientWidth } = listRef.current;

    const visiblity: keyof typeof stepList.variants.visibility =
      clientWidth < scrollWidth ? "selected" : "all";

    ref.current.classList.remove(stepList.variants.visibility.selected);
    ref.current.classList.add(stepList.variants.visibility[visiblity]);

    setVisibility(visiblity);
  }, [setVisibility]);

  const onResize = React.useCallback(() => {
    calculateVisibility();

    const onResize = () => {
      setVisibility(null);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [calculateVisibility]);

  useResizeObserver({
    ref: listRef,
    onResize,
  });

  return (
    <div
      {...collectionProps}
      aria-orientation="horizontal"
      className={classnames(
        stepList.container,
        visibility ? stepList.variants.visibility[visibility] : null
      )}
      ref={ref}
    >
      <ol className={stepList.items} ref={listRef}>
        {Array.from(state.collection).map((item) => (
          <StepListItem key={item.key} item={item} state={state} />
        ))}
      </ol>
    </div>
  );
}

StepList.Item = Item;
