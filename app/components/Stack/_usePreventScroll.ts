/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * Modified by CVMaker BV.
 *
 * The original file can be found here:
 * https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/usePreventScroll.ts
 *
 * Modifcations:
 * - Fixed typescript errors
 *   - setStyle (keys are not correct if using .style)
 *   - addEvent (Handlers are not infered correctly)
 *   - scrollIntoView (getScrollParent returns Element | null)
 * - Keep track if the user is actively scrolling (so we don't want to focus the inputs on touchdown)
 */

import {
  chain,
  getScrollParent,
  isIOS,
  useLayoutEffect,
} from "@react-aria/utils";

interface PreventScrollOptions {
  /** Whether the scroll lock is disabled. */
  isDisabled?: boolean;
}

const visualViewport = typeof window !== "undefined" && window.visualViewport;

// HTML input types that do not cause the software keyboard to appear.
const nonTextInputTypes = new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset",
]);

// The number of active usePreventScroll calls. Used to determine whether to revert back to the original page style/scroll position
let preventScrollCount = 0;
let restore: () => void;

/**
 * Prevents scrolling on the document body on mount, and
 * restores it on unmount. Also ensures that content does not
 * shift due to the scrollbars disappearing.
 */
export function usePreventScroll(options: PreventScrollOptions = {}) {
  const { isDisabled } = options;

  useLayoutEffect(() => {
    if (isDisabled) {
      return;
    }

    preventScrollCount++;
    if (preventScrollCount === 1) {
      if (isIOS()) {
        restore = preventScrollMobileSafari();
      } else {
        restore = preventScrollStandard();
      }
    }

    return () => {
      preventScrollCount--;
      if (preventScrollCount === 0) {
        restore();
      }
    };
  }, [isDisabled]);
}

// For most browsers, all we need to do is set `overflow: hidden` on the root element, and
// add some padding to prevent the page from shifting when the scrollbar is hidden.
function preventScrollStandard() {
  return chain(
    setStyle(
      document.documentElement,
      "paddingRight",
      `${window.innerWidth - document.documentElement.clientWidth}px`
    ),
    setStyle(document.documentElement, "overflow", "hidden")
  );
}

