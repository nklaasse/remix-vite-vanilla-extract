import type { HeadingSectionStoryblok } from "../component-types-sb";
import { headingSection } from "./HeadingSectionContentType.css";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async (
  story: HeadingSectionStoryblok,
  _args: LoaderFunctionArgs
) => {
  return {
    component: story.component,
    props: {
      title: story.title,
      content: story.content,
    },
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { title, content } = data;
  return (
    <div className={headingSection.container}>
      <div className={headingSection.contentContainer}>
        <h1 className={headingSection.title}>{title}</h1>
        <p className={headingSection.content}>{content}</p>
      </div>
    </div>
  );
}
