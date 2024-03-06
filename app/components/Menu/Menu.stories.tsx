import { Menu } from "~/components/Menu";
import { FlagDE } from "~/icons/FlagDE";
import { FlagFR } from "~/icons/FlagFR";
import { FlagNL } from "~/icons/FlagNL";
import { FlagUK } from "~/icons/FlagUK";
import { IconChevronInlineEnd } from "~/icons/IconChevronInlineEnd";
import { IconExternalLink } from "~/icons/IconExternalLink";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

const DOMAINS = [
  {
    flag: <FlagNL />,
    country: "Netherlands",
    language: "Nederland",
    url: "https://cvmaker.nl",
  },
  {
    flag: <FlagFR />,
    country: "France",
    language: "Français",
    url: "https://cvmaker.fr",
  },
  {
    flag: <FlagDE />,
    country: "Deutschland",
    language: "Deutsch",
    url: "https://cvmaker.de",
  },
  {
    flag: <FlagUK />,
    country: "United Kingdom",
    language: "English",
    url: "https://cvmaker.uk",
  },
];

export default {
  title: "Components/Menu",
  component: Menu,
} as Meta<typeof Menu>;

export const Default: StoryFn<typeof Menu> = () => {
  return (
    <Menu items={DOMAINS}>
      {(domain) => (
        <Menu.Item
          key={domain.country}
          id={domain.country}
          textValue={domain.country}
        >
          <Menu.Label>{domain.language}</Menu.Label>
        </Menu.Item>
      )}
    </Menu>
  );
};

export const Description: StoryFn<typeof Menu> = () => {
  return (
    <Menu items={DOMAINS}>
      {(domain) => (
        <Menu.Item
          key={domain.country}
          id={domain.country}
          textValue={domain.country}
        >
          <Menu.Label>{domain.language}</Menu.Label>
          <Menu.Description>{domain.country}</Menu.Description>
        </Menu.Item>
      )}
    </Menu>
  );
};

export const Icon: StoryFn<typeof Menu> = () => {
  return (
    <Menu items={DOMAINS}>
      {(domain) => (
        <Menu.Item
          key={domain.country}
          id={domain.country}
          textValue={domain.country}
        >
          <Menu.Icon>{domain.flag}</Menu.Icon>
          <Menu.Label>{domain.language}</Menu.Label>
        </Menu.Item>
      )}
    </Menu>
  );
};

export const Link: StoryFn<typeof Menu> = () => {
  return (
    <Menu items={DOMAINS}>
      {(domain) => (
        <Menu.Item
          key={domain.country}
          id={domain.country}
          textValue={domain.country}
          href={domain.url}
          target="_blank"
        >
          <Menu.Icon>{domain.flag}</Menu.Icon>
          <Menu.Label>{domain.language}</Menu.Label>
          <Menu.Indicator>
            <IconExternalLink />
          </Menu.Indicator>
        </Menu.Item>
      )}
    </Menu>
  );
};

export const DescriptionAndIcon: StoryFn<typeof Menu> = () => {
  return (
    <Menu items={DOMAINS}>
      {(domain) => (
        <Menu.Item
          key={domain.country}
          id={domain.country}
          textValue={domain.country}
        >
          <Menu.Icon>{domain.flag}</Menu.Icon>
          <Menu.Label>{domain.language}</Menu.Label>
          <Menu.Description>{domain.country}</Menu.Description>
        </Menu.Item>
      )}
    </Menu>
  );
};

export const Trigger: StoryFn<typeof Menu> = () => {
  return (
    <Menu.Trigger>
      <Menu.Button>
        <Menu.Icon>
          <FlagNL />
        </Menu.Icon>
        <Menu.Label>Nederland</Menu.Label>
      </Menu.Button>

      <Menu items={DOMAINS}>
        {(domain) => (
          <Menu.Item
            id={domain.country}
            key={domain.country}
            textValue={domain.country}
          >
            <Menu.Icon>{domain.flag}</Menu.Icon>
            <Menu.Label>{domain.language}</Menu.Label>
            <Menu.Description>{domain.country}</Menu.Description>
          </Menu.Item>
        )}
      </Menu>
    </Menu.Trigger>
  );
};

