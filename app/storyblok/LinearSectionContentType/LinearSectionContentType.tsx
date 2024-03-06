import React from "react";

import type { LinearSectionStoryblok } from "../component-types-sb";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { RichTextType } from "~/utils/richTextForTypography";
import {
  generateForTypography,
  modifyForTypography,
} from "~/utils/richTextForTypography";
import { Heading } from "~/typography";
import { linearSection } from "./LinearSectionContentType.css";

export const loader = async (
  storyContent: LinearSectionStoryblok,
  _args: LoaderFunctionArgs
) => {
  const { title, text, image, component } = storyContent;

  const richText = await modifyForTypography(text as RichTextType);

  return {
    props: {
      title,
      richText,
      image: {
        id: image[0].id,
        url: image[0].filename,
        alt: image[0].alt,
      },
    },
    component: component,
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { title, richText, image } = data;

  const text = React.useMemo(
    () => generateForTypography(richText, { paragraph: { variant: "intro" } }),
    [richText]
  );

  return (
    <div className={linearSection.container}>
      <div className={linearSection.content}>
        <div className={linearSection.imageContainer}>
          <div className={linearSection.imageInnerContainer}>
            <div className={linearSection.shape} />
            <img
              src={image.url}
              alt={image.alt ?? ""}
              className={linearSection.image}
            />
          </div>
        </div>

        <div className={linearSection.textContainer}>
          <Heading level={2} scale={3}>
            {title}
          </Heading>
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
}
