/**
 * Set of utils that help us when working with Storyblok RichText and the Typography components. Those utils will :
 * - Prepare (modify) the RichText JSON returned by Storyblok.
 * - Generate a React component from the modified json, that uses our Typography components.
 * - To get the plain text from it.
 **/

import {
  Typography,
  Paragraph,
  Heading,
  Italic,
  Bold,
  Anchor,
  OrderedList,
  UnorderedList,
  ListItem,
  Image,
} from "~/typography";

import { generate, modify } from "~/utils/richText";
import type { RichTextNode } from "~/utils/richText";
import { stripLocaleFromUrl } from "~/utils";
import React from "react";
import slugify from "@sindresorhus/slugify";

export type RichTextType = RichTextNode<
  | "doc"
  | "paragraph"
  | "heading"
  | "bold"
  | "italic"
  | "link"
  | "text"
  | "blok"
  | "bullet_list"
  | "ordered_list"
  | "list_item"
  | "image"
  | "textStyle"
>;

//--------------------------------------------------

/**
 * Modify JSON returned by Storyblok to add props to it for later use
 */
export async function modifyForTypography(richText: RichTextType) {
  const modifiedRichText = await modify(richText, {
    doc: async () => ({}),
    paragraph: async () => ({}),
    heading: async (attrs, content) => {
      if (attrs.level >= 1 && attrs.level <= 6) {
        const id = content?.find((node) => node.type === "text")?.text || "";

        return {
          level: attrs.level as 1 | 2 | 3 | 4 | 5 | 6,
          id: id ? slugify(id) : undefined,
        };
      } else {
        throw new Error(`Invalid heading level: ${attrs.level}`);
      }
    },
    blok: async () => ({}),
    bold: async () => ({}),
    italic: async () => ({}),
    link: async (attrs) => {
      const isInternal = attrs.href.substring(0, 1) === "/";
      const href = isInternal
        ? `/${stripLocaleFromUrl(attrs.href.slice(1)).url}`
        : attrs.href;

      return {
        href,
      };
    },
    text: async () => ({}),
    bullet_list: async () => ({}),
    ordered_list: async () => ({}),
    list_item: async () => ({}),
    image: async (attrs) => {
      return {
        src: attrs.src,
        alt: attrs.alt,
      };
    },
    textStyle: async () => ({}),
  });

  return modifiedRichText;
}

type generateForTypographyOptions = {
  paragraph: {
    variant: "intro" | "compact" | "default";
  };
};

/**
 * Generate JSX from JSON returned by modifyForTypography
 **/
export function generateForTypography(
  richText: Awaited<ReturnType<typeof modifyForTypography>>,
  options?: generateForTypographyOptions
) {
  return generate<JSX.Element | null, typeof richText>(richText, {
    doc: (children, props, index) => (
      <Typography key={index}>{children}</Typography>
    ),
    paragraph: (children, props, index) => (
      <Paragraph
        {...(options?.paragraph.variant && {
          variant: options.paragraph.variant,
        })}
        key={index}
      >
        {children}
      </Paragraph>
    ),
    heading: (children, props, index) => (
      <Heading level={props.level} key={index} id={props.id}>
        {children}
      </Heading>
    ),
    blok: () => {
      return null;
    },
    bold: (children, props, index) => <Bold key={index}>{children}</Bold>,
    italic: (children, props, index) => <Italic key={index}>{children}</Italic>,
    link: (children, props, index) => (
      <Anchor to={props.href} key={index}>
        {children}
      </Anchor>
    ),
    text: (children, props, index) => (
      <React.Fragment key={index}>{children}</React.Fragment>
    ),
    bullet_list: (children, props, index) => (
      <UnorderedList key={index}>{children}</UnorderedList>
    ),
    ordered_list: (children, props, index) => (
      <OrderedList key={index}>{children}</OrderedList>
    ),
    list_item: (children, props, index) => (
      <ListItem key={index}>{children}</ListItem>
    ),
    image: (children, props, index) => (
      <Image key={index} src={props.src} alt={props.alt} />
    ),
    textStyle: (children, props, index) => (
      <React.Fragment key={index}>{children}</React.Fragment>
    ),
  });
}

/**
 * Generate plain text from JSON returned by modifyForTypography
 **/
export function getPlainText(
  richText: Awaited<ReturnType<typeof modifyForTypography>>
) {
  // for doc / paragraph / heading, we remove the possible white space at the beginning and end of the string
  // We make sure to add a trailing space for paragraph and heading to separate them from the next element
  return generate<string, typeof richText>(richText, {
    doc: (children) => children.join("").trim(),
    paragraph: (children) => children.join("").trim().concat("\n"),
    heading: (children) => children.join("").trim().concat("\n"),
    blok: () => "",
    bold: (children) => children.join(""),
    italic: (children) => children.join(""),
    link: (children) => children.join(""),
    text: (children) => children.join(""),
    bullet_list: (children) => children.join(""),
    ordered_list: (children) => children.join(""),
    list_item: (children) => children.join(""),
    image: () => "",
    textStyle: (children) => children.join(""),
  });
}

export type HeadingNode = {
  text: string;
  id: string;
  children?: HeadingNode[];
};

/**
 * getHeadingsFromContent is a helper function
 * that receives a content object and returns a tree structure of headings
 * to be used in the TableOfContents component
 */
export function getHeadingsFromContent(
  content: Awaited<ReturnType<typeof modifyForTypography>>
): HeadingNode[] {
  // get all headings level 2 and 3 from content
  const headingContent = content.content?.flatMap((node) =>
    node.type === "heading" && node.props.level >= 2 && node.props.level <= 3
      ? [
          {
            level: node.props.level,
            text:
              node.content?.find((item) => item.type === "text")?.text || "",
            id: node.props.id || "",
          },
        ]
      : []
  );

  const headings: HeadingNode[] = [];
  let currentParent: HeadingNode | undefined = undefined;

  // create a tree structure from the headingContent
  // level 2 headings are the parents and level 3 are the children
  if (headingContent) {
    for (const item of headingContent) {
      if (item.level === 2) {
        currentParent = {
          text: item.text,
          id: item.id,
          children: [],
        };
        headings.push(currentParent);
      } else if (item.level === 3 && currentParent) {
        currentParent.children?.push({
          text: item.text,
          id: item.id,
        });
      }
    }
  }

  return headings;
}
