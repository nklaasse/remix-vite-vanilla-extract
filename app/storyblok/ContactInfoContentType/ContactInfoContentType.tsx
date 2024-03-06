import type { ContactInfoStoryblok } from "../component-types-sb";
import { stripLocaleFromUrl } from "~/utils";
import { Button } from "~/components/Button";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { contactSection, contactCard } from "./ContactInfoContentType.css";

export const loader = async (
  storyContent: ContactInfoStoryblok,
  _args: LoaderFunctionArgs
) => {
  return {
    component: storyContent.component,
    props: {
      title: storyContent.title,
      subtitle: storyContent.subtitle,
      contactCards: storyContent.contactCards,
    },
  };
};

export type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { title, subtitle, contactCards } = data;

  return (
    <div className={contactSection.container}>
      <div className={contactSection.content}>
        <h1 className={contactSection.title}>{title}</h1>
        <p className={contactSection.subtitle}>{subtitle}</p>
        <div className={contactSection.cards}>
          {contactCards.map((contactCard, index) => {
            return <ContactCard card={contactCard} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

type ContactCardsProps = {
  card: ComponentProps["data"]["contactCards"][0];
};

function ContactCard({ card }: ContactCardsProps) {
  const { title, image, description, link, responseTime } = card;
  const { content, component, to } = link[0];

  let url: string = "";

  switch (component) {
    case "link":
      url =
        to && to.linktype === "story"
          ? `/${stripLocaleFromUrl(to.cached_url ?? "").url}`
          : (to.cached_url as string);
      break;
    case "telephoneLink":
      url = `tel:${to}`;
  }

  return (
    <article className={contactCard.card}>
      <img className={contactCard.image} src={image.filename} alt="" />
      <h2 className={contactCard.title}>{title}</h2>
      <p className={contactCard.description}>{description}</p>
      <Button size="intro" href={url}>
        <Button.Label>{content}</Button.Label>
      </Button>
      <span className={contactCard.time}>{responseTime}</span>
    </article>
  );
}
