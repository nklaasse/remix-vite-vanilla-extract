import type { ButtonProps } from "~/components/Button";
import { Button } from "~/components/Button";
import { Field } from "~/components/Field";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import { IconArrowInlineEnd } from "~/icons/IconArrowInlineEnd";
import { IconArrowInlineStart } from "~/icons/IconArrowInlineStart";
import { IconCheckDense } from "~/icons/IconCheckDense";
import { useIntl } from "react-intl";
import { getScrollableParent } from "~/utils/getScrollableParent";
import type { CollectionBase, CollectionChildren } from "@react-types/shared";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import classNames from "classnames";
import * as React from "react";
import { mergeProps, useFocusRing, useHover, useRadio } from "react-aria";
import { unstable_batchedUpdates } from "react-dom";
import type { Collection, Node } from "react-stately";
import { ElementTypeProvider, TemplateSelectContext } from "./TemplateSelect";
import {
  templateSelectInput,
  templateSelectInputItem,
} from "./TemplateSelectInput.css";

type SlideOptions = {
  item: Node<unknown>;
  threshold?: number;
  sliderRef: React.RefObject<HTMLElement>;
};

function useSliderItem(
  options: SlideOptions,
  ref: React.RefObject<HTMLElement>
) {
  const { item, threshold = 0.99, sliderRef } = options;

  const [isVisible, setIsVisible] = React.useState(false);

  /**
   * Detect if the current slide is entirely visible in the current scroll container
   */
  React.useEffect(() => {
    if (!(ref.current instanceof HTMLElement)) {
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.intersectionRatio > threshold);
        },
        {
          root: sliderRef.current,
          threshold: threshold,
        }
      );

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  });

  return {
    "data-is-visible": isVisible,
    "data-key": item.key,
  };
}

type SliderResult = {
  nextProps: ButtonProps;
  prevProps: ButtonProps;
};

type SliderOptions = {
  sliderRef: React.RefObject<HTMLElement>;
  scrollRef?: React.RefObject<HTMLElement>;
};

