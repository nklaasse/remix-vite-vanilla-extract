import { getScrollableParent } from "~/utils/getScrollableParent";
import { isSoftwareKeyboardOpen } from "~/utils/isSoftwareKeyboardOpen";
import { mergeRefs } from "~/utils/mergeRefs";
import { willOpenKeyboard } from "~/utils/willOpenKeyboard";
import { isIOS } from "@react-aria/utils";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import classNames from "classnames";
import * as React from "react";
import { OverlayContainer } from "react-aria";
import { Layer, useLayerIndex } from "../Layer";
import { textEditorInput } from "../TextEditor/TextEditor.css";
import { stackBase } from "./_StackBase.css";
import { usePreventScroll } from "./_usePreventScroll";

export type StackLayerTypes = keyof typeof stackBase.variants.type;

type StackTypeContextValue = {
  value: StackLayerTypes;
};

const StackTypeContext = React.createContext<StackTypeContextValue>({
  value: "root",
});

type StackTypeProviderProps = {
  children: React.ReactNode;
  type: StackLayerTypes;
};

/**
 * @private
 *
 * Communicates the type of the current tree, so we can determine for desktop
 * if the item should render as either a dialog or full-screen screen
 */
function StackTypeProvider(props: StackTypeProviderProps) {
  const { children, type } = props;

  return (
    <StackTypeContext.Provider value={{ value: type }}>
      {children}
    </StackTypeContext.Provider>
  );
}

type DepthContextValue = {
  value: number;
};

const StackDepthContext = React.createContext<DepthContextValue>({
  value: -1,
});

const LayerDepthContext = React.createContext<DepthContextValue>({
  value: -1,
});

type DepthProviderProps = {
  children: React.ReactNode;
  type: StackLayerTypes;
};

/**
 * @private
 *
 * Tracks how many layer's there are above the current element of the same type and total
 */
function DepthProvider(props: DepthProviderProps) {
  const { children, type } = props;

  const stackTypeContext = React.useContext(StackTypeContext);

  const { value: parentType } = stackTypeContext;

  const isSameType = parentType === type;

  const layerDepthContext = React.useContext(LayerDepthContext);
  const stackDepthContext = React.useContext(StackDepthContext);

  const layerDepth = layerDepthContext.value + 1;
  const stackDepth = stackDepthContext.value + 1;

  return (
    <StackDepthContext.Provider value={{ value: stackDepth }}>
      <LayerDepthContext.Provider
        value={{ value: isSameType ? layerDepth : 0 }}
      >
        {children}
      </LayerDepthContext.Provider>
    </StackDepthContext.Provider>
  );
}

type CountContextValue = {
  value: number;
  register: () => () => void;
};

const StackCountContext = React.createContext<CountContextValue>({
  value: 0,
  register: () => () => {},
});

type StackCountProviderProps = {
  children: React.ReactNode;
};

/**
 * @private
 *
 * Tracks how many component's in the stack are rendered in the current tree
 */
function StackCountProvider(props: StackCountProviderProps) {
  const { children } = props;

  const [stackCount, setStackCount] = React.useState(0);

  const register = React.useCallback(() => {
    setStackCount((prevStackCount) => (prevStackCount += 1));

    return () => {
      setStackCount((prevStackCount) => (prevStackCount -= 1));
    };
  }, [setStackCount]);

  return (
    <StackCountContext.Provider
      value={{
        value: stackCount,
        register,
      }}
    >
      {children}
    </StackCountContext.Provider>
  );
}

const LayerCountContext = React.createContext<CountContextValue>({
  value: 0,
  register: () => () => {},
});

type LayerCountProviderProps = {
  children: React.ReactNode;
};

/**
 * @private
 *
 * Tracks how many component's of the same type there are rendered in the current tree
 */
function LayerCountProvider(props: LayerCountProviderProps) {
  const { children } = props;

  const [layerCount, setLayerCount] = React.useState(0);

  const register = React.useCallback(() => {
    setLayerCount((prevLayerCount) => (prevLayerCount += 1));

    return () => {
      setLayerCount((prevLayerCount) => (prevLayerCount -= 1));
    };
  }, [setLayerCount]);

  return (
    <LayerCountContext.Provider
      value={{
        value: layerCount,
        register,
      }}
    >
      {children}
    </LayerCountContext.Provider>
  );
}

