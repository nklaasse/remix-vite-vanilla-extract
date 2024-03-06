import type { StoryblokStory } from "storyblok-generate-ts";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

import { IconChevronInlineEnd } from "~/icons/IconChevronInlineEnd";
import { IconChevronInlineStart } from "~/icons/IconChevronInlineStart";

import type {
  AuthorStoryblok,
  BlogPostSliderStoryblok,
  BlogPostStoryblok,
  BlogSubjectStoryblok,
} from "../component-types-sb";

import StoryblokClient from "storyblok-js-client";
import type { ISbStoryData } from "storyblok-js-client";

import { getLocale } from "~/config";

import {
  modifyForTypography,
  getPlainText,
} from "~/utils/richTextForTypography";
import type { RichTextType } from "~/utils/richTextForTypography";

import { getReadingTime } from "~/utils/getReadingTime";
import { stripLocaleFromUrl } from "~/utils";

import { Card } from "~/components/Card/Card";
import { Link } from "~/components/Link";

import {
  sliderHeader,
  pill,
  slide,
  slider,
  component,
} from "./BlogPostSliderContentType.css";

import { Button } from "~/components/Button";
import React from "react";
import classNames from "classnames";

import { useIntl } from "react-intl";

import type {
  AriaTabListProps,
  AriaTabPanelProps,
  PressProps,
} from "react-aria";
import {
  mergeProps,
  useHover,
  useLocale,
  usePress,
  useTab,
  useTabList,
  useTabPanel,
  useKeyboard,
  useFocusRing,
} from "react-aria";
import { getFocusableTreeWalker } from "@react-aria/focus";
import type { TabListState, Node } from "react-stately";
import { useTabListState, Item } from "react-stately";

export const loader = async (
  story: BlogPostSliderStoryblok,
  args: LoaderFunctionArgs
) => {
  const { request, context } = args;
  const { hostname } = new URL(request.url);

  const locale = getLocale(hostname, context);

  // Fetch all blog posts for this slider
  const storyblokClient = new StoryblokClient({
    accessToken: context.STORYBLOK_SECRET as string,
  });

  const { data } = await storyblokClient.get(`cdn/stories`, {
    by_uuids: story.sliderItems.join(","),
    version: "published",
    content_type: "blogPost",
    resolve_relations: ["blogPost.author", "blogPost.subject"],
  });

  // Prepare props for the BlogPostCardGrid component
  const blogPostStories: StoryblokStory<BlogPostStoryblok>[] = data.stories;
  const blogPostStoryRel: ISbStoryData[] = data.rels;

  const posts = [];

  for (const blogPostStory of blogPostStories) {
    const author = blogPostStoryRel.find(
      (rel) => rel.uuid === blogPostStory.content.author
    ) as StoryblokStory<AuthorStoryblok> | undefined;

    if (!author) {
      throw new Error(
        `Author with uuid ${blogPostStory.content.author} not found`
      );
    }

    const subject = blogPostStoryRel.find(
      (rel) => rel.uuid === blogPostStory.content.subject
    ) as StoryblokStory<BlogSubjectStoryblok> | undefined;

    if (!subject) {
      throw new Error(
        `Subject with uuid ${blogPostStory.content.subject} not found`
      );
    }

    posts.push({
      id: blogPostStory.uuid,

      datePublished: blogPostStory.published_at,

      title: blogPostStory.content.title,
      href: `/${stripLocaleFromUrl(blogPostStory.full_slug).url}`,
      image: {
        src: blogPostStory.content.featuredImage.filename,
      },
      date: blogPostStory.published_at,

      readingTime: getReadingTime(
        getPlainText(
          await modifyForTypography(
            blogPostStory.content.richText as RichTextType
          )
        ),
        locale
      ),

      author: {
        avatar: {
          src: author.content.picture.filename,
        },
        name: author.content.name,
      },

      subject: {
        name: subject.content.header[0].name,
        href: `/${stripLocaleFromUrl(subject.full_slug).url}`,
      },
    });
  }

  const subjectLink = story.link
    ? `/${stripLocaleFromUrl(story.link[0].to.cached_url as string).url}`
    : "";

  const subjectLinkContent = story.link ? story.link[0].content : "";

  return {
    component: story.component,
    props: {
      title: story.title,
      link: { to: subjectLink, content: subjectLinkContent },
      posts,
    },
  };
};

