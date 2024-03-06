import type { HeaderStoryblok } from "../component-types-sb";
import { Link as RouterLink } from "@remix-run/react";
import {
  header,
  logo,
  navigation,
  ctaGroup,
  mobileMenu,
} from "./HeaderContentTypeBlock.css";
import cvMakerLogo from "public/images/CVMakerLogo.svg";
import { Button } from "~/components/Button";
import { IconMenu } from "~/icons/IconMenu";
import { stripLocaleFromUrl } from "~/utils";
import type { StoryblokStory } from "storyblok-generate-ts";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async (
  story: StoryblokStory<HeaderStoryblok>,
  _args: LoaderFunctionArgs
) => {
  return {
    component: story.content.component,
    props: {
      links: story.content.links.map((link) => {
        const { content, to, _uid } = link;

        let url = "";
        if (to && to.linktype === "story") {
          url = `/${stripLocaleFromUrl(to.cached_url ?? "").url}`;
        }

        return {
          content,
          to: url,
          id: _uid,
        };
      }),
    },
  };
};

type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { links } = data;

  return (
    <header className={header.container}>
      <Logo />
      <Navigation links={links} />
      <CtaGroup />
      <MobileMenu />
    </header>
  );
}

type NavigationProps = ComponentProps["data"];

// Navigation ==============
// Handles the desktop navigation links
function Navigation(props: NavigationProps) {
  const { links } = props;

  return (
    <div className={navigation.container}>
      {links.map((headerLink) => {
        const { id, content, to } = headerLink;
        return to !== "" ? (
          <RouterLink className={navigation.item} key={id} to={to}>
            {content}
          </RouterLink>
        ) : (
          <span
            className={[navigation.item, navigation.hoverable].join(" ")}
            key={id}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}

// Logo ==============
// Display CV maker logo
function Logo() {
  return (
    <div className={logo.container}>
      <RouterLink to="/">
        <img className={logo.img} src={cvMakerLogo} alt="CV Maker homepage" />
      </RouterLink>
    </div>
  );
}

// ctaGroup ==============
// Dislpay "login" and "create CV" button
function CtaGroup() {
  return (
    <div className={ctaGroup.container}>
      <Button variant="secondary" href="/app/login">
        <Button.Label>Log in</Button.Label>
      </Button>
      <Button href="/app/templates?document_type=resume&ref=funnel">
        <Button.Label>Create CV</Button.Label>
      </Button>
    </div>
  );
}

// Mobile menu ==============
// For now just a placeholder for the mobile icon
function MobileMenu() {
  return (
    <div className={mobileMenu.container}>
      <IconMenu />
    </div>
  );
}
