import { Checkbox } from "~/components/Checkbox";
import type { DragAndDropHooks } from "~/hooks/useDragAndDrop";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import { IconDrag } from "~/icons/IconDrag";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import classNames from "classnames";
import * as React from "react";
import type {
  AriaGridListProps,
  DragPreviewRenderer,
  DropTarget,
} from "react-aria";
import {
  DragPreview,
  ListDropTargetDelegate,
  ListKeyboardDelegate,
  mergeProps,
  OverlayContainer,
  useButton,
  useFocusRing,
  useGridList,
  useGridListItem,
  useGridListSelectionCheckbox,
  useHover,
} from "react-aria";
import type {
  DraggableCollectionState,
  DroppableCollectionState,
  ListState,
  Node,
} from "react-stately";
import { Item, useListState } from "react-stately";
import {
  list,
  listItem,
  listItemDragHandle,
  listItemDragPreview,
  listItemDropIndicator,
} from "./List.css";
import { ListActions } from "./ListActions";
import { ListDescription } from "./ListDescription";
import { ListTitle } from "./ListTitle";

type DropIndicatorProps = {
  dragAndDropHooks: DragAndDropHooks;
  dropState?: DroppableCollectionState;
  target: DropTarget;
};

/**
 * @private
 *
 * Shows an indicator where the dropped item(s) will be placed
 */
function DropIndicator(props: DropIndicatorProps) {
  const { dragAndDropHooks, dropState, target } = props;

  const ref = React.useRef<HTMLLIElement>(null);

  const isListDroppable = dragAndDropHooks?.dropHooks != null;

  let dropIndicator;

  if (isListDroppable) {
    dropIndicator = dragAndDropHooks.dropHooks!.useDropIndicator(
      { target },
      dropState!,
      ref
    );
  }

  if (dropIndicator == null || dropIndicator.isHidden) {
    return null;
  }

  return (
    <li
      {...dropIndicator?.dropIndicatorProps}
      role="option"
      aria-selected="false"
      ref={ref}
      className={classNames(listItemDropIndicator.container, {
        [listItemDropIndicator.states.isTarget]: dropIndicator.isDropTarget,
      })}
    >
      <div className={listItemDropIndicator.start} />
      <div className={listItemDropIndicator.end} />
    </li>
  );
}

type ListItemDragHandleProps = React.HTMLAttributes<HTMLDivElement>;

function ListItemDragHandle(props: ListItemDragHandleProps) {
  const { isFocusVisible, focusProps } = useFocusRing({});

  return (
    <div
      className={classNames(listItemDragHandle.container, {
        [listItemDragHandle.states.isFocusVisible]: isFocusVisible,
      })}
      {...mergeProps(props, focusProps)}
    >
      <IconDrag />
    </div>
  );
}

export type ListItemProps<T> = {
  item: Node<T>;
  state: ListState<unknown>;
  dragAndDropHooks?: DragAndDropHooks;
  dragState?: DraggableCollectionState;
  dropState?: DroppableCollectionState;
};

/**
 * @private
 *
 * ListItem renders a row for every ListItem
 */
export const ListItem = React.memo(function ListItem<T>(
  props: ListItemProps<T>
) {
  const { item, state, dragAndDropHooks, dragState, dropState } = props;

  const ref = React.useRef<HTMLLIElement>(null);
  const dragHandleRef = React.useRef<HTMLDivElement>(null);

  const isListDraggable = dragAndDropHooks?.dragHooks != null;
  const isListDroppable = dragAndDropHooks?.dropHooks != null;

  const { rowProps, gridCellProps, isSelected } = useGridListItem(
    {
      node: item,
      shouldSelectOnPressUp: isListDraggable,
    },
    state,
    ref
  );

  const { checkboxProps } = useGridListSelectionCheckbox(
    { key: item.key },
    state
  );

  let draggableItem;

  if (isListDraggable) {
    draggableItem = dragAndDropHooks.dragHooks!.useDraggableItem(
      {
        key: item.key,
        hasDragButton: true,
      },
      dragState!
    );
  }

  let droppableItem;

  if (isListDroppable) {
    droppableItem = dragAndDropHooks.dropHooks!.useDroppableItem(
      {
        target: { type: "item", key: item.key, dropPosition: "on" },
      },
      dropState!,
      ref
    );
  }

  const { buttonProps: dragHandleProps } = useButton(
    {
      ...draggableItem?.dragButtonProps,
      elementType: "div",
    },
    dragHandleRef
  );

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing({});
  const {
    focusProps: focusWithinProps,
    isFocusVisible: isFocusVisibleWithin,
    isFocused,
  } = useFocusRing({
    within: true,
  });

  return (
    <li
      {...mergeProps(
        rowProps,
        draggableItem?.dragProps ?? {},
        droppableItem?.dropProps ?? {},
        hoverProps,
        focusProps,
        focusWithinProps
      )}
      ref={ref}
      className={classNames(listItem.container, {
        [listItem.states.isSelected]: isSelected,
        [listItem.states.isHovered]: isHovered,
        [listItem.states.isFocused]: isFocused,
        [listItem.states.isFocusVisible]: isFocusVisible,
        [listItem.states.isFocusVisibleWithin]: isFocusVisibleWithin,
      })}
    >
      <div {...gridCellProps} className={listItem.content}>
        <ListItemDragHandle {...dragHandleProps} />

        {state.selectionManager.selectionMode !== "none" ? (
          <div className={listItem.selectionIndicator}>
            <Checkbox {...checkboxProps} />
          </div>
        ) : null}

        {item.rendered}
      </div>
    </li>
  );
});

