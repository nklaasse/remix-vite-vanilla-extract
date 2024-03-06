import type { ImagesSectionStoryblok } from "../component-types-sb";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { imagesSection } from "./ImagesSectionContentType.css";

export const loader = async (
  story: ImagesSectionStoryblok,
  _args: LoaderFunctionArgs
) => {
  return {
    component: story.component,
    props: {
      imageStart: story.start.filename,
      imgageCenter: story.middle.filename,
      imageEnd: story.end.filename,
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
  const { imageStart, imgageCenter, imageEnd } = data;
  return (
    <div className={imagesSection.content}>
      <div className={imagesSection.columnStart}>
        <div className={imagesSection.imageContainerStart}>
          <img className={imagesSection.imageStart} src={imageStart} alt="" />
          <div className={imagesSection.shapeStart} />
        </div>
      </div>
      <div className={imagesSection.columnCenter}>
        <div className={imagesSection.imageContainerCenter}>
          <img
            className={imagesSection.imageCenter}
            src={imgageCenter}
            alt=""
          />
        </div>
      </div>
      <div className={imagesSection.columnEnd}>
        <div className={imagesSection.imageContainerEnd}>
          <img className={imagesSection.imageEnd} src={imageEnd} alt="" />
          <div className={imagesSection.shapeEnd} />
        </div>
      </div>
    </div>
  );
}