function useSlider(
  collection: Collection<unknown>,
  options: SliderOptions
): SliderResult {
  const { sliderRef, scrollRef = sliderRef } = options;

  const [isFirstNodeInView, setIsFirstNodeInView] = React.useState(false);
  const [isLastNodeInView, setIsLastNodeInView] = React.useState(false);

  /**
   * Detect if the first or last slide are visible
   */
  React.useEffect(() => {
    if (!(sliderRef.current instanceof HTMLElement)) {
      return;
    }

    if ("MutationObserver" in window) {
      const firstNode = sliderRef.current.querySelector(
        `[data-key="${collection.getFirstKey()}"]`
      );
      const lastNode = sliderRef.current.querySelector(
        `[data-key="${collection.getLastKey()}"]`
      );

      const observer = new MutationObserver((mutations) => {
        unstable_batchedUpdates(() => {
          for (const mutation of mutations) {
            const isFirstNode = mutation.target === firstNode;
            const isLastNode = mutation.target === lastNode;

            if (isFirstNode) {
              setIsFirstNodeInView(
                firstNode.getAttribute("data-is-visible") === "true"
              );
            }

            if (isLastNode) {
              setIsLastNodeInView(
                lastNode.getAttribute("data-is-visible") === "true"
              );
            }
          }
        });
      });

      if (firstNode) {
        observer.observe(firstNode, {
          attributeFilter: ["data-is-visible"],
        });
      }

      if (lastNode) {
        observer.observe(lastNode, {
          attributeFilter: ["data-is-visible"],
        });
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [collection, sliderRef]);

  /**
   * Change the scroll position so the given slide (key) will be scrolled into view
   */
  const goTo = React.useCallback(
    (key: React.Key | null) => {
      if (!(sliderRef.current instanceof HTMLElement)) {
        return;
      }

      if (!(scrollRef.current instanceof HTMLElement)) {
        return;
      }

      const slide = sliderRef.current.querySelector(`[data-key="${key}"]`);

      if (slide instanceof HTMLElement) {
        const { left: slideLeft, width: slideWidth } =
          slide.getBoundingClientRect();
        const { left: sliderLeft, width: sliderWidth } =
          sliderRef.current.getBoundingClientRect();

        // If it is a slide which is at the end of the scroll container
        // we want to position it at the start.
        // In case it is at the start of the scroll container we want
        // to position it inside the scroll container but at the outer most position,
        // taken into account it would need to snap to the left.
        const offsetLeft = slideLeft - sliderLeft;

        if (offsetLeft > 0) {
          scrollRef.current.scrollLeft += offsetLeft;
        } else {
          scrollRef.current.scrollLeft +=
            offsetLeft -
            (sliderWidth - slideWidth - (sliderWidth % slideWidth));
        }
      }
    },
    [scrollRef, sliderRef]
  );

  const nextProps: ButtonProps = {
    isDisabled: isLastNodeInView,
    onPress: () => {
      if (!(sliderRef.current instanceof HTMLElement)) {
        return;
      }

      const visibleSlides = sliderRef.current.querySelectorAll(
        '[data-is-visible="true"]'
      );

      if (visibleSlides.length > 0) {
        const slide = Array.from(
          sliderRef.current.querySelectorAll('[data-is-visible="true"]')
        ).pop();

        if (slide) {
          goTo(
            collection.getKeyAfter(slide.getAttribute("data-key") as string)
          );
        }
      }
    },
  };

  const prevProps: ButtonProps = {
    isDisabled: isFirstNodeInView,
    onPress: () => {
      if (!(sliderRef.current instanceof HTMLElement)) {
        return;
      }

      const visibleSlides = sliderRef.current.querySelectorAll(
        '[data-is-visible="true"]'
      );

      if (visibleSlides.length > 0) {
        const slide = Array.from(
          sliderRef.current.querySelectorAll('[data-is-visible="true"]')
        ).shift();

        if (slide) {
          goTo(
            collection.getKeyBefore(slide.getAttribute("data-key") as string)
          );
        }
      }
    },
  };

  return {
    nextProps,
    prevProps,
  };
}

type TemplateSelectItemProps = {
  item: Node<unknown>;

  sliderRef: React.RefObject<HTMLElement>;
};

function TemplateSelectItem(props: TemplateSelectItemProps) {
  const { item, sliderRef } = props;

  const context = React.useContext(TemplateSelectContext);

  const { radioGroupState } = context.state;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const ref = React.useRef<HTMLLabelElement>(null!);

  const { inputProps, isSelected } = useRadio(
    {
      value: String(item.key),
      children: item.rendered,
    },
    radioGroupState,
    inputRef
  );

  const slideProps = useSliderItem({ item, sliderRef }, ref);

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({
    within: true,
    isTextInput: true,
  });

  return (
    <li className={templateSelectInputItem.container}>
      <label
        {...mergeProps(hoverProps, focusProps)}
        className={classNames(templateSelectInputItem.slide, {
          [templateSelectInputItem.states.isSelected]: isSelected,
          [templateSelectInputItem.states.isHovered]: isHovered,
          [templateSelectInputItem.states.isFocused]: isFocused,
          [templateSelectInputItem.states.isFocusVisible]: isFocusVisible,
        })}
        ref={ref}
        {...slideProps}
      >
        <input
          className={templateSelectInputItem.input}
          {...inputProps}
          ref={inputRef}
        />
        <div className={templateSelectInputItem.content}>{item.rendered}</div>

        <div className={templateSelectInputItem.indicator}>
          <IconCheckDense />
        </div>
      </label>
    </li>
  );
}

export type TemplateSelectInputProps<T> = {
  /**
   * Item objects in the collection.
   */
  items?: CollectionBase<T>["items"];
  /**
   * The contents of the collection.
   */
  children: CollectionBase<T>["children"];
};

export function TemplateSelectInput<T extends Record<string, unknown>>(
  props: TemplateSelectInputProps<T>
) {
  const intl = useIntl();

  const context = React.useContext(TemplateSelectContext);

  const { items, children } = props;

  const { collection, setInputProps, radioGroupState } = context.state;
  const { radioGroupProps } = context.props;
  const { scrollRef, sliderRef } = context.refs;

  React.useLayoutEffect(() => {
    setInputProps({
      items,
      children: children as CollectionChildren<Record<string, unknown>>,
    });
  }, [items, children, setInputProps]);

  const { nextProps, prevProps } = useSlider(collection, {
    scrollRef,
    sliderRef,
  });

  const isInitialised = React.useRef(false);

  /**
   * Set the focused slide as the first element in view
   */
  React.useEffect(() => {
    if (!(sliderRef.current instanceof HTMLElement)) {
      return;
    }

    if (!(scrollRef.current instanceof HTMLElement)) {
      return;
    }

    // We only want to do this once, so we use a ref to track if it has been done
    if (isInitialised.current) {
      return;
    }

    isInitialised.current = true;

    const value = radioGroupState.selectedValue;

    if (value) {
      const slider = sliderRef.current;
      const slide = slider.querySelector(`[data-key="${value}"]`);
      const scrollContainer = scrollRef.current;

      if (slide) {
        // Disable the scroll behaviour so we it will be set inmidiatly
        scrollContainer.style.setProperty("scroll-behavior", "auto");

        // Schedule the scroll to the next frame, so the layout has been calculated
        requestAnimationFrame(() => {
          // Get the bounding boxes of the slide and the slider
          const { left: sliderLeft } = slider.getBoundingClientRect();
          const { left: slideLeft } = slide.getBoundingClientRect();

          // Scroll the slide into view and reset the scroll-behavior to the CSS applied one
          scrollContainer.scrollLeft += slideLeft - sliderLeft;
          scrollContainer.style.removeProperty("scroll-behavior");
        });
      }
    }
  }, [radioGroupState.selectedValue, sliderRef, scrollRef]);

  const [scrollContainerWidth, setScrollContainerWidth] =
    React.useState<number>(0);

  const [inputWidth, setInputWidth] = React.useState<number>(0);

  const scrollParentRef = React.useRef<Element>(null!);
  const inputRef = React.useRef<HTMLElement>(null!);

  /*
   * Update container width when scrollParent resizes
   */
  const onScrollParentResize = React.useCallback(() => {
    if (scrollParentRef.current) {
      setScrollContainerWidth(scrollParentRef.current.scrollWidth);
    }
  }, []);

  /*
   * Update container width when the input container resizes
   */
  const onInputResize = React.useCallback(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.clientWidth);
    }
  }, []);

  /**
   * We need to know the scrollParent and element itself to
   * measure how many pixels there should be reserverd extra
   * on the right and left sides of the field
   */
  const setInputRefs = React.useCallback(
    (element: HTMLInputElement) => {
      if (!element) {
        return;
      }

      inputRef.current = element;
      scrollParentRef.current = getScrollableParent(element);

      onInputResize();
      onScrollParentResize();
    },
    [onInputResize, onScrollParentResize]
  );

  useResizeObserver({
    ref: {
      current: scrollParentRef.current as HTMLElement,
    },
    onResize: onScrollParentResize,
  });

  useResizeObserver({
    ref: {
      current: inputRef.current as HTMLElement,
    },
    onResize: onInputResize,
  });

  return (
    <ElementTypeProvider type="slide">
      <Field.Input ref={setInputRefs}>
        <div
          className={templateSelectInput.container}
          ref={sliderRef}
          style={assignInlineVars({
            [templateSelectInput.vars.templateCount]: String(collection.size),
            [templateSelectInput.vars.containerWidth]: `${inputWidth}px`,
            [templateSelectInput.vars
              .scrollContainerWidth]: `${scrollContainerWidth}px`,
          })}
        >
          <ul
            {...radioGroupProps}
            className={templateSelectInput.items}
            ref={scrollRef}
          >
            {Array.from(collection).map((item) => (
              <TemplateSelectItem
                sliderRef={sliderRef}
                key={item.key}
                item={item}
              />
            ))}
          </ul>
          <div className={templateSelectInput.prev}>
            <Button
              {...prevProps}
              size="compact"
              variant="primary"
              aria-label={intl.formatMessage({
                id: "components.templateSelectInput.prevTemplateButtonLabel",
                description:
                  "Accessible label for previous template button in the template select",
                defaultMessage: "Previous template",
              })}
              excludeFromTabOrder
            >
              <Button.Icon>
                <IconArrowInlineStart />
              </Button.Icon>
            </Button>
          </div>
          <div className={templateSelectInput.next}>
            <Button
              {...nextProps}
              size="compact"
              variant="primary"
              aria-label={intl.formatMessage({
                id: "components.templateSelectInput.nextTemplateButtonLabel",
                description:
                  "Accessible label for next template button in the template select",
                defaultMessage: "Next template",
              })}
              excludeFromTabOrder
            >
              <Button.Icon>
                <IconArrowInlineEnd />
              </Button.Icon>
            </Button>
          </div>
        </div>
      </Field.Input>
    </ElementTypeProvider>
  );
}
