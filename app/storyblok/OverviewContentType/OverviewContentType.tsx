import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { OverviewStoryblok } from "../component-types-sb";

import { overview, overviewSection } from "./OverviewContentType.css";
import type { StoryblokStory } from "storyblok-generate-ts";
import { modes } from "~/css";

import {
  Component as PageIntroContentTypeComponent,
  loader as pageIntroLoader,
} from "~/storyblok/PageIntroContentType";
import type { ComponentProps as PageIntroComponentProps } from "~/storyblok/PageIntroContentType";

import {
  Component as ContactInfoContentTypeComponent,
  loader as contactInfoLoader,
} from "~/storyblok/ContactInfoContentType";
import type { ComponentProps as ContactInfoContentTypeComponentProps } from "~/storyblok/ContactInfoContentType";

import {
  Component as ContactCompanyDetailsContentTypeComponent,
  loader as contactCompanyDetailsLoader,
} from "~/storyblok/ContactCompanyDetailsContentType";
import type { ComponentProps as ContactCompanyDetailsContentTypeComponentProps } from "~/storyblok/ContactCompanyDetailsContentType";

import {
  Component as ContactFaqContentTypeComponent,
  loader as contactFaqLoader,
} from "~/storyblok/ContactFaqContentType";
import type { ComponentProps as ContactFaqContentTypeComponentProps } from "~/storyblok/ContactFaqContentType";

import {
  Component as ContactEmailFormContentTypeComponent,
  loader as contactEmailFormLoader,
} from "~/storyblok/ContactEmailFormContentType";
import type { ComponentProps as ContactEmailFormContentTypeComponentProps } from "~/storyblok/ContactEmailFormContentType";

import {
  Component as BlogHeaderContentTypeComponent,
  loader as blogHeaderLoader,
} from "~/storyblok/BlogHeaderContentType";
import type { ComponentProps as BlogHeaderContentTypeComponentProps } from "~/storyblok/BlogHeaderContentType";

import {
  Component as BlogPostSliderContentTypeComponent,
  loader as blogPostSliderLoader,
} from "~/storyblok/BlogPostSliderContentType";

import type { ComponentProps as BlogPostSliderContentTypeComponentProps } from "~/storyblok/BlogPostSliderContentType";

import {
  Component as TypographyContentTypeComponent,
  loader as typographyLoader,
} from "~/storyblok/TypographyContentType";

import type { ComponentProps as TypographyContentTypeComponentProps } from "~/storyblok/TypographyContentType";

import {
  Component as HeadingSectionContentTypeComponent,
  loader as headingSectionLoader,
} from "~/storyblok/HeadingSectionContentType";

import type { ComponentProps as HeadingSectionContentTypeComponentProps } from "~/storyblok/HeadingSectionContentType";

import {
  Component as HighlightSectionContentTypeComponent,
  loader as highlightSectionLoader,
} from "~/storyblok/HighlightSectionContentType";

import type { ComponentProps as HighlightSectionContentTypeComponentProps } from "~/storyblok/HighlightSectionContentType";

import {
  Component as SectionCtaContentTypeComponent,
  loader as sectionCtaLoader,
} from "~/storyblok/SectionCtaContentType";

import type { ComponentProps as SectionCtaContentTypeComponentProps } from "~/storyblok/SectionCtaContentType";

import {
  Component as LinearSectionContentTypeComponent,
  loader as linearSectionLoader,
} from "app/storyblok/LinearSectionContentType";

import type { ComponentProps as LinearSectionContentTypeComponentProps } from "app/storyblok/LinearSectionContentType";

import {
  Component as StatisticsRowContentTypeComponent,
  loader as statisticsRowLoader,
} from "~/storyblok/StatisticRowContentType";

import type { ComponentProps as StatisticsRowContentTypeComponentProps } from "~/storyblok/StatisticRowContentType";

import {
  Component as ImagesSectionContentTypeComponent,
  loader as imagesSectionLoader,
} from "~/storyblok/ImagesSectionContentType";

import type { ComponentProps as ImagesSectionContentTypeComponentProps } from "~/storyblok/ImagesSectionContentType";

import {
  Component as TimelineSliderContentTypeComponent,
  loader as timelineSliderLoader,
} from "~/storyblok/TimelineSliderContentType";

import type { ComponentProps as TimelineSliderContentTypeComponentProps } from "~/storyblok/TimelineSliderContentType";

import classNames from "classnames";
import React from "react";

