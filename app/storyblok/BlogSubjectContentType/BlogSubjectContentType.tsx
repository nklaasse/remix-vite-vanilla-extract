import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type {
  AuthorStoryblok,
  BlogSubjectStoryblok,
  BlogPostStoryblok,
} from "../component-types-sb";
import type { StoryblokStory } from "storyblok-generate-ts";

import { blogSubject, blogSubjectList } from "./BlogSubjectContentType.css";

import { Component as BlogHeaderContentTypeComponent } from "../BlogHeaderContentType";

import { stripLocaleFromUrl } from "~/utils";
import { getLocale } from "~/config";
import type { Locales } from "~/config";

import StoryblokClient from "storyblok-js-client";
import type { ISbStoryData } from "storyblok-js-client";

import { resolveSBRelations } from "~/utils/resolveSBRelations";

import {
  modifyForTypography,
  getPlainText,
} from "~/utils/richTextForTypography";

import type { RichTextType } from "~/utils/richTextForTypography";

import { getReadingTime } from "~/utils/getReadingTime";
import { Card } from "~/components/Card/Card";

import { Link } from "~/components/Link";

export const loader = async (
  story: StoryblokStory<BlogSubjectStoryblok>,
  args: LoaderFunctionArgs
) => {
  const { request, context } = args;
  const { hostname } = new URL(request.url);

  const locale = getLocale(hostname, context);

  const storyblokClient = new StoryblokClient({
    accessToken: context.STORYBLOK_SECRET as string,
  });

  // Prapare props for the BlogHeader component
  const headerProps = { data: story.content.header[0] };

  // Fetch all blog posts for this subject
  const { data } = await storyblokClient.get(`cdn/stories`, {
    starts_with: `${locale}/${args.params["*"]}`,
    version: "published",
    content_type: "blogPost",
    resolve_relations: ["blogPost.author", "blogPost.subject"],
  });

  const blogPostStories: StoryblokStory<BlogPostStoryblok>[] = data.stories;
  const blogPostStoryRel: ISbStoryData[] = data.rels;
  const blogPostCardsProps = [];

  // Prepare props for the BlogPostCardGrid component
  for (let i = 0; i < blogPostStories.length; i++) {
    const blogPostCardProps = await getBlogPostCardProps(
      blogPostStories[i],
      blogPostStoryRel,
      locale
    );
    blogPostCardsProps.push(blogPostCardProps);
  }
  // sort blog posts by date
  blogPostCardsProps.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime() > 0 ? 1 : -1;
  });

  return {
    props: {
      headerProps,
      blogPostCardsProps,
    },
    component: story.content.component,
  };
};

async function getBlogPostCardProps(
  blogPostStory: StoryblokStory<BlogPostStoryblok>,
  blogPostStoryRel: ISbStoryData[],
  locale: Locales
) {
  const blogPostContentResolved = resolveSBRelations(
    blogPostStory,
    blogPostStoryRel
  ) as BlogPostStoryblok;

  const blogPostDate = new Date(blogPostStory.published_at).toLocaleDateString(
    locale,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const blogPostSubject =
    blogPostContentResolved.subject as StoryblokStory<BlogSubjectStoryblok>;
  const blogPostAuthor =
    blogPostContentResolved.author as StoryblokStory<AuthorStoryblok>;

  const richTextBlogPost = blogPostStory.content.richText as RichTextType;
  const articleContent = await modifyForTypography(richTextBlogPost);

  // Compute reading time
  const articlePlainText = getPlainText(articleContent);
  const readingTime = getReadingTime(articlePlainText, locale);

  // Get excerpt
  const excerpt = articlePlainText.substring(0, 200);

  return {
    id: blogPostContentResolved._uid,
    title: blogPostContentResolved.title,
    featuredImage: blogPostContentResolved.featuredImage,
    to: `/${stripLocaleFromUrl(blogPostStory.full_slug).url}`,
    date: blogPostDate,
    subject: {
      name: blogPostSubject.content.header[0].name,
      url: `/${stripLocaleFromUrl(blogPostSubject.full_slug).url}`,
    },
    readingTime,
    excerpt,
    author: {
      name: blogPostAuthor.content.name,
      picture: blogPostAuthor.content.picture,
    },
  };
}

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  return (
    <div className={blogSubject.container}>
      <BlogHeaderContentTypeComponent {...data.headerProps} />
      <BlogPostCardGrid {...data.blogPostCardsProps} />
    </div>
  );
}

type BlogPostGridPreviewsProps = ComponentProps["data"]["blogPostCardsProps"];

/**
 * Renders a list of blog posts.
 */
function BlogPostCardGrid(props: BlogPostGridPreviewsProps) {
  const blogPostPreviews = Object.values(props);

  return (
    <section className={blogSubjectList.container}>
      {blogPostPreviews.map((post) => {
        return (
          <Card key={post.id}>
            <Card.Image url={post.featuredImage.filename} />
            <Card.Heading level={2}>
              <Link href={post.to}>
                <Link.Label>{post.title}</Link.Label>
              </Link>
            </Card.Heading>
            <Card.Meta>
              <Card.Text>
                <Link href={post.subject.url}>
                  <Link.Label>{post.subject.name}</Link.Label>
                </Link>
              </Card.Text>
              <Card.Text>{post.date}</Card.Text>
              <Card.Text>{post.readingTime}</Card.Text>
            </Card.Meta>
            <Card.Author>
              <Card.Avatar src={post.author.picture.filename} alt="" />
              <Card.Text>{post.author.name}</Card.Text>
            </Card.Author>
          </Card>
        );
      })}
    </section>
  );
}
