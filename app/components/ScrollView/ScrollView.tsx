import { field } from "~/components/Field/Field.css";
import { textEditorInput } from "~/components/TextEditor/TextEditor.css";
import { textEditorToolbar } from "~/components/TextEditor/TextEditorToolbar.css";
import { isSoftwareKeyboardOpen } from "~/utils/isSoftwareKeyboardOpen";
import { mergeRefs } from "~/utils/mergeRefs";
import { willOpenKeyboard } from "~/utils/willOpenKeyboard";
import { isIOS } from "@react-aria/utils";
import { setElementVars } from "@vanilla-extract/dynamic";
import * as React from "react";
import { inlineEditable } from "../InlineEditable/InlineEditable.css";
import { scrollView } from "./ScrollView.css";

export type ScrollViewProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
>;

type VirtualKeyboard = {
  overlaysContent: boolean;
  boundingRect: {
    height: number;
  };
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
};

const virtualKeyboard =
  "virtualKeyboard" in window.navigator
    ? (window.navigator.virtualKeyboard as VirtualKeyboard)
    : null;
const visualViewport =
  "visualViewport" in window ? window.visualViewport : null;

const getKeyboardSize = () => {
  if (virtualKeyboard) {
    return virtualKeyboard.boundingRect.height;
  }

  if (visualViewport) {
    const keyboardSize = window.innerHeight - visualViewport.height;

    if (keyboardSize > 0) {
      return keyboardSize;
    }
  }

  return 0;
};

const useKeyboardAvoidingScrollView = (
  container: React.RefObject<HTMLDivElement>
) => {
  const update = React.useCallback(() => {
    const keyboardSize = getKeyboardSize();

    const rect = container.current!.getBoundingClientRect();

    const overlap = Math.floor(
      Math.max(0, keyboardSize - (window.innerHeight - rect.bottom))
    );

    setElementVars(container.current!, {
      [scrollView.vars.keyboardOverlap]: String(overlap),
    });
  }, [container]);

  React.useEffect(() => {
    if (virtualKeyboard || !visualViewport) {
      return;
    }

    visualViewport.addEventListener("resize", update);

    return () => {
      visualViewport.removeEventListener("resize", update);
    };
  }, [update]);

  React.useEffect(() => {
    if (!virtualKeyboard) {
      return;
    }

    virtualKeyboard.overlaysContent = true;

    virtualKeyboard.addEventListener("geometrychange", update);

    return () => {
      virtualKeyboard.removeEventListener("geometrychange", update);
    };
  }, [update]);
};