/**
 * @private
 *
 * Updates the counter's for the amount of layer's when mounting / unmounting
 */
function LevelProvider(props: StackBaseProps) {
  const { children, type } = props;

  const stackTypeContext = React.useContext(StackTypeContext);
  const layerCountContext = React.useContext(LayerCountContext);
  const stackCountContext = React.useContext(StackCountContext);

  const { value: parentType } = stackTypeContext;

  const isSameType = parentType === type;
  const isRootType = parentType === "root";

  const { register: registerStack } = stackCountContext;
  const { register: registerLayer } = layerCountContext;

  React.useEffect(() => {
    const callbacks: Array<() => void> = [];

    if (isSameType) {
      callbacks.push(registerLayer());
    }

    if (!isRootType) {
      callbacks.push(registerStack());
    }

    return () => {
      for (const callback of callbacks) {
        callback();
      }
    };
  }, [isSameType, isRootType, registerStack, registerLayer]);

  let el = <>{children}</>;

  if (isRootType) {
    el = <StackCountProvider>{el}</StackCountProvider>;
  }

  if (!isSameType) {
    el = <LayerCountProvider>{el}</LayerCountProvider>;
  }

  return el;
}

type StackProvidersProps = {
  children: React.ReactNode;
  type: StackLayerTypes;
};

/**
 * @private
 *
 * Wrapper around all 5 context providers
 *
 * - StackTypeContext
 * - LayerCountContext
 * - StackCountContext
 * - LayerDepthContext
 * - StackDepthContext
 */
function StackProviders(props: StackProvidersProps) {
  const { children, type } = props;

  return (
    <LevelProvider type={type}>
      <DepthProvider type={type}>
        <StackTypeProvider type={type}>{children}</StackTypeProvider>
      </DepthProvider>
    </LevelProvider>
  );
}

type StackScreenProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  type: StackLayerTypes;
};

/**
 * This hook handles clicks on labels which are linked to a input field.
 * it prevents that safari will try to scroll the body if it starts to focus the input field
 */
const usePreventScrollFormLabelClick = () => {
  React.useEffect(() => {
    const onTouchEnd = (event: TouchEvent) => {
      let target = event.target as HTMLElement;

      if (target instanceof HTMLLabelElement) {
        if (target.id) {
          target =
            Array.from(
              document.querySelectorAll<HTMLElement>(
                `[aria-labelledby*='${target.id}'][contenteditable]`
              )
            ).shift() ?? target;
        }

        // In case there is a htmlFor available it is linked with a input which should
        // have our priority
        if ((target as HTMLLabelElement).htmlFor) {
          target =
            document.getElementById((target as HTMLLabelElement).htmlFor) ??
            target;
        }

        if (willOpenKeyboard(target)) {
          event.preventDefault();

          target.style.transform = "translateY(-2000px)";

          target.focus();

          if (!isSoftwareKeyboardOpen()) {
            window.visualViewport!.addEventListener(
              "resize",
              () => {
                target.style.transform = "";
              },
              { once: true }
            );
          } else {
            target.style.transform = "";
          }
        }
      }
    };

    document.addEventListener("touchend", onTouchEnd, {
      passive: false,
      capture: true,
    });

    return () => {
      document.removeEventListener("touchend", onTouchEnd, {
        capture: true,
      });
    };
  }, []);
};

/**
 * Hook which makes the text editor work again, since it is broken in safari due to the
 * usePreventScroll hook from @react-aria/overlays
 */
