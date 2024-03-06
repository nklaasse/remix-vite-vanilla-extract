import React from "react";
import type { CtaSectionStoryblok } from "../component-types-sb";
import { cta } from "./SectionCtaContentType.css";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  modifyForTypography,
  generateForTypography,
} from "~/utils/richTextForTypography";
import type { RichTextType } from "~/utils/richTextForTypography";
import classNames from "classnames";
import { Button } from "~/components/Button";
import { Heading } from "~/typography";
import { stripLocaleFromUrl } from "~/utils";

export const loader = async (
  storyContent: CtaSectionStoryblok,
  _args: LoaderFunctionArgs
) => {
  const { title, text, image, direction, component } = storyContent;

  const richTextCta = await modifyForTypography(text as RichTextType);

  return {
    props: {
      title,
      richTextCta,
      link: storyContent.link
        ? {
            content: storyContent.link[0].content,
            href: `/${
              stripLocaleFromUrl(storyContent.link[0].to.cached_url as string)
                .url
            }`,
          }
        : undefined,
      image: {
        id: image[0].id,
        url: image[0].filename,
        alt: image[0].alt,
      },
      direction,
    },
    component: component,
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { title, richTextCta, image, direction, link } = data;

  const text = React.useMemo(() => {
    return generateForTypography(richTextCta);
  }, [richTextCta]);

  return (
    <div className={cta.container}>
      <div
        className={classNames(cta.content, cta.variants.direction[direction])}
      >
        <div className={cta.imageContainer}>
          <div className={cta.imageInnerContainer}>
            <img src={image.url} alt={image.alt ?? ""} className={cta.image} />
          </div>
        </div>
        <div className={cta.textContainer}>
          <Heading level={2} scale={4}>
            {title}
          </Heading>
          <div className={cta.text}>{text}</div>
          {link ? (
            <div className={cta.button}>
              <Button size="default" href={link.href}>
                <Button.Label>{link.content}</Button.Label>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
