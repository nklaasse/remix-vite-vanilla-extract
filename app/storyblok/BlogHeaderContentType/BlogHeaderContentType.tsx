import type { BlogHeaderStoryblok } from "~/storyblok/component-types-sb";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { blogHeader } from "./BlogHeaderContentType.css";

export const loader = async (
  story: BlogHeaderStoryblok,
  _args: LoaderFunctionArgs
) => {
  return {
    component: story.component,
    props: {
      name: story.name,
      description: story.description,
      illustration: story.illustration,
    },
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

/**
 * Renders the header of a blog overview/subject page.
 */
export function Component(props: ComponentProps) {
  const { data } = props;
  return (
    <div className={blogHeader.container}>
      <div className={blogHeader.content}>
        <div className={blogHeader.titleContainer}>
          <h1 className={blogHeader.title}>{data.name}</h1>
          <p className={blogHeader.description}>{data.description}</p>
        </div>
        <div className={blogHeader.illustrationContainer}>
          <img
            className={blogHeader.illustration}
            src={data.illustration.filename}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
