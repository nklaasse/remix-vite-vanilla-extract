import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import type { StoryblokStory } from "storyblok-generate-ts";
import classNames from "classnames";
import { stripLocaleFromUrl } from "~/utils";
import type { BlogNavigationStoryblok } from "../component-types-sb";
import { blogNavigation } from "./BlogNavigationContentType.css";

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export async function loader(
  story: StoryblokStory<BlogNavigationStoryblok>,
  args: LoaderFunctionArgs
) {
  const { params } = args;
  const slug = params["*"] ?? "";
  const props = {
    links: story.content.links.map((link, index) => {
      const to = isString(link.to.cached_url)
        ? `/${stripLocaleFromUrl(link.to.cached_url).url}`
        : "/";
      const isActive = `/${slug}/`.includes(to);

      return {
        id: isString(link.to.id) ? link.to.id : index.toString(),
        content: link.content,
        to,
        isActive,
      };
    }),
  };
  const lastActiveLinkIndex =
    props.links.length -
    [...props.links].reverse().findIndex((link) => link.isActive);
  for (let index = 0; index < lastActiveLinkIndex - 1; index++) {
    props.links[index].isActive = false;
  }

  return {
    component: story.content.component,
    props,
  };
}

export interface ComponentProps {
  data: Awaited<ReturnType<typeof loader>>["props"];
}

export function Component(props: ComponentProps) {
  const { data } = props;

  return (
    <nav className={blogNavigation.container}>
      {data.links.map((link) => (
        <Link
          className={classNames(blogNavigation.blogNavigationLinks, {
            [blogNavigation.linkStates.isActive]: link.isActive,
          })}
          key={link.id}
          to={link.to}
        >
          {link.content}
        </Link>
      ))}
    </nav>
  );
}
