import type { TypographyStoryblok } from "../component-types-sb";
import React from "react";
import type { RichTextType } from "~/utils/richTextForTypography";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  generateForTypography,
  modifyForTypography,
} from "~/utils/richTextForTypography";
import { typography } from "./TypographyContentType.css";

export const loader = async (
  storyContent: TypographyStoryblok,
  _args: LoaderFunctionArgs
) => {
  // !Currently the storyblok-generate-ts doesn't add the proper types to the rich text types
  // Get and Modify article content
  const richTextContent = storyContent.content as RichTextType;
  const content = await modifyForTypography(richTextContent);

  return {
    component: storyContent.component,
    props: {
      content,
    },
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { content } = data;

  const result = React.useMemo(() => {
    return generateForTypography(content);
  }, [content]);

  return <article className={typography.container}>{result}</article>;
}
