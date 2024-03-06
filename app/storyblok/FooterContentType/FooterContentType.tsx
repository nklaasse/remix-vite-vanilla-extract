import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { FooterStoryblok } from "../component-types-sb";
import {
  footer,
  ctaBanner,
  footerTop,
  footerBottom,
} from "./FooterContentType.css";
import { stripLocaleFromUrl } from "~/utils";
import { Button } from "~/components/Button";
import { Menu } from "~/components/Menu";
import { Link as RouterLink } from "@remix-run/react";

import { getLocale, locales } from "~/config";

import cvMakerLogo from "public/images/CVMakerLogo.svg";

import type { IconProps } from "~/icons";

import { IconCheckCircle } from "~/icons/IconCheckCircle";
import { IconSocialFacebook } from "~/icons/IconSocialFacebook";
import { IconSocialLinkedin } from "~/icons/IconSocialLinkedin";
import { IconSocialTwitter } from "~/icons/IconSocialTwitter";
import { IconGlobe } from "~/icons/IconGlobe";

import { FlagNL } from "~/icons/FlagNL";
import { FlagFR } from "~/icons/FlagFR";
import { FlagDE } from "~/icons/FlagDE";
import { FlagUK } from "~/icons/FlagUK";
import { FlagBE } from "~/icons/FlagBE";
import { FlagES } from "~/icons/FlagES";
import { FlagIT } from "~/icons/FlagIT";
import { FlagPT } from "~/icons/FlagPT";
import { FlagPL } from "~/icons/FlagPL";
import { FlagSE } from "~/icons/FlagSE";
import { FlagNO } from "~/icons/FlagNO";
import { FlagDK } from "~/icons/FlagDK";
import { FlagTR } from "~/icons/FlagTR";
import { FlagHU } from "~/icons/FlagHU";
import { FlagRO } from "~/icons/FlagRO";
import { FlagRU } from "~/icons/FlagRU";
import { FlagUA } from "~/icons/FlagUA";
import { FlagUS } from "~/icons/FlagUS";
import { FlagMX } from "~/icons/FlagMX";
import { FlagPE } from "~/icons/FlagPE";
import { FlagAR } from "~/icons/FlagAR";
import { FlagCL } from "~/icons/FlagCL";
import { FlagPlaceholder } from "~/icons/FlagPlaceholder";
import type { StoryblokStory } from "storyblok-generate-ts";

export const loader = (
  story: StoryblokStory<FooterStoryblok>,
  args: LoaderFunctionArgs
) => {
  const { title, subtitle, caption, ctaButton, linksColumn, socialLink } =
    story.content;

  // copyright container the current year, copyright symbol and company name
  const copyright = `${new Date().getFullYear()} ${String.fromCharCode(
    0x00a9
  )} CV Maker B.V.`;

  // get the region name in the native language for the region selection trigger (menu)
  const localeKey = getLocale(args.request.url, args.context);
  const locale = new Intl.Locale(localeKey);

  const regionNamesInNative = new Intl.DisplayNames([locale.language], {
    type: "region",
  });
  const region = regionNamesInNative.of(locale.region ?? "") ?? "";

  return {
    component: story.content.component,
    props: {
      ctaBanner: {
        title,
        subtitle,
        caption,
        link: {
          to: ctaButton[0].to?.cached_url as string,
          content: ctaButton[0].content,
        },
      },
      footerTop: {
        columns: linksColumn.map((column) => {
          const { _uid, title, links } = column;

          return {
            id: _uid,
            title,
            links: links.map((link) => {
              const { _uid, content, to } = link;

              let url = "";
              if (to && to.linktype === "story") {
                url = `/${stripLocaleFromUrl(to.cached_url ?? "").url}`;
              }

              return {
                id: _uid,
                content,
                to: url,
              };
            }),
          };
        }),
      },
      footerBottom: {
        copyright,
        region,
        links: socialLink.map((sl) => {
          const { _uid, platform, to } = sl;

          let url = "";
          if (to.linktype === "url") {
            url = to?.cached_url ?? "";
          }

          return {
            id: _uid,
            content: platform,
            to: url,
          };
        }),
      },
    },
  };
};

type ComponentProps = {
  data: Awaited<ReturnType<typeof loader>>["props"];
};

export function Component(props: ComponentProps) {
  const { data } = props;
  const { ctaBanner, footerTop, footerBottom } = data;

  return (
    <footer className={footer.container}>
      <CtaBanner {...ctaBanner} />
      <section className={footer.innerContainer}>
        <FooterTop {...footerTop} />
        <FooterBottom {...footerBottom} />
      </section>
    </footer>
  );
}

// CTA banner ==============
type CtaBannerProps = ComponentProps["data"]["ctaBanner"];

/**
 *
 * Display the section above the footer that sends people to the builder
 */
