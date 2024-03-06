import { Link } from "~/components/Link";
import { IconArrowInlineEnd } from "~/icons/IconArrowInlineEnd";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Link",
  component: Link,
  args: {
    children: "Click me",
    href: "https://cvmaker.nl",
    target: "_blank",
  },
  argTypes: {
    label: {
      control: "text",
    },
    href: {
      control: "text",
    },
    target: {
      control: "text",
    },
  },
} as Meta<typeof Link>;

export const Default: StoryFn<typeof Link> = (props) => {
  const { href, target, children } = props;

  return (
    <Link href={href} target={target}>
      <Link.Label>{children}</Link.Label>
    </Link>
  );
};

Default.args = {};

export const Icon: StoryFn<typeof Link> = (props) => {
  const { href, target, children } = props;

  return (
    <Link href={href} target={target}>
      <Link.Label>{children}</Link.Label>
      <Link.Icon>
        <IconArrowInlineEnd />
      </Link.Icon>
    </Link>
  );
};

Icon.args = {};