const usePreventScrollFixTextEditor = () => {
  React.useEffect(() => {
    let scrollTop = 0;

    /**
     * The pointer up happens before the ontouchend, so we try to store the scrollTop
     * here in case it can't be determined in the ontouchend
     */
    const onPointerUp = (event: PointerEvent) => {
      scrollTop = 0;

      const target = event.target as HTMLElement;

      const editor = target.closest("." + textEditorInput.container);

      if (editor instanceof HTMLElement) {
        const scrollParent = getScrollableParent(editor, "block");

        scrollTop = scrollParent.scrollTop;
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      let target = event.target as HTMLElement;

      const editor = target.closest("." + textEditorInput.container);

      if (editor instanceof HTMLElement) {
        target = editor.querySelector("[data-lexical-editor]") ?? target;

        if (target === document.activeElement) {
          return;
        }

        // we need to get the position in the scroll container since if we call focus
        // on the text editor it will set the scrollTop in the scrollContainer to 0
        // and we should restore it immediately after
        const scrollableParent = getScrollableParent(editor, "block");
        let originalScrollTop = scrollableParent.scrollTop;

        // In some cases the scroll area jumps to the top and then the scrollTop
        // will be 0, in those cases we want to use the scrollTop we set in the onPointerUp
        // event.
        if (originalScrollTop === 0) {
          originalScrollTop = scrollTop;
        }

        const touch = event.changedTouches[0];

        let range = document.caretRangeFromPoint(touch.clientX, touch.clientY);

        if (range) {
          // The caretRangeFromPoint method can return a range that is not
          // contained within the target. In this case we wan't the caret to
          // be at the end of the target
          if (!target.contains(range?.commonAncestorContainer)) {
            range = document.createRange();

            range.selectNodeContents(target);
            range.collapse(false);
          }

          if (!isSoftwareKeyboardOpen()) {
            target.style.transform = "translateY(-2000px)";
          }

          const selection = window.getSelection();

          target.focus();

          if (selection && range) {
            selection.removeAllRanges();
            selection.addRange(range);
          }

          scrollableParent.scrollTop = originalScrollTop;

          if (!isSoftwareKeyboardOpen()) {
            window.visualViewport!.addEventListener(
              "resize",
              () => {
                editor.style.transform = "";
              },
              { once: true }
            );
          }
        }
      }

      scrollTop = 0;
    };

    document.addEventListener("touchend", onTouchEnd, {
      passive: false,
      capture: true,
    });
    document.addEventListener("pointerup", onPointerUp, {
      passive: false,
      capture: true,
    });

    return () => {
      document.removeEventListener("touchend", onTouchEnd, {
        capture: true,
      });
      document.removeEventListener("pointerup", onPointerUp, {
        capture: true,
      });
    };
  }, []);
};

/**
 * Handles the case where the user navigates to the next input, in case the keyboard is already
 * opened we want to prevent the scroll from happening, this we do by tracking the relatedTarget
 * and if the keyboard would be open for the related target already. If so we need to apply the
 * transform trick to prevent the scroll from happening
 */
const usePreventScrollRelatedTarget = () => {
  React.useEffect(() => {
    const onBlur = (event: FocusEvent) => {
      if (event.relatedTarget instanceof HTMLElement) {
        const target = event.relatedTarget;

        if (willOpenKeyboard(target)) {
          target.style.transform = "translateY(-2000px)";

          requestAnimationFrame(() => {
            target.style.transform = "";
          });
        }
      }
    };

    document.addEventListener("blur", onBlur, {
      passive: false,
      capture: true,
    });

    return () => {
      document.removeEventListener("blur", onBlur, {
        capture: true,
      });
    };
  }, []);
};

/**
 * This hooks prevents the visual viewport events from being fired when the keyboard is open.
 * This is solved by giving the scrollable container always 1px on top of bottom to scroll by, the
 * visual viewport will only start scrolling when the user has reached the end of the scrollable
 * container and starts scrolling.
 *
 * This solves an issue on android phones which gives users more room to scroll when the keyboard
 * is open.
 */
const usePreventVisualViewportScroll = () => {
  React.useEffect(() => {
    // For IOS there is no posible scroll on the visual viewport so we don't need to do anything
    if ("virtualKeyboard" in window.navigator) {
      return;
    }

    const visualViewport = window.visualViewport!;

    const timeoutId: NodeJS.Timeout | null = null;

    const onScroll = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLElement) {
        if (target.classList.contains(stackBase.container)) {
          target.scrollTop = 1;
        }
      }
    };

    const onResize = () => {
      const isKeyboardOpen = visualViewport.height < window.innerHeight;

      const layers = document.querySelectorAll(`.${stackBase.container}`);

      for (const layer of layers) {
        if (isKeyboardOpen) {
          layer.classList.add(stackBase.states.isKeyboardOpened);
          layer.scrollTop = 1;
        } else {
          layer.classList.remove(stackBase.states.isKeyboardOpened);
          layer.scrollTop = 0;

          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        }
      }
    };

    document.addEventListener("scroll", onScroll, {
      passive: false,
      capture: true,
    });
    visualViewport.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("scroll", onScroll, {
        capture: true,
      });
      visualViewport.removeEventListener("resize", onResize);
    };
  }, []);
};

