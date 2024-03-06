import type { HighlightSectionStoryblok } from "../component-types-sb";
import {
  highlightSection,
  highlightSectionItem,
} from "./HighlightSectionContentType.css";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Heading } from "~/typography";

export const loader = async (
  story: HighlightSectionStoryblok,
  _args: LoaderFunctionArgs
) => {
  const { title, description, items } = story;

  return {
    component: story.component,
    props: {
      title,
      description,
      items,
    },
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { title, description, items } = data;
  return (
    <div className={highlightSection.container}>
      <div className={highlightSection.content}>
        <div className={highlightSection.heading}>
          <Heading level={2} scale={4}>
            {title}
          </Heading>
          <div className={highlightSection.description}>{description}</div>
        </div>

        <ol className={highlightSection.items}>
          {items &&
            items.map((item) => {
              return (
                <li key={item._uid} className={highlightSectionItem.container}>
                  <h3 className={highlightSectionItem.title}>{item.title}</h3>
                  <div className={highlightSectionItem.description}>
                    {item.description}
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}