export type ListProps<T> = AriaGridListProps<T> & {
  /**
   * The drag and drop hooks returned by useDragAndDrop (~/hooks/useDragAndDrop) used to enable drag and drop behavior for the ListView.
   */
  dragAndDropHooks?: DragAndDropHooks;
};

type ListDragPreviewProps = React.HTMLAttributes<HTMLUListElement> & {
  dragState?: DraggableCollectionState;
  state: ListState<unknown>;
};

const ListDragPreview = function ListDragPreview(props: ListDragPreviewProps) {
  const { dragState, state, ...otherProps } = props;

  if (dragState == null) {
    return null;
  }

  if (!(dragState && dragState.draggedKey)) {
    return <></>;
  }

  const draggedItem = state.collection.getItem(dragState.draggedKey);

  if (draggedItem === null) {
    return null;
  }

  return (
    <ul
      {...otherProps}
      className={classNames(
        listItemDragPreview.container,
        listItemDragPreview.variants.type[
          dragState.draggingKeys.size > 1 ? "multiple" : "single"
        ],
        {
          [listItemDragPreview.states.isSelected]:
            state.selectionManager.isSelected(dragState.draggedKey),
        }
      )}
    >
      <div className={listItemDragPreview.total}>
        {dragState.draggingKeys.size}
      </div>
      <ListItem item={draggedItem} state={state} />
    </ul>
  );
};

/**
 * Display a list of interactive item's, which allows users to navigate, select or perform an action
 */
export function List<T extends Record<string, unknown>>(props: ListProps<T>) {
  const { dragAndDropHooks, ...otherProps } = props;

  const ref = React.useRef<HTMLUListElement>(null);
  const previewRef = React.useRef<DragPreviewRenderer>(null);

  const state = useListState(otherProps);
  const { gridProps } = useGridList(otherProps, state, ref);

  const isListDraggable = dragAndDropHooks?.dragHooks != null;
  const isListDroppable = dragAndDropHooks?.dropHooks != null;

  let dragState: DraggableCollectionState | undefined;

  if (isListDraggable) {
    dragState = dragAndDropHooks.dragHooks!.useDraggableCollectionState({
      collection: state.collection,
      selectionManager: state.selectionManager,
      preview: previewRef,
    });

    dragAndDropHooks.dragHooks!.useDraggableCollection({}, dragState, ref);
  }

  let dropState: DroppableCollectionState | undefined;
  let droppableCollection;

  if (isListDroppable) {
    dropState = dragAndDropHooks.dropHooks!.useDroppableCollectionState({
      collection: state.collection,
      selectionManager: state.selectionManager,
    });

    droppableCollection = dragAndDropHooks.dropHooks!.useDroppableCollection(
      {
        keyboardDelegate: new ListKeyboardDelegate(
          state.collection,
          state.disabledKeys,
          ref
        ),
        dropTargetDelegate: new ListDropTargetDelegate(state.collection, ref),
      },
      dropState,
      ref
    );
  }

  const [containerWidth, setContainerWidth] = React.useState<number>(0);

  useResizeObserver({
    onResize: () => {
      if (isListDraggable && ref.current != null) {
        const width = ref.current.offsetWidth;
        setContainerWidth(width);
      }
    },
    ref,
  });

  const { focusProps, isFocusVisible, isFocused } = useFocusRing({});

  const content = (
    <>
      <ul
        {...mergeProps(
          gridProps,
          focusProps,
          droppableCollection?.collectionProps ?? {}
        )}
        ref={ref}
        className={classNames(list.container, {
          [list.states.isFocusVisible]: isFocusVisible,
          [list.states.isFocused]: isFocused,
        })}
        style={assignInlineVars({
          [list.vars.containerWidth]: `${containerWidth}px`,
        })}
      >
        {Array.from(state.collection)
          .flatMap((item) => [
            isListDroppable ? (
              <DropIndicator
                key={`${item.key}-before`}
                dropState={dropState}
                dragAndDropHooks={dragAndDropHooks}
                target={{ type: "item", key: item.key, dropPosition: "before" }}
              />
            ) : null,
            <ListItem
              key={item.key}
              item={item}
              state={state}
              dragAndDropHooks={dragAndDropHooks}
              dragState={dragState}
              dropState={dropState}
            />,
            isListDroppable &&
            state.collection.getKeyAfter(item.key) == null ? (
              <DropIndicator
                key={`${item.key}-after`}
                dropState={dropState}
                dragAndDropHooks={dragAndDropHooks}
                target={{ type: "item", key: item.key, dropPosition: "after" }}
              />
            ) : null,
          ])
          .filter((child) => child != null)}
      </ul>
      {isListDraggable ? (
        <OverlayContainer>
          <DragPreview ref={previewRef}>
            {() => (
              <ListDragPreview
                style={{ width: `${containerWidth}px` }}
                dragState={dragState}
                state={state}
              />
            )}
          </DragPreview>
        </OverlayContainer>
      ) : null}
    </>
  );

  return content;
}

List.Item = Item;
List.Title = ListTitle;
List.Description = ListDescription;
List.Actions = ListActions;
