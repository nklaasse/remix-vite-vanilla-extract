import type { ContactCompanyDetailsStoryblok } from "../component-types-sb";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { detailsSection } from "./ContactCompanyDetailsContentType.css";

export const loader = async (
  storyContent: ContactCompanyDetailsStoryblok,
  _args: LoaderFunctionArgs
) => {
  const { title, name, chamberOfCommerce, image, component } = storyContent;

  const address = {
    street: storyContent.streetAddress,
    city: storyContent.cityAddress,
    country: storyContent.countryAddress,
  };

  return {
    props: {
      title,
      name,
      address,
      chamberOfCommerce,
      image,
    },
    component,
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { title, name, address, chamberOfCommerce, image } = data;

  return (
    <div className={detailsSection.container}>
      <div className={detailsSection.content}>
        <div className={detailsSection.column}>
          <h2 className={detailsSection.title}>{title}</h2>
          <address className={detailsSection.address}>
            <span className={detailsSection.companyName}>{name}</span>
            {address.street}
            <br />
            {address.city}
            <br />
            {address.country}
            <br />
            <span className={detailsSection.companyCoC}>
              {chamberOfCommerce}
            </span>
          </address>
        </div>
        <div className={detailsSection.column}>
          <div className={detailsSection.shapeContainer}>
            <div className={detailsSection.shape1}></div>
            <div className={detailsSection.shape2}></div>
            <img className={detailsSection.image} src={image.filename} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