const useScrollIntoViewOnFocus = (
  container: React.RefObject<HTMLDivElement>
) => {
  const scrollFieldIntoView = React.useCallback(
    (target: Element, scrollTop: number) => {
      const scrollRect = container.current!.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const scrollViewBottom = Math.min(
        scrollRect.bottom,
        window.innerHeight - getKeyboardSize()
      );
      const scrollViewTop = scrollRect.top;

      const targetBottom = targetRect.bottom;
      const targetTop = targetRect.top;

      if (targetTop < scrollViewTop + 16) {
        scrollTop -= scrollViewTop - targetTop + 16;
      } else if (targetBottom > scrollViewBottom - 16) {
        scrollTop += targetBottom - scrollViewBottom + 16;
      }

      container.current!.scrollTop = scrollTop;
      // We do this twice since it seems that otherwise the iOS native events
      // are still triggered and the scroll position will be updated
      requestAnimationFrame(() => {
        container.current!.scrollTop = scrollTop;
        requestAnimationFrame(() => {
          container.current!.scrollTop = scrollTop;
        });
      });
    },
    [container]
  );

  const scrollSelectionIntoView = React.useCallback(
    (target: Range, field: Element, scrollTop: number) => {
      const scrollRect = container.current!.getBoundingClientRect();
      let targetRect = target.getBoundingClientRect();

      // Android returns a "empty" selection rect when there is no content
      // in the contenteditable field
      if (targetRect.height === 0) {
        targetRect = field.getBoundingClientRect();
      }

      const scrollViewBottom = Math.min(
        scrollRect.bottom,
        window.innerHeight - getKeyboardSize()
      );
      let scrollViewTop = scrollRect.top;

      // Toolbar is an optional part of the text editor
      const toolbar = field.querySelector("." + textEditorToolbar.container);

      if (toolbar instanceof HTMLElement) {
        const { height } = toolbar.getBoundingClientRect();

        scrollViewTop += height;
      }

      const targetBottom = targetRect.bottom;
      let targetTop = targetRect.top;

      // In case the user add's a link in a editor we need to detect if the the -2000px hack is applied
      // to the text editor, since this would mean that the editor measurment is of by 2000px. We need
      // to add this to the targetTop to get the correct position at the moment we correct the position of
      // the selection
      if (document.activeElement instanceof HTMLElement) {
        const { commonAncestorContainer } = target;

        if (
          document.activeElement.contains(commonAncestorContainer) ||
          document.activeElement == commonAncestorContainer
        ) {
          if (
            document.activeElement.style.transform === "translateY(-2000px)"
          ) {
            targetTop += 2000;
          }
        }
      }

      if (targetTop < scrollViewTop + 16) {
        scrollTop -= scrollViewTop - targetTop + 16;
      } else if (targetBottom > scrollViewBottom - 16) {
        scrollTop += targetBottom - scrollViewBottom + 16;
      }

      container.current!.scrollTop = scrollTop;

      // We do this twice since it seems that otherwise the iOS native events
      // are still triggered and the scroll position will be updated
      requestAnimationFrame(() => {
        container.current!.scrollTop = scrollTop;

        requestAnimationFrame(() => {
          container.current!.scrollTop = scrollTop;
        });
      });
    },
    [container]
  );

  React.useEffect(() => {
    let cb: undefined | (() => void);

    let rafId: undefined | number;

    // Keep track of if the keyboard is open or not
    let prevIsKeyboardOpen = false;

    const onGeometryChange = () => {
      // Check if the keyboard is open on this tick
      const nextIsKeyboardOpen = virtualKeyboard!.boundingRect.height > 0;

      // If the keyboard is open and was not open yet we can try to set the position
      // of the focused element
      if (nextIsKeyboardOpen && !prevIsKeyboardOpen) {
        // Cancel the previous one if it was running
        if (rafId) {
          cancelAnimationFrame(rafId);
        }

        // We need to check if the size of the window is smaller than the screen
        // At the moment the keyboard opens for whatever reason it "increases" the
        // window size.

        // At the moment that the innerHeight is smaller than the screen height
        // we can reliably calculating where to position the element
        const watch = () => {
          if (window.innerHeight > screen.availHeight) {
            rafId = requestAnimationFrame(watch);
          } else {
            cb?.();
          }
        };

        rafId = requestAnimationFrame(watch);
      }

      prevIsKeyboardOpen = nextIsKeyboardOpen;
    };

    const onResize = () => {
      if (visualViewport!.height < window.innerHeight) {
        if (cb) {
          cb();
        }
      }
    };

    const onSelectionChange = () => {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const anchorElement =
          selection.anchorNode instanceof Element
            ? selection.anchorNode
            : selection.anchorNode?.parentElement;

        const input =
          anchorElement &&
          (anchorElement.closest("." + field.container) as Element);

        if (input) {
          const scrollContainer = input.closest("." + scrollView.container);

          // We only wan't to refocus if the we're in the closest ScrollView
          if (!scrollContainer || !(scrollContainer === container.current)) {
            return;
          }

          // We only wan't to rely on the selection change if we're in a TextEditor
          if (!input.querySelector("." + textEditorInput.container)) {
            return;
          }

          const range = selection.getRangeAt(0);

          const scrollTop = container.current!.scrollTop;

          cb = () => {
            scrollSelectionIntoView(range, input, scrollTop);
          };

          if (isSoftwareKeyboardOpen() || prevIsKeyboardOpen) {
            cb();
          }
        }
      }
    };

    const onFocus = (event: FocusEvent) => {
      let target = event.target as HTMLElement;

      if (willOpenKeyboard(target)) {
        target =
          target.closest("." + field.container) ??
          target.closest("." + inlineEditable.container) ??
          target;

        const scrollContainer = target.closest("." + scrollView.container);

        // We only wan't to refocus if the we're in the closest ScrollView
        if (!scrollContainer || !(scrollContainer === container.current)) {
          return;
        }

        // For the TextEditor we want to rely on selection change since it supports
        // multiple lines and the cursor can be anywhere
        if (target.querySelector("." + textEditorInput.container)) {
          return;
        }

        const scrollTop = container.current!.scrollTop;

        cb = () => {
          scrollFieldIntoView(target, scrollTop);
        };

        if (isSoftwareKeyboardOpen() || prevIsKeyboardOpen) {
          cb();
          cb = undefined;
        }
      }
    };

    document.addEventListener("focus", onFocus, {
      capture: true,
    });
    document.addEventListener("selectionchange", onSelectionChange, {
      capture: true,
    });

    if (virtualKeyboard) {
      virtualKeyboard.addEventListener("geometrychange", onGeometryChange);
    } else if (visualViewport) {
      visualViewport.addEventListener("resize", onResize);
    }

    if (document.activeElement instanceof HTMLElement) {
      let target = document.activeElement;

      if (willOpenKeyboard(target)) {
        // We only wan't to refocus if the we're in the closest ScrollView
        if (
          !(target.closest("." + scrollView.container) === container.current)
        ) {
          return;
        }

        target = target.closest("." + field.container) ?? target;

        const scrollTop = container.current!.scrollTop;

        cb = () => {
          scrollFieldIntoView(target, scrollTop);
        };
      }
    }

    return () => {
      document.removeEventListener("focus", onFocus, {
        capture: true,
      });
      document.removeEventListener("selectionchange", onSelectionChange, {
        capture: true,
      });

      if (virtualKeyboard) {
        virtualKeyboard.removeEventListener("geometrychange", onGeometryChange);
      } else if (visualViewport) {
        visualViewport.removeEventListener("resize", onResize);
      }
    };
  }, [container, scrollFieldIntoView, scrollSelectionIntoView]);
};