const useDisableOverscrollBehavior = () => {
  React.useEffect(() => {
    document.body.style.overscrollBehaviorY = "none";
    document.documentElement.style.overscrollBehaviorY = "none";

    return () => {
      document.body.style.overscrollBehaviorY = "";
      document.documentElement.style.overscrollBehaviorY = "";
    };
  }, []);
};

function IOSPreventScroll() {
  usePreventScroll();
  usePreventScrollRelatedTarget();
  usePreventScrollFormLabelClick();
  usePreventScrollFixTextEditor();
  useDisableOverscrollBehavior();

  return null;
}

function DefaultPreventScroll() {
  usePreventScroll();
  usePreventVisualViewportScroll();

  return null;
}

/**
 * @private
 *
 * StackScreen render's the screen visually based on the values derived from context,
 * there are multiple values to take into account;
 */
const StackScreen = React.forwardRef(function StackScreen(
  props: StackScreenProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { children, type, ...otherProps } = props;

  const { value: stackDepth } = React.useContext(StackDepthContext);
  const { value: layerDepth } = React.useContext(LayerDepthContext);
  const { value: stackCount } = React.useContext(StackCountContext);
  const { value: layerCount } = React.useContext(LayerCountContext);

  const layerLevel = Math.max(0, Math.abs(layerDepth - layerCount));
  const stackLevel = Math.max(0, Math.abs(stackDepth - stackCount));

  const index = useLayerIndex("screen");

  const defaultScreenRef = React.useRef<HTMLDivElement>(null!);

  const screenRef = mergeRefs(defaultScreenRef, ref);

  const PreventScroll = React.useMemo(() => {
    if (isIOS()) {
      return IOSPreventScroll;
    }

    return DefaultPreventScroll;
  }, []);

  return (
    <OverlayContainer>
      <PreventScroll />
      <Layer index={index}>
        <div
          {...otherProps}
          className={classNames(
            stackBase.container,
            stackBase.variants.type[type],
            {
              [stackBase.states.isActive]: stackLevel === 0,
            }
          )}
          style={{
            zIndex: index,
            ...assignInlineVars({
              [stackBase.vars.layer.depth]: String(layerDepth),
              [stackBase.vars.layer.level]: String(layerLevel),
              [stackBase.vars.layer.count]: String(layerCount),
              [stackBase.vars.stack.depth]: String(stackDepth),
              [stackBase.vars.stack.level]: String(stackLevel),
              [stackBase.vars.stack.count]: String(stackCount),

              // Should be in CSS but pow doesn't yet work
              [stackBase.vars.__internal.desktopScale]: String(
                Math.pow(0.99, layerLevel)
              ),
              [stackBase.vars.__internal.mobileScale]: String(
                Math.pow(0.97, stackLevel)
              ),
            }),
          }}
          ref={screenRef}
        >
          <div className={stackBase.content}>{children}</div>
        </div>
      </Layer>
    </OverlayContainer>
  );
});

export type StackBaseProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
> & {
  /**
   * Type of the screen, this determines how it is displayed on desktop
   */
  type: StackLayerTypes;

  /**
   * Any valid react children
   */
  children: React.ReactNode;
};

/**
 * @private
 *
 * Component which render's the Stack.Screen and Stack.Modal based on their
 * position in the component tree.
 */
export function StackBase(props: StackBaseProps) {
  const { children, type = "screen", ...otherProps } = props;

  return (
    <StackProviders type={type}>
      <StackScreen {...otherProps} type={type}>
        {children}
      </StackScreen>
    </StackProviders>
  );
}
