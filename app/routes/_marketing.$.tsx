import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { Locales } from "~/config";
import { getLocale, locales } from "~/config";
import { useLoaderData } from "@remix-run/react";

import type {
  BlogNavigationStoryblok,
  BlogPostStoryblok,
  BlogSubjectStoryblok,
  ContactStoryblok,
  FooterStoryblok,
  HeaderStoryblok,
  OverviewStoryblok,
} from "~/storyblok/types/component-types-sb";

import {
  Component as HeaderContentTypeComponent,
  loader as headerContentTypeLoader,
} from "~/storyblok/HeaderContentType";

import {
  Component as NavigationContentTypeComponent,
  loader as navigationContentTypeLoader,
} from "app/storyblok/BlogNavigationContentType";

import {
  Component as FooterContentTypeComponent,
  loader as footerContentTypeLoader,
} from "~/storyblok/FooterContentType";

import type { ComponentProps as OverviewContentTypeComponentProps } from "~/storyblok/OverviewContentType";
import {
  Component as OverviewContentTypeComponent,
  loader as overviewContentTypeLoader,
} from "~/storyblok/OverviewContentType";

import type { ComponentProps as BlogSubjectContentTypeComponentProps } from "~/storyblok/BlogSubjectContentType";
import {
  Component as BlogSubjectContentTypeComponent,
  loader as blogSubjectContentTypeLoader,
} from "~/storyblok/BlogSubjectContentType";

import type { ComponentProps as BlogPostContentTypeComponentProps } from "~/storyblok/BlogPostContentType";
import {
  Component as BlogPostContentTypeComponent,
  loader as blogPostContentTypeLoader,
} from "~/storyblok/BlogPostContentType";

import { action as contactEmailFormContentTypeAction } from "~/storyblok/ContactEmailFormContentType";

import type { StoryblokStory } from "storyblok-generate-ts";

import type { ISbStoryData } from "storyblok-js-client";
import StoryblokClient from "storyblok-js-client";
import { resolveSBRelations } from "~/utils/resolveSBRelations";
import { stripLocaleFromUrl } from "~/utils";

// Define the possible types of the main story
export type MainStory =
  | StoryblokStory<OverviewStoryblok>
  | StoryblokStory<BlogSubjectStoryblok>
  | StoryblokStory<BlogPostStoryblok>
  | StoryblokStory<ContactStoryblok>;

const handleError = (_: Error) => {
  throw new Response("Not Found", {
    status: 404,
  });
};

export const action = async function action(args) {
  const { request, context } = args;
  const formData = await request.formData();
  const contentType = formData.get("contentType");

  // Determine which form action to handle
  switch (contentType) {
    case "contactEmailForm":
      return await contactEmailFormContentTypeAction(
        request,
        context,
        formData
      );
  }
} satisfies ActionFunction;

