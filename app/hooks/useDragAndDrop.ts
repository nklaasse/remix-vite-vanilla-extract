import type {
  DraggableCollectionProps,
  DroppableCollectionProps,
} from "@react-types/shared";
import * as React from "react";
import type { DroppableCollectionOptions } from "react-aria";
import {
  useDraggableCollection,
  useDraggableItem,
  useDropIndicator,
  useDroppableCollection,
  useDroppableItem,
} from "react-aria";
import type {
  DraggableCollectionState,
  DraggableCollectionStateOptions,
  DroppableCollectionState,
  DroppableCollectionStateOptions,
} from "react-stately";
import {
  useDraggableCollectionState,
  useDroppableCollectionState,
} from "react-stately";

interface DragAndDropOptions
  extends DraggableCollectionProps,
    DroppableCollectionProps {}

interface DragHooks {
  useDraggableCollectionState: (
    props: Omit<DraggableCollectionStateOptions, "getItems">
  ) => DraggableCollectionState;
  useDraggableCollection: typeof useDraggableCollection;
  useDraggableItem: typeof useDraggableItem;
}

interface DropHooks {
  useDroppableCollectionState: typeof useDroppableCollectionState;
  useDroppableCollection: typeof useDroppableCollection;
  useDroppableItem: typeof useDroppableItem;
  useDropIndicator: typeof useDropIndicator;
}

export interface DragAndDropHooks {
  dragHooks?: DragHooks;
  dropHooks?: DropHooks;
}

/**
 * Provides the hooks for drag and drop behaviour in any compatible component
 */
export function useDragAndDrop(options: DragAndDropOptions): DragAndDropHooks {
  return React.useMemo(() => {
    const { onDrop, onInsert, onItemDrop, onReorder, onRootDrop, getItems } =
      options;

    const isDraggable = !!getItems;
    const isDroppable = !!(
      onDrop ||
      onInsert ||
      onItemDrop ||
      onReorder ||
      onRootDrop
    );

    let dragHooks: DragHooks | undefined;
    let dropHooks: DropHooks | undefined;

    if (isDraggable) {
      dragHooks = {
        useDraggableItem,
        useDraggableCollection,
        useDraggableCollectionState: function useDraggableCollectionStateProxy(
          props: Omit<DraggableCollectionStateOptions, "getItems">
        ) {
          return useDraggableCollectionState({ ...props, ...options });
        },
      };
    }

    if (isDroppable) {
      dropHooks = {
        useDroppableItem,
        useDropIndicator,
        useDroppableCollection: function useDroppableCollectionProxy(
          props: DroppableCollectionOptions,
          state: DroppableCollectionState,
          ref: React.RefObject<HTMLElement>
        ) {
          return useDroppableCollection({ ...props, ...options }, state, ref);
        },

        useDroppableCollectionState: function useDroppableCollectionStateProxy(
          props: DroppableCollectionStateOptions
        ) {
          return useDroppableCollectionState({ ...props, ...options });
        },
      };
    }

    return {
      dragHooks,
      dropHooks,
    };
  }, [options]);
}