// Split an array into evenly distributed chunks
function splitArray<T>(array: Array<T>, chunks: number): Array<Array<T>> {
  // Calculate the size of each chunk
  let chunkSize = Math.ceil(array.length / chunks);

  // Store all "created" chunks in an array
  const result = [];

  // Track the index of the current chunk
  let currentChunk = 0;

  while (currentChunk < chunks) {
    result.push(array.splice(0, chunkSize));

    // Calculate the even distribution of the remaining items
    chunkSize = Math.ceil(array.length / (chunks - currentChunk - 1));

    currentChunk += 1;
  }

  return result;
}

type SliderProps<T> = Omit<AriaTabListProps<T>, "onSelectionChange"> & {
  rootRef: React.RefObject<HTMLDivElement>;
};

function Slider<T extends object>(props: SliderProps<T>) {
  let tabListRef = React.useRef<HTMLDivElement>(null);
  let { rootRef } = props;

  const intl = useIntl();

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const goToKey = (key: React.Key) => {
    if (!scrollRef.current || !rootRef.current) {
      return;
    }
    const targetSlide = scrollRef.current.querySelector(
      `.${slide.container}[data-key="${key}"] > .${slide.content}`
    );

    if (targetSlide) {
      const { right: targetRight } = targetSlide.getBoundingClientRect();
      const { right: rootRight } = rootRef.current.getBoundingClientRect();

      const distance = rootRight - targetRight;

      scrollRef.current.scrollLeft -= distance;
    }
  };

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

  const state = useTabListState<T>({
    ...props,
  });

  const { tabListProps } = useTabList(
    {
      keyboardActivation: "manual",
    },
    state,
    tabListRef
  );

  const maxPills = Math.min(state.collection.size, 7);

  const [activePill, setActivePill] = React.useState(-1);

  const chunks = React.useMemo(() => {
    return splitArray(
      Array.from(state.collection).map((item) => String(item.key)),
      maxPills
    );
  }, [state.collection, maxPills]);

  React.useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    const container = scrollRef.current;

    const observer = new MutationObserver((_) => {
      const visibleSlides = Array.from(
        container.querySelectorAll(
          `.${slide.container}:is(.${slide.states.isVisible})`
        )
      );

      const lastVisibleSlide = visibleSlides.pop();

      if (lastVisibleSlide) {
        const key = lastVisibleSlide.getAttribute("data-key");

        if (key) {
          for (const index in chunks) {
            const chunk = chunks[index];

            if (chunk.includes(key)) {
              if (chunk[chunk.length - 1] === key) {
                setActivePill(Number(index));
              } else {
                setActivePill(Number(index) - 1);
              }
            }
          }
        }
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
  }, [chunks]);

  const pills = {
    default: [],
    medium: [],
    large: [],
  } as Record<
    "default" | "medium" | "large",
    Array<{
      index: number;
      key: string;
    }>
  >;

  let count = 0;

  for (const index in chunks) {
    const chunk = chunks[index];

    count += chunk.length;

    const key = chunk[chunk.length - 1];

    const item = state.collection.getItem(key);

    const pill = {
      index: Number(index),
      key,
    };

    if (item) {
      pills.default.push(pill);

      if (count > 2) {
        pills.medium.push(pill);
      }

      if (count > 3) {
        pills.large.push(pill);
      }
    }
  }

  return (
    <>
      <div className={slider.view} ref={rootRef}>
        <div className={slider.slides} ref={scrollRef}>
          {Array.from(state.collection).map((item) => (
            <Slide
              key={item.key}
              item={item}
              state={state}
              rootRef={rootRef}
              scrollRef={scrollRef}
            >
              {item.rendered}
            </Slide>
          ))}
        </div>
      </div>

      <div className={slider.footer}>
        <div className={slider.pills} {...tabListProps} ref={tabListRef}>
          <div className={slider.pillsDefault}>
            {pills.default.map(({ key, index }) => {
              const item = state.collection.getItem(key);

              if (item) {
                return (
                  <Pill
                    key={key}
                    item={item}
                    state={state}
                    onPress={() => {
                      goToKey(key);
                    }}
                    isActive={index <= activePill}
                    excludeFromTabOrder={index !== Math.max(0, activePill)}
                  />
                );
              }

              return null;
            })}
          </div>
          <div className={slider.pillsMedium}>
            {pills.medium.map(({ key, index }) => {
              const item = state.collection.getItem(key);

              if (item) {
                return (
                  <Pill
                    key={key}
                    item={item}
                    state={state}
                    onPress={() => {
                      goToKey(key);
                    }}
                    isActive={index <= activePill}
                    excludeFromTabOrder={index !== Math.max(0, activePill)}
                  />
                );
              }

              return null;
            })}
          </div>
          <div className={slider.pillsLarge}>
            {pills.large.map(({ key, index }) => {
              const item = state.collection.getItem(key);

              if (item) {
                return (
                  <Pill
                    key={key}
                    item={item}
                    state={state}
                    onPress={() => {
                      goToKey(key);
                    }}
                    isActive={index <= activePill}
                    excludeFromTabOrder={index !== Math.max(0, activePill)}
                  />
                );
              }

              return null;
            })}
          </div>
        </div>

        <div className={slider.navigation}>
          <Button
            excludeFromTabOrder
            variant="secondary"
            onPress={goToPrevious}
            aria-label={intl.formatMessage({
              id: "components.BlogPostSlider.footerButtonPrevious",
              description:
                "Accessible label which is used for the blog post slider navigation",
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
              id: "components.BlogPostSlider.footerButtonNext",
              description:
                "Accessible label which is used for the blog post slider navigation",
              defaultMessage: "Next slide",
            })}
          >
            <IconChevronInlineEnd />
          </Button>
        </div>
      </div>
    </>
  );
}

/**
 * Slider Component
 */

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

/**
 * Renders the header of a blog overview/subject page.
 * ---------------------------------------------------
 */

export function Component(props: ComponentProps) {
  const { data } = props;
  const { posts, title, link } = data;

  const rootRef = React.useRef<HTMLDivElement>(null);

  const intl = useIntl();

  return (
    <div className={component.container}>
      <SliderHeader title={title} link={link} />

      <Slider items={posts} rootRef={rootRef}>
        {(item) => (
          <Item key={item.id}>
            <Card>
              <Card.Image url={item.image.src} />
              <Card.Heading level={2}>
                <Link href={item.href}>
                  <Link.Label>{item.title}</Link.Label>
                </Link>
              </Card.Heading>
              <Card.Meta>
                <Card.Text>
                  <Link href={item.subject.href}>
                    <Link.Label>{item.subject.name}</Link.Label>
                  </Link>
                </Card.Text>
                <Card.Text>
                  {intl.formatDate(item.date, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Card.Text>
                <Card.Text>{item.readingTime}</Card.Text>
              </Card.Meta>
              <Card.Author>
                <Card.Avatar src={item.author.avatar.src} alt="" />
                <Card.Text>{item.author.name}</Card.Text>
              </Card.Author>
            </Card>
          </Item>
        )}
      </Slider>
    </div>
  );
}

type SlideProps<T> = AriaTabPanelProps & {
  children: React.ReactNode;
  rootRef: React.RefObject<HTMLElement>;
  scrollRef: React.RefObject<HTMLElement>;
  state: TabListState<T>;
  item: Node<T>;
};

function Slide<T>(props: SlideProps<T>) {
  const { rootRef, scrollRef, state, item, children } = props;

  const contentRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { direction } = useLocale();

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const { tabPanelProps } = useTabPanel({}, state, containerRef);

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (!containerRef.current) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        let nextSlide: Element | null = null;

        if (
          (direction === "ltr" && e.key === "ArrowRight") ||
          (direction === "rtl" && e.key === "ArrowLeft")
        ) {
          nextSlide = containerRef.current.nextElementSibling;
        } else {
          nextSlide = containerRef.current.previousElementSibling;
        }

        if (nextSlide) {
          const nextKey = nextSlide.getAttribute("data-key") as string;

          state.setSelectedKey(nextKey);

          requestAnimationFrame(() => {
            if (!nextSlide || !scrollRef.current || !rootRef.current) {
              return;
            }

            const walker = getFocusableTreeWalker(nextSlide, {
              tabbable: true,
            });

            const nextNode = walker?.nextNode();

            if (nextNode instanceof HTMLElement) {
              nextNode.focus();
            }

            const content = nextSlide.querySelector(`.${slide.content}`);

            if (content) {
              const { left: rootLeft, right: rootRight } =
                rootRef.current.getBoundingClientRect();

              const { left: contentLeft, right: contentRight } =
                content.getBoundingClientRect();

              if (contentLeft < rootLeft) {
                const distance = rootLeft - contentLeft;

                scrollRef.current.scrollLeft -= distance;
              } else if (contentRight > rootRight) {
                const distance = contentRight - rootRight;

                scrollRef.current.scrollLeft += distance;
              }
            }
          });
        }

        e.preventDefault();
      }
    },
  });

  React.useEffect(() => {
    if (!contentRef.current) {
      return;
    }

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

    observer.observe(contentRef.current);

    // Cleanup by disconnecting the observer when the component unmounts
    return () => observer.disconnect();
  });

  let domProps: React.HTMLAttributes<HTMLDivElement> = {};

  const isActive = state.selectedKey === item.key;

  if (isActive) {
    domProps = {
      ...domProps,
      ...tabPanelProps,
    };
  } else {
    domProps = {
      ...domProps,
      // @ts-expect-error - inert is not yet in the types
      inert: "true",
    };
  }

  return (
    <div
      {...mergeProps(domProps, keyboardProps)}
      className={classNames(slide.container, {
        [slide.states.isVisible]: isVisible,
      })}
      ref={containerRef}
      data-key={item.key}
      tabIndex={-1}
    >
      <div className={slide.content} ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

type PillProps<T> = Pick<PressProps, "onPress"> & {
  state: TabListState<T>;
  item: Node<T>;
  isActive: boolean;
  excludeFromTabOrder?: boolean;
};

function Pill<T>(props: PillProps<T>) {
  const { state, item, onPress, isActive, excludeFromTabOrder = true } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  const { tabProps, isPressed } = useTab({ key: item.key }, state, ref);

  const { direction } = useLocale();

  const { pressProps } = usePress({
    onPress,
  });

  const { focusProps, isFocusVisible, isFocused } = useFocusRing({});
  const { hoverProps, isHovered } = useHover({});

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      // We need to do the focus behaviour for the next / previous tabs ourselves
      // since we're not rendering a "tab" for every visible panel
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        if (e.target instanceof Element) {
          let next: Element | null = null;

          if (
            (direction === "ltr" && e.key === "ArrowRight") ||
            (direction === "rtl" && e.key === "ArrowLeft")
          ) {
            next = e.target.nextElementSibling;
          } else {
            next = e.target.previousElementSibling;
          }

          if (next instanceof HTMLElement) {
            next.focus();
          }
        }
      }
    },
  });

  return (
    <div
      {...mergeProps(
        pressProps,
        focusProps,
        hoverProps,
        keyboardProps,
        tabProps
      )}
      tabIndex={excludeFromTabOrder ? -1 : 0}
      ref={ref}
      className={classNames(pill.container, {
        [pill.states.isActive]: isActive,
        [pill.states.isPressed]: isPressed,
        [pill.states.isFocused]: isFocused,
        [pill.states.isFocusVisible]: isFocusVisible,
        [pill.states.isHovered]: isHovered,
      })}
    >
      <span className={pill.indicator} />
    </div>
  );
}

/**
 * Renders the header of a Slider ( aka title & link to subject).
 * -------------------------------------------------------------
 */

type SliderHeaderProps = {
  title: string;

  link: {
    to: string;
    content: string;
  };
};

function SliderHeader(props: SliderHeaderProps) {
  const { title, link } = props;

  return (
    <div className={sliderHeader.container}>
      <div className={sliderHeader.content}>
        <h2 className={sliderHeader.heading}>{title}</h2>
        {link ? (
          <Link href={link.to}>
            <Link.Label>{link.content}</Link.Label>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

Component.displayName = "BlogPostSlider";