export const loader = async function loader(args) {
  const { params, request, context } = args;
  const { env } = context.cloudflare;

  const slug = params["*"] ?? "";

  const storyblokClient = new StoryblokClient({
    accessToken: context.STORYBLOK_SECRET as string,
  });

  // Get config by hostname
  const { hostname } = new URL(request.url);
  const locale = getLocale(hostname, context);

  // Determine if we are in a staging environment or in production so we either show the
  // work in progress or the final pages
  const version =
    env.CVMAKER_ENVIRONMENT === "production" ? "published" : "draft";

  // Define the relations that we want to resolve for the main story
  const mainStoryRelations = ["blogPost.author", "blogPost.subject"];

  // Get the header, navigation, main and footer stories from storyblok
  const [
    headerStoryBlockResult,
    navigationStoryBlockResult,
    footerStoryBlockResult,
    mainStoryBlockResult,
  ] = await Promise.all([
    storyblokClient.get(`cdn/stories/${locale}/__layout/header`, {
      version,
    }),
    storyblokClient.get(`cdn/stories/${locale}/blog/__layout/navigation`, {
      version,
    }),
    storyblokClient.get(`cdn/stories/${locale}/__layout/footer`, {
      version,
    }),
    storyblokClient.get(`cdn/stories/${locale}/${slug}`, {
      version,
      resolve_relations: mainStoryRelations,
    }),
  ]).catch(handleError);

  // Cast the stories to the correct types
  const headerStory = headerStoryBlockResult.data
    .story as StoryblokStory<HeaderStoryblok>;
  const navigationStory = navigationStoryBlockResult.data
    .story as StoryblokStory<BlogNavigationStoryblok>;
  const footerStory = footerStoryBlockResult.data
    .story as StoryblokStory<FooterStoryblok>;

  const mainStory = mainStoryBlockResult.data.story as MainStory;
  const mainStoryRel = mainStoryBlockResult.data.rels as ISbStoryData[];
  const mainsStoryContent = resolveSBRelations(mainStory, mainStoryRel);

  mainStory.content = mainsStoryContent;

  // Load the props for the header, main and footer
  let mainStoryLoader:
    | ReturnType<
        | typeof blogPostContentTypeLoader
        | typeof overviewContentTypeLoader
        | typeof blogSubjectContentTypeLoader
      >
    | undefined;

  // Determine which loader to use for the main story
  if (mainStory.content.component === "blogPost") {
    mainStoryLoader = blogPostContentTypeLoader(
      mainStory as StoryblokStory<BlogPostStoryblok>,
      args
    );
  } else if (mainStory.content.component === "overview") {
    mainStoryLoader = overviewContentTypeLoader(
      mainStory as StoryblokStory<OverviewStoryblok>,
      args
    );
  } else if (mainStory.content.component === "blogSubject") {
    mainStoryLoader = blogSubjectContentTypeLoader(
      mainStory as StoryblokStory<BlogSubjectStoryblok>,
      args
    );
  }

  const [header, navigation, footer, main] = await Promise.all([
    headerContentTypeLoader(headerStory, args),
    navigationContentTypeLoader(navigationStory, args),
    footerContentTypeLoader(footerStory, args),
    mainStoryLoader,
  ]);

  return json({
    header,
    navigation,
    isNavigationShown: navigation.props.links.some((link) =>
      `/${slug}/`.includes(link.to)
    ),
    footer,
    main,
    alternates: mainStory.alternates ?? [],
  });
} satisfies LoaderFunction;

export default function Index() {
  const { header, navigation, isNavigationShown, footer, main } =
    useLoaderData<typeof loader>();

  let content;

  if (main?.component === "overview") {
    content = (
      <OverviewContentTypeComponent
        data={main.props as OverviewContentTypeComponentProps["data"]}
      />
    );
  } else if (main?.component === "blogPost") {
    content = (
      <BlogPostContentTypeComponent
        data={main.props as BlogPostContentTypeComponentProps["data"]}
      />
    );
  } else if (main?.component === "blogSubject") {
    content = (
      <BlogSubjectContentTypeComponent
        data={main.props as BlogSubjectContentTypeComponentProps["data"]}
      />
    );
  }

  return (
    <div>
      <HeaderContentTypeComponent data={header.props} />
      {isNavigationShown && (
        <NavigationContentTypeComponent data={navigation.props} />
      )}
      {content}
      <FooterContentTypeComponent data={footer.props} />
    </div>
  );
}

// Collection of locales that should only use the language as hreflang ( ex en-US -> en )
const ONLY_LANGUAGE: Array<Locales> = [
  "de-DE",
  "en-US",
  "es-ES",
  "fr-FR",
  "it-IT",
  "nl-NL",
  "nn-NO",
  "pl-PL",
  "pt-PT",
  "sv-SE",
  "tr-TR",
];

const X_DEFAULT_HREFLANG: string = "en";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [];
  }

  const { alternates } = data;

  // Build collection of alternate links
  const links = alternates.map((alternate) => {
    const { full_slug } = alternate;

    const { locale, url } = stripLocaleFromUrl(full_slug) as {
      locale: Locales;
      url: string;
    };

    const domain = locales[locale].production.hostname;

    // Define hreflang that should be used with the locale (in most cases the language part is enough for SEO)
    const hrefLang: Locales | string = ONLY_LANGUAGE.includes(locale)
      ? new Intl.Locale(locale).language
      : locale.toLowerCase();

    return {
      tagName: "link",
      rel: "alternate",
      href: `https://${domain}/${url}`,
      hrefLang,
    };
  });

  // Add the x-default hreflang if a US version is available amongst the alternates
  // The US version is currently the default version when it comes to hrefLang
  const xDefault = links.find((link) => link.hrefLang === X_DEFAULT_HREFLANG);

  if (xDefault) {
    links.push({
      tagName: "link",
      rel: "alternate",
      href: xDefault.href,
      hrefLang: "x-default",
    });
  }

  return links;
};