// Mobile Safari is a whole different beast. Even with overflow: hidden,
// it still scrolls the page in many situations:
//
// 1. When the bottom toolbar and address bar are collapsed, page scrolling is always allowed.
// 2. When the keyboard is visible, the viewport does not resize. Instead, the keyboard covers part of
//    it, so it becomes scrollable.
// 3. When tapping on an input, the page always scrolls so that the input is centered in the visual viewport.
//    This may cause even fixed position elements to scroll off the screen.
// 4. When using the next/previous buttons in the keyboard to navigate between inputs, the whole page always
//    scrolls, even if the input is inside a nested scrollable element that could be scrolled instead.
//
// In order to work around these cases, and prevent scrolling without jankiness, we do a few things:
//
// 1. Prevent default on `touchmove` events that are not in a scrollable element. This prevents touch scrolling
//    on the window.
// 2. Prevent default on `touchmove` events inside a scrollable element when the scroll position is at the
//    top or bottom. This avoids the whole page scrolling instead, but does prevent overscrolling.
// 3. Prevent default on `touchend` events on input elements and handle focusing the element ourselves.
// 4. When focusing an input, apply a transform to trick Safari into thinking the input is at the top
//    of the page, which prevents it from scrolling the page. After the input is focused, scroll the element
//    into view ourselves, without scrolling the whole page.
// 5. Offset the body by the scroll position using a negative margin and scroll to the top. This should appear the
//    same visually, but makes the actual scroll position always zero. This is required to make all of the
//    above work or Safari will still try to scroll the page when focusing an input.
// 6. As a last resort, handle window scroll events, and scroll back to the top. This can happen when attempting
//    to navigate to an input with the next/previous buttons that's outside a modal.
function preventScrollMobileSafari() {
  let scrollable: Element;
  let lastY = 0;

  // Keep track of the scrollable elements that are currently being scrolled.
  const activeScrollContainers = new Map();

  const onDocumentScroll = (e: Event) => {
    if (
      scrollable === document.documentElement &&
      scrollable === document.body
    ) {
      return;
    }

    // If the user is scrolling in a container, cancel the timeout
    // which is used to detect if the event has ended.
    if (activeScrollContainers.has(e.target)) {
      clearTimeout(activeScrollContainers.get(e.target));
    }

    // Set a timeout to detect if the user has stopped scrolling.
    // We use this method because the scrollend event is not supported
    // in all browsers we try to support.
    activeScrollContainers.set(
      e.target,
      setTimeout(() => activeScrollContainers.delete(e.target), 100)
    );
  };

  const onTouchStart = (e: TouchEvent) => {
    // Store the nearest scrollable parent element from the element that the user touched.
    scrollable = getScrollParent(e.target as Element);
    if (
      scrollable === document.documentElement &&
      scrollable === document.body
    ) {
      return;
    }

    lastY = e.changedTouches[0].pageY;
  };

  const onTouchMove = (e: TouchEvent) => {
    // Prevent scrolling the window.
    if (
      !scrollable ||
      scrollable === document.documentElement ||
      scrollable === document.body
    ) {
      e.preventDefault();
      return;
    }

    // Prevent scrolling up when at the top and scrolling down when at the bottom
    // of a nested scrollable area, otherwise mobile Safari will start scrolling
    // the window instead. Unfortunately, this disables bounce scrolling when at
    // the top but it's the best we can do.
    const y = e.changedTouches[0].pageY;
    const scrollTop = scrollable.scrollTop;
    const bottom = scrollable.scrollHeight - scrollable.clientHeight;

    if (bottom === 0) {
      return;
    }

    if ((scrollTop <= 0 && y > lastY) || (scrollTop >= bottom && y < lastY)) {
      e.preventDefault();
    }

    lastY = y;
  };

  const onTouchEnd = (e: TouchEvent) => {
    const target = e.target as HTMLElement;

    for (const [el] of activeScrollContainers) {
      if (el.contains(e.target)) {
        // Stop other hooks from triggering as well
        e.stopImmediatePropagation();
        return;
      }
    }

    // Apply this change if we're not already focused on the target element
    if (willOpenKeyboard(target) && target !== document.activeElement) {
      e.preventDefault();

      // Apply a transform to trick Safari into thinking the input is at the top of the page
      // so it doesn't try to scroll it into view. When tapping on an input, this needs to
      // be done before the "focus" event, so we have to focus the element ourselves.
      target.style.transform = "translateY(-2000px)";
      target.focus();
      requestAnimationFrame(() => {
        target.style.transform = "";
      });
    }
  };

  const onFocus = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (willOpenKeyboard(target)) {
      // Transform also needs to be applied in the focus event in cases where focus moves
      // other than tapping on an input directly, e.g. the next/previous buttons in the
      // software keyboard. In these cases, it seems applying the transform in the focus event
      // is good enough, whereas when tapping an input, it must be done before the focus event. 🤷‍♂️
      target.style.transform = "translateY(-2000px)";
      requestAnimationFrame(() => {
        target.style.transform = "";

        // This will have prevented the browser from scrolling the focused element into view,
        // so we need to do this ourselves in a way that doesn't cause the whole page to scroll.
        if (visualViewport) {
          if (visualViewport.height < window.innerHeight) {
            // If the keyboard is already visible, do this after one additional frame
            // to wait for the transform to be removed.
            requestAnimationFrame(() => {
              scrollIntoView(target);
            });
          } else {
            // Otherwise, wait for the visual viewport to resize before scrolling so we can
            // measure the correct position to scroll to.
            visualViewport.addEventListener(
              "resize",
              () => scrollIntoView(target),
              { once: true }
            );
          }
        }
      });
    }
  };

  const onWindowScroll = () => {
    // Last resort. If the window scrolled, scroll it back to the top.
    // It should always be at the top because the body will have a negative margin (see below).
    window.scrollTo(0, 0);
  };

  // Record the original scroll position so we can restore it.
  // Then apply a negative margin to the body to offset it by the scroll position. This will
  // enable us to scroll the window to the top, which is required for the rest of this to work.
  const scrollX = window.pageXOffset;
  const scrollY = window.pageYOffset;

  const restoreStyles = chain(
    setStyle(
      document.documentElement,
      "paddingRight",
      `${window.innerWidth - document.documentElement.clientWidth}px`
    ),
    setStyle(document.documentElement, "overflow", "hidden"),
    setStyle(document.body, "marginTop", `-${scrollY}px`)
  );

  // Scroll to the top. The negative margin on the body will make this appear the same.
  window.scrollTo(0, 0);

  const removeEvents = chain(
    addEvent(document, "touchstart", onTouchStart, {
      passive: false,
      capture: true,
    }),
    addEvent(document, "touchmove", onTouchMove, {
      passive: false,
      capture: true,
    }),
    addEvent(document, "touchend", onTouchEnd, {
      passive: false,
      capture: true,
    }),
    addEvent(document, "focus", onFocus, true),
    addEvent(document, "scroll", onDocumentScroll, true),
    addEvent(window, "scroll", onWindowScroll)
  );

  return () => {
    // Restore styles and scroll the page back to where it was.
    restoreStyles();
    removeEvents();
    window.scrollTo(scrollX, scrollY);
  };
}

// Sets a CSS property on an element, and returns a function to revert it to the previous value.
function setStyle(element: HTMLElement, style: string, value: string) {
  const current = element.style.getPropertyPriority(style);
  element.style.setProperty(style, value);

  return () => {
    element.style.setProperty(style, current);
  };
}

// Helper function to add an event listener and return a function to remove it
// This is useful for adding events insde of useEffect so that they are
// properly cleaned up when the useEffect changes
export function addEvent<K extends keyof GlobalEventHandlersEventMap>(
  target: GlobalEventHandlers,
  event: K,
  handler: (
    this: GlobalEventHandlers,
    ev: GlobalEventHandlersEventMap[K]
  ) => void,
  options?: boolean | AddEventListenerOptions
) {
  target.addEventListener(event, handler, options);

  return () => {
    target.removeEventListener(event, handler, options);
  };
}

function scrollIntoView(target: Element | null) {
  const root = document.scrollingElement || document.documentElement;
  while (target && target !== root) {
    // Find the parent scrollable element and adjust the scroll position if the target is not already in view.
    const scrollable = getScrollParent(target);
    if (
      scrollable !== document.documentElement &&
      scrollable !== document.body &&
      scrollable !== target
    ) {
      const scrollableTop = scrollable.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      if (targetTop > scrollableTop + target.clientHeight) {
        scrollable.scrollTop += targetTop - scrollableTop;
      }
    }

    target = scrollable.parentElement;
  }
}

function willOpenKeyboard(target: Element) {
  return (
    (target instanceof HTMLInputElement &&
      !nonTextInputTypes.has(target.type)) ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}