export const loader = async (
  story: StoryblokStory<OverviewStoryblok>,
  args: LoaderFunctionArgs
) => {
  const { overviewRows } = story.content;

  const rows = await Promise.all(
    overviewRows.map(async (overviewRow) => {
      switch (overviewRow.block[0].component) {
        case "pageIntro":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await pageIntroLoader(overviewRow.block[0], args),
          };
        // case "contactInfo":
        //   return {
        //     id: overviewRow._uid,
        //     background: overviewRow.background,
        //     block: await contactInfoLoader(overviewRow.block[0], args),
        //   };
        case "contactCompanyDetails":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await contactCompanyDetailsLoader(
              overviewRow.block[0],
              args
            ),
          };
        case "contactFaq":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await contactFaqLoader(overviewRow.block[0], args),
          };
        case "contactEmailForm":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await contactEmailFormLoader(overviewRow.block[0], args),
          };
        case "blogHeader":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await blogHeaderLoader(overviewRow.block[0], args),
          };
        case "blogPostSlider":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await blogPostSliderLoader(overviewRow.block[0], args),
          };
        case "typography":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await typographyLoader(overviewRow.block[0], args),
          };
        case "headingSection":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await headingSectionLoader(overviewRow.block[0], args),
          };
        case "highlightSection":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await highlightSectionLoader(overviewRow.block[0], args),
          };
        case "ctaSection":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await sectionCtaLoader(overviewRow.block[0], args),
          };
        case "linearSection":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await linearSectionLoader(overviewRow.block[0], args),
          };
        case "statisticsRow":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await statisticsRowLoader(overviewRow.block[0], args),
          };
        case "imagesSection":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await imagesSectionLoader(overviewRow.block[0], args),
          };
        case "timeline":
          return {
            id: overviewRow._uid,
            background: overviewRow.background,
            block: await timelineSliderLoader(overviewRow.block[0], args),
          };
      }
    })
  );

  return {
    component: story.content.component,
    props: {
      rows,
    },
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;

  // group rows by background color
  const rowsByBackground = React.useMemo(() => {
    return data.rows.reduce(
      (
        acc: ComponentProps["data"]["rows"][0][][],
        row: ComponentProps["data"]["rows"][0],
        index: number
      ) => {
        if (index === 0) return (acc = [[row]]);
        const currentGroup = acc[acc.length - 1];

        if (!row || !currentGroup[0]) return acc;

        if (row.background === currentGroup[0].background) {
          acc[acc.length - 1].push(row);
        } else {
          acc.push([row]);
        }

        return acc;
      },
      []
    );
  }, [data.rows]);

  return (
    <main className={overview.container}>
      {rowsByBackground.map((rowGroups, groupsIndex) => {
        return (
          <SectionGroup
            background={rowGroups[0] ? rowGroups[0].background : "light"}
            key={groupsIndex}
          >
            {rowGroups.map((row) => {
              if (!row) return null;
              const { block, id } = row;

              switch (block.component) {
                case "pageIntro":
                  return (
                    <Section key={id}>
                      <PageIntroContentTypeComponent
                        data={block.props as PageIntroComponentProps["data"]}
                      />
                    </Section>
                  );

                // case "contactInfo":
                //   return (
                //     <Section key={id}>
                //       <ContactInfoContentTypeComponent
                //         data={
                //           block.props as ContactInfoContentTypeComponentProps["data"]
                //         }
                //       />
                //     </Section>
                //   );

                case "contactCompanyDetails":
                  return (
                    <Section key={id}>
                      <ContactCompanyDetailsContentTypeComponent
                        data={
                          block.props as ContactCompanyDetailsContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "contactFaq":
                  return (
                    <Section key={id}>
                      <ContactFaqContentTypeComponent
                        data={
                          block.props as ContactFaqContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "contactEmailForm":
                  return (
                    <Section key={id}>
                      <ContactEmailFormContentTypeComponent
                        data={
                          block.props as ContactEmailFormContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "blogHeader":
                  return (
                    <Section key={id}>
                      <BlogHeaderContentTypeComponent
                        data={
                          block.props as BlogHeaderContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );
                case "blogPostSlider":
                  return (
                    <Section key={id}>
                      <BlogPostSliderContentTypeComponent
                        data={
                          block.props as BlogPostSliderContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "typography":
                  return (
                    <Section key={id}>
                      <TypographyContentTypeComponent
                        data={
                          block.props as TypographyContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "highlightSection":
                  return (
                    <Section key={id}>
                      <HighlightSectionContentTypeComponent
                        data={
                          block.props as HighlightSectionContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "ctaSection":
                  return (
                    <Section key={id}>
                      <SectionCtaContentTypeComponent
                        data={
                          block.props as SectionCtaContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "linearSection":
                  return (
                    <Section key={id}>
                      <LinearSectionContentTypeComponent
                        data={
                          block.props as LinearSectionContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "headingSection":
                  return (
                    <Section key={id}>
                      <HeadingSectionContentTypeComponent
                        data={
                          block.props as HeadingSectionContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "statisticsRow":
                  return (
                    <Section key={id}>
                      <StatisticsRowContentTypeComponent
                        data={
                          block.props as StatisticsRowContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "imagesSection":
                  return (
                    <Section key={id}>
                      <ImagesSectionContentTypeComponent
                        data={
                          block.props as ImagesSectionContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                case "timeline":
                  return (
                    <Section key={id}>
                      <TimelineSliderContentTypeComponent
                        data={
                          block.props as TimelineSliderContentTypeComponentProps["data"]
                        }
                      />
                    </Section>
                  );

                default:
                  return null;
              }
            })}
          </SectionGroup>
        );
      })}
    </main>
  );
}

type SectionProps = {
  children: JSX.Element;
};

function Section({ ...props }: SectionProps) {
  const { children } = props;
  return <section className={overviewSection.container}>{children}</section>;
}

type SectionGroupProps = {
  children: React.ReactNode;
  background: keyof typeof overviewSection.variants.background;
};

// Component to group sections with the same background color
function SectionGroup({ ...props }: SectionGroupProps) {
  const { children, background } = props;

  const mode: keyof typeof modes = background === "dark" ? "dark" : "light";

  return (
    <div
      className={classNames(
        overviewSection.groupContainer,
        overviewSection.variants.background[background],
        modes[mode]
      )}
    >
      {children}
    </div>
  );
}
