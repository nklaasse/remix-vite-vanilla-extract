import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { PageIntroStoryblok } from "../component-types-sb";

export const loader = async (
  storyContent: PageIntroStoryblok,
  _args: LoaderFunctionArgs
) => {
  const { title, description, component } = storyContent;

  return {
    props: {
      title,
      description,
    },
    component: component,
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { title, description } = data;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