const useWatchScrollHeight = (container: React.RefObject<HTMLDivElement>) => {
  React.useEffect(() => {
    if (!isIOS()) {
      return;
    }

    if (!container.current || container.current.children.length === 0) {
      return;
    }

    const observer = new ResizeObserver(() => {
      if (!container.current) {
        return;
      }

      if (container.current.scrollHeight > container.current.clientHeight) {
        container.current.style.overflowY = "auto";
      } else {
        container.current.style.overflowY = "hidden";
      }
    });

    if (container.current.scrollHeight > container.current.clientHeight) {
      container.current.style.overflowY = "auto";
    } else {
      container.current.style.overflowY = "hidden";
    }

    observer.observe(container.current.children[0]);
    observer.observe(container.current);

    return () => {
      observer.disconnect();
    };
  }, [container]);
};

export const ScrollView = React.forwardRef<HTMLDivElement, ScrollViewProps>(
  function ScrollView(props, ref) {
    const { children, ...otherProps } = props;

    const defaultRef = React.useRef<HTMLDivElement>(null);

    const mergedRef = mergeRefs(ref, defaultRef);

    useKeyboardAvoidingScrollView(defaultRef);
    useScrollIntoViewOnFocus(defaultRef);
    useWatchScrollHeight(defaultRef);

    return (
      <div {...otherProps} className={scrollView.container} ref={mergedRef}>
        <div className={scrollView.contents}>{children}</div>
      </div>
    );
  }
);