export const DisabledItems: StoryFn<typeof Menu> = () => {
  return (
    <Menu items={DOMAINS} disabledKeys={["United Kingdom"]}>
      {(domain) => (
        <Menu.Item
          id={domain.country}
          key={domain.country}
          textValue={domain.country}
        >
          <Menu.Label>{domain.language}</Menu.Label>
        </Menu.Item>
      )}
    </Menu>
  );
};

type MenuItem = {
  label: string;
  badge?: string;
  Indicator?: React.JSXElementConstructor<object>;
};

type MenuSection = {
  key: string;
  title?: string;
  items: MenuItem[];
};

const MENU: MenuSection[] = [
  {
    key: "account",
    title: "Account",
    items: [
      {
        label: "Subscriptions",
        badge: "Upgrade",
      },
      {
        label: "Settings",
      },
      {
        label: "Notifications",
      },
    ],
  },
  {
    key: "actions",
    items: [
      {
        label: "Logout",
        Indicator: IconChevronInlineEnd,
      },
    ],
  },
];

export const Badge = () => {
  return (
    <Menu items={MENU.flatMap((section) => section.items)}>
      {(item) => (
        <Menu.Item key={item.label} id={item.label} textValue={item.label}>
          <Menu.Label>{item.label}</Menu.Label>
          {item.badge ? <Menu.Badge>{item.badge}</Menu.Badge> : null}
        </Menu.Item>
      )}
    </Menu>
  );
};

export const Indicator = () => {
  return (
    <Menu items={MENU.flatMap((section) => section.items)}>
      {(item) => (
        <Menu.Item key={item.label} id={item.label} textValue={item.label}>
          <Menu.Label>{item.label}</Menu.Label>
          {item.Indicator ? (
            <Menu.Indicator>
              <item.Indicator />
            </Menu.Indicator>
          ) : null}
        </Menu.Item>
      )}
    </Menu>
  );
};

export const ComplexItem = () => {
  return (
    <Menu>
      <Menu.Item id="item" textValue="Item 1">
        <Menu.Icon>
          <FlagNL />
        </Menu.Icon>
        <Menu.Label>Netherlands</Menu.Label>
        <Menu.Description>Country in Europe</Menu.Description>
        <Menu.Badge>Place to live</Menu.Badge>
        <Menu.Indicator>
          <IconChevronInlineEnd />
        </Menu.Indicator>
      </Menu.Item>
    </Menu>
  );
};

export const Sections = () => {
  return (
    <Menu items={MENU}>
      {(section) => (
        <React.Fragment key={section.key}>
          {section.title ? null : <Menu.Separator />}
          <Menu.Section id={section.key} items={section.items}>
            {section.title ? <Menu.Header>{section.title}</Menu.Header> : null}
            <Menu.Collection items={section.items}>
              {(item) => (
                <Menu.Item
                  key={item.label}
                  id={item.label}
                  textValue={item.label}
                >
                  <Menu.Label>{item.label}</Menu.Label>
                  {item.badge ? <Menu.Badge>{item.badge}</Menu.Badge> : null}
                  {item.Indicator ? (
                    <Menu.Indicator>
                      <IconChevronInlineEnd />
                    </Menu.Indicator>
                  ) : null}
                </Menu.Item>
              )}
            </Menu.Collection>
          </Menu.Section>
        </React.Fragment>
      )}
    </Menu>
  );
};

export const SectionsNoTitles = () => {
  return (
    <Menu items={MENU}>
      {(section) => (
        <Menu.Section
          key={section.title}
          id={section.title}
          items={section.items}
        >
          {(item) => (
            <Menu.Item key={item.label} id={item.label} textValue={item.label}>
              <Menu.Label>{item.label}</Menu.Label>
              {item.badge ? <Menu.Badge>{item.badge}</Menu.Badge> : null}
              {item.Indicator ? (
                <Menu.Indicator>
                  <IconChevronInlineEnd />
                </Menu.Indicator>
              ) : null}
            </Menu.Item>
          )}
        </Menu.Section>
      )}
    </Menu>
  );
};