function CtaBanner(props: CtaBannerProps) {
  const { title, subtitle, caption, link } = props;

  return (
    <section className={ctaBanner.container}>
      <div className={ctaBanner.shape1}></div>

      <div className={ctaBanner.shapeContainer}>
        <div className={ctaBanner.shape2}></div>
        <div className={ctaBanner.shape3}></div>
        <div className={ctaBanner.shape4}></div>
        <div className={ctaBanner.shape5}></div>
        <div className={ctaBanner.shape6}></div>
      </div>

      <div className={ctaBanner.innerContainer}>
        <header>
          <h2 className={ctaBanner.heading}>{title}</h2>
        </header>

        <p className={ctaBanner.subtitle}>{subtitle}</p>

        <Button size="intro" href={link.to}>
          <Button.Label>{link.content}</Button.Label>
        </Button>

        <p className={ctaBanner.caption}>
          <span className={ctaBanner.captionIcon}>
            <IconCheckCircle />
          </span>
          <span>{caption}</span>
        </p>
      </div>
    </section>
  );
}

// FooterTop ==========
type FooterTopProps = ComponentProps["data"]["footerTop"];

/**
 * Display the section of the footer that contains links columns
 */
function FooterTop(props: FooterTopProps) {
  const { columns } = props;

  return (
    <div className={footerTop.innerContainer}>
      <div className={footerTop.logoContainer}>
        <img className={footerTop.logo} src={cvMakerLogo} alt="" />
      </div>
      {/* columns */}
      <nav className={footerTop.linksContainer}>
        {columns.map((column) => {
          const { id, title, links } = column;
          return (
            <section key={id} className={footerTop.column}>
              <h2 className={footerTop.columnTitle}>{title}</h2>
              <ul className={footerTop.columnList}>
                {/* link list in columns */}
                {links.map((link) => {
                  console.log("link.to", link.to);
                  return (
                    <li key={link.id} className={footerTop.columnListItem}>
                      <RouterLink
                        className={footerTop.columnListItemLink}
                        to={link.to}
                      >
                        {link.content}
                      </RouterLink>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </nav>
    </div>
  );
}

// FooterBottom ==========
type FooterBottomProps = ComponentProps["data"]["footerBottom"];

const socialIcons = {
  twitter: <IconSocialTwitter />,
  linkedin: <IconSocialLinkedin />,
  facebook: <IconSocialFacebook />,
};

const LANGUAGE_ICONS: Record<string, React.FC<IconProps>> = {
  NL: FlagNL,
  BE: FlagBE,
  GB: FlagUK,
  DE: FlagDE,
  FR: FlagFR,
  ES: FlagES,
  IT: FlagIT,
  PT: FlagPT,
  PL: FlagPL,
  SE: FlagSE,
  NO: FlagNO,
  DK: FlagDK,
  TR: FlagTR,
  HU: FlagHU,
  RO: FlagRO,
  RU: FlagRU,
  UA: FlagUA,
  US: FlagUS,
  MX: FlagMX,
  PE: FlagPE,
  AR: FlagAR,
  CL: FlagCL,
};

const localeOptions = Object.entries(locales).flatMap(([local, config]) => {
  const intlLocale = new Intl.Locale(local);

  const { language, region } = intlLocale;

  // Skip the entry if region is not defined
  if (!region) {
    return [];
  }

  // Get region in the language of the locale
  const regionLanguage = new Intl.DisplayNames([language], { type: "region" });
  const regionNameInNative = regionLanguage.of(region);

  if (!regionNameInNative) {
    return [];
  }

  const url = `https://${config.production.hostname}`;

  // Get flag icon
  const Icon = LANGUAGE_ICONS[region] || FlagPlaceholder;

  return {
    id: local,
    url,
    region: regionNameInNative,
    Icon,
  };
});

/**
 * Dislpay the section of the footer that social links and locale dropdown
 */
function FooterBottom(props: FooterBottomProps) {
  const { links, copyright, region } = props;

  return (
    <div className={footerBottom.container}>
      <img className={footerBottom.logo} src={cvMakerLogo} alt="" />

      <div className={footerBottom.copyright}>{copyright}</div>

      <div className={footerBottom.socialIconContainer}>
        {links.map((link) => {
          const { id, content: platform, to } = link;

          return (
            <a href={to} key={id} className={footerBottom.socialIcon}>
              {socialIcons[platform]}
            </a>
          );
        })}
      </div>

      <Menu.Trigger>
        <Menu.Button>
          <Menu.Icon>
            <IconGlobe />
          </Menu.Icon>
          <Menu.Label>{region}</Menu.Label>
        </Menu.Button>
        <Menu items={localeOptions}>
          {(locale) => (
            <Menu.Item key={locale.id} textValue={locale.region}>
              <Menu.Icon>
                <locale.Icon />
              </Menu.Icon>
              <Menu.Label>{locale.region}</Menu.Label>
            </Menu.Item>
          )}
        </Menu>
      </Menu.Trigger>
    </div>
  );
}
