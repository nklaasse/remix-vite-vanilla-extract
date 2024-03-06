import React from "react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { TimelineStoryblok } from "../component-types-sb";
import { Button } from "~/components/Button";
import { IconChevronInlineEnd } from "~/icons/IconChevronInlineEnd";
import { IconChevronInlineStart } from "~/icons/IconChevronInlineStart";
import {
  component,
  heading,
  slider,
  slide,
  footer,
} from "./TimelineSliderContentType.css";
import { useIntl } from "react-intl";
import classNames from "classnames";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export const loader = async (
  story: TimelineStoryblok,
  _args: LoaderFunctionArgs
) => {
  const timeLineCards = story.items.map((card) => {
    return {
      id: card._uid,
      title: card.title,
      caption: card.caption,
      image: {
        url: card.image.filename,
      },
    };
  });

  return {
    component: story.component,
    props: {
      sectionHeading: story.heading,
      cards: timeLineCards,
    },
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

/**
 * Renders the header of a blog overview/subject page.
 */
export function Component(props: ComponentProps) {
  const { data } = props;
  const { sectionHeading, cards } = data;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const intl = useIntl();

  const [progress, setProgress] = React.useState<number>(0);

  const goToPrevious = () => {
    if (!scrollRef.current || !rootRef.current) return;

    const targetSlide = Array.from(
      scrollRef.current.querySelectorAll(
        `.${slide.container}:is(.${slide.states.isVisible})`
      )
    )
      .shift()
      ?.previousElementSibling?.querySelector(`.${slide.content}`);

    if (targetSlide) {
      const { right: targetRight } = targetSlide.getBoundingClientRect();
      const { right: rootRight } = rootRef.current.getBoundingClientRect();

      scrollRef.current.scrollLeft -= rootRight - targetRight;
    }
  };

  const goToNext = () => {
    if (!scrollRef.current || !rootRef.current) return;

    const targetSlide = Array.from(
      scrollRef.current.querySelectorAll(
        `.${slide.container}:is(.${slide.states.isVisible})`
      )
    )
      .pop()
      ?.nextElementSibling?.querySelector(`.${slide.content}`);

    if (targetSlide) {
      const { left: targetLeft } = targetSlide.getBoundingClientRect();
      const { left: rootLeft } = rootRef.current.getBoundingClientRect();

      scrollRef.current.scrollLeft += targetLeft - rootLeft;
    }
  };

  // listen to changes in the slider
  // & provide the new progress bar value
  React.useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    const container = scrollRef.current;

    const observer = new MutationObserver(() => {
      const slidesAmount =
        container.querySelectorAll(`.${slide.container}`).length - 1;

      const lastVisibleSlide = Array.from(
        container.querySelectorAll(
          `.${slide.container}:is(.${slide.states.isVisible})`
        )
      ).pop();

      if (lastVisibleSlide) {
        const lastVisibleSlideKey = lastVisibleSlide.getAttribute("data-key");

        const progressPercentage =
          (Number(lastVisibleSlideKey) / slidesAmount) * 100;

        setProgress(progressPercentage);
      }
    });

    observer.observe(container, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={component.container} ref={rootRef}>
      <h2 className={heading.container}>{sectionHeading}</h2>
      <Slider items={cards} rootRef={rootRef} scrollRef={scrollRef} />
      <div className={footer.container}>
        <div className={footer.progressBarContainer}>
          <div
            className={footer.progressBar}
            style={assignInlineVars({
              [footer.vars.progressBarPercentage]: `${String(progress)}%`,
            })}
          />
        </div>
        <div className={footer.navigation}>
          <Button
            excludeFromTabOrder
            variant="secondary"
            onPress={goToPrevious}
            aria-label={intl.formatMessage({
              id: "components.TimelineSlider.navigationButton.Previous",
              description:
                "Accessible label which is used for timeline slider navigation previous button",
              defaultMessage: "Previous slide",
            })}
          >
            <IconChevronInlineStart />
          </Button>
          <Button
            excludeFromTabOrder
            variant="secondary"
            onPress={goToNext}
            aria-label={intl.formatMessage({
              id: "components.TimelineSlider.navigationButton.Next",
              description:
                "Accessible label which is used for timeline slider navigation next button",
              defaultMessage: "Next slide",
            })}
          >
            <IconChevronInlineEnd />
          </Button>
        </div>
      </div>
    </div>
  );
}

type SliderProps = {
  items: ComponentProps["data"]["cards"];
  rootRef: React.RefObject<HTMLDivElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
};

function Slider(props: SliderProps) {
  const { items, rootRef, scrollRef } = props;

  return (
    <div className={slider.view}>
      <div className={slider.slides} ref={scrollRef}>
        {items.map((item, index) => {
          return (
            <Slide
              key={index}
              rootRef={rootRef}
              item={item}
              itemIndex={index}
            />
          );
        })}
      </div>
    </div>
  );
}

type SlideProps = {
  item: ComponentProps["data"]["cards"][0];
  rootRef: React.RefObject<HTMLDivElement>;
  itemIndex: number;
};

function Slide(props: SlideProps) {
  const { item, itemIndex, rootRef } = props;
  const { title, caption, image } = item;

  const slideRef = React.useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  // Obeserve when the slide is visible
  React.useEffect(() => {
    if (!slideRef.current) return;
    const threshold = 0.95;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.intersectionRatio >= threshold);
      },
      {
        root: rootRef.current,
        rootMargin: "0px",
        threshold: threshold,
      }
    );

    observer.observe(slideRef.current);

    return () => observer.disconnect();
  });

  return (
    <div
      className={classNames(slide.container, {
        [slide.states.isVisible]: isVisible,
      })}
      data-key={itemIndex}
      ref={slideRef}
    >
      <div className={slide.content}>
        <img className={slide.image} src={image.url} alt="" />
        <h3 className={slide.title}>{title}</h3>
        <p className={slide.caption}>{caption}</p>
      </div>
    </div>
  );
}
