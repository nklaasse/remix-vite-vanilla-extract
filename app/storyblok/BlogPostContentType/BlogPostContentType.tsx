import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type {
  AuthorStoryblok,
  BlogSubjectStoryblok,
  BlogPostStoryblok,
} from "../component-types-sb";

import {
  blogPost,
  authorSection,
  blogPostInfos,
} from "./BlogPostContentType.css";

import { getLocale } from "~/config";

import React from "react";
import type { StoryblokStory } from "storyblok-generate-ts";
import { Avatar } from "~/components/Avatar";
import { getReadingTime } from "~/utils/getReadingTime";
import {
  modifyForTypography,
  generateForTypography,
  getPlainText,
} from "~/utils/richTextForTypography";
import type { RichTextType } from "~/utils/richTextForTypography";

export const loader = async (
  story: StoryblokStory<BlogPostStoryblok>,
  args: LoaderFunctionArgs
) => {
  const { request, context } = args;
  const { hostname } = new URL(request.url);
  const locale = getLocale(hostname, context);

  // !Currently the storyblok-generate-ts doesn't add the proper types to the rich text types
  // Get and Modify article content
  const richTextBlogPost = story.content.richText as RichTextType;
  const articleContent = await modifyForTypography(richTextBlogPost);

  // Get and Modify author description
  const authorStory = story.content.author as StoryblokStory<AuthorStoryblok>;
  const richTextAuthorDescription = authorStory.content
    .description as RichTextType;
  const authorDescription = await modifyForTypography(
    richTextAuthorDescription
  );

  // Get and localize blog post date
  const blogPostDate = new Date(
    story.first_published_at as string
  ).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postSubject = story.content
    .subject as StoryblokStory<BlogSubjectStoryblok>;

  // Get word count and reading time
  const articlePlainText = getPlainText(articleContent);
  const readingTime = getReadingTime(articlePlainText, locale);

  return {
    component: story.content.component,
    props: {
      title: story.content.title,
      featuredImage: story.content.featuredImage,
      articleContent,
      postInfo: {
        authorName: authorStory.content.name,
        authorImage: authorStory.content.picture,
        subject: postSubject.content.header[0].name,
        date: blogPostDate,
        readingTime,
      },
      author: {
        name: authorStory.content.name,
        description: authorDescription,
        picture: authorStory.content.picture,
      },
    },
  };
};

/**
 * Render the full blog post
 */
export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { title, featuredImage, articleContent, author, postInfo } = data;

  const result = React.useMemo(() => {
    return generateForTypography(articleContent);
  }, [articleContent]);

  return (
    <>
      <main>
        <div className={blogPost.header}>
          <div className={blogPost.headerTitleContainer}>
            <h1 className={blogPost.headerTitle}>{title}</h1>
            <PostInfos {...postInfo} />
          </div>

          <img
            src={featuredImage.filename}
            alt=""
            className={blogPost.headerImg}
          />
        </div>

        <div className={blogPost.content}>{result}</div>
        <AuthorInfo {...author} />
      </main>
    </>
  );
}

/**
 * Render Author Element in the bottom of the page
 */
type AuthorInfoProps = Awaited<ReturnType<typeof loader>>["props"]["author"];

function AuthorInfo(props: AuthorInfoProps) {
  const { name, description: richText, picture } = props;

  const description = React.useMemo(() => {
    return generateForTypography(richText);
  }, [richText]);

  return (
    <article className={authorSection.container}>
      <div className={authorSection.innerContainer}>
        <p className={authorSection.title}>
          {/* // todo: translate "Written by" in lokalise */}
          <b>Written by {name}</b>
        </p>
        <div className={authorSection.informations}>
          <Avatar src={picture.filename} alt=""></Avatar>
          {description}
        </div>
      </div>
    </article>
  );
}

type PostInfosProps = Awaited<ReturnType<typeof loader>>["props"]["postInfo"];

/**
 * Render Post Infos Element under to page title
 */
export function PostInfos(props: PostInfosProps) {
  const { authorName, authorImage, subject, date, readingTime } = props;
  return (
    <div className={blogPostInfos.container}>
      <div className={blogPostInfos.topInnerContainer}>
        <Avatar src={authorImage.filename} alt=""></Avatar>
        {/* // todo: translate "by" in lokalise */}
        <p>by {authorName}</p>
      </div>
      <div className={blogPostInfos.bottomInnerContainer}>
        <span className={blogPostInfos.subject}>{subject}</span>
        <time className={blogPostInfos.date}>{date}</time>
        {/* // todo: translate "read" in lokalise */}
        <span>{readingTime} read</span>
      </div>
    </div>
  );
}
