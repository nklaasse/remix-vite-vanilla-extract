import { Button } from "~/components/Button";
import { IconChevronBlockEnd } from "~/icons/IconChevronBlockEnd";
import { IconCross } from "~/icons/IconCross";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Close",
  },
  argTypes: {
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (props) => {
    const { children, ...buttonProps } = props;

    return (
      <Button {...buttonProps}>
        <Button.Label>{children as string}</Button.Label>
      </Button>
    );
  },
};

export const Link: Story = {
  render: (props) => {
    const { children, ...buttonProps } = props;

    return (
      <Button {...buttonProps} href="https://cvmaker.nl">
        <Button.Label>{children as string}</Button.Label>
      </Button>
    );
  },
};

export const Icon: Story = {
  render: (props) => {
    const { children, ...buttonProps } = props;

    return (
      <Button {...buttonProps}>
        <Button.Icon>
          <IconCross />
        </Button.Icon>
        <Button.Label>{children as string}</Button.Label>
      </Button>
    );
  },
};

export const Reverse: Story = {
  render: (props) => {
    const { children, ...buttonProps } = props;

    return (
      <Button {...buttonProps}>
        <Button.Label>{children as string}</Button.Label>
        <Button.Icon>
          <IconCross />
        </Button.Icon>
      </Button>
    );
  },
};

export const IconOnly: Story = {
  render: (props) => {
    const { children, ...buttonProps } = props;

    return (
      <Button aria-label={children as string} {...buttonProps}>
        <Button.Icon>
          <IconCross />
        </Button.Icon>
      </Button>
    );
  },
};

export const IconAndLabel: Story = {
  render: (props) => {
    const { children, ...buttonProps } = props;

    return (
      <Button {...buttonProps}>
        <Button.Icon>
          <IconCross />
        </Button.Icon>
        <Button.Label>{children as string}</Button.Label>
      </Button>
    );
  },
};

export const MultipleIcons: Story = {
  render: (props) => {
    const { children, ...buttonProps } = props;

    return (
      <Button {...buttonProps}>
        <Button.Icon>
          <IconCross />
        </Button.Icon>
        <Button.Label>{children as string}</Button.Label>
        <Button.Icon>
          <IconCross />
        </Button.Icon>
      </Button>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },

  render: (props) => {
    const { children, ...buttonProps } = props;

    return (
      <Button aria-label={children as string} {...buttonProps}>
        <Button.Icon>
          <IconCross />
        </Button.Icon>
        <Button.Label>{children as string}</Button.Label>
      </Button>
    );
  },
};

export const Avatars: Story = {
  render: (props) => {
    const { children, ...buttonProps } = props;

    return (
      <Button {...buttonProps}>
        <Button.Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1" />
        <Button.Label>{children as string}</Button.Label>
      </Button>
    );
  },
};

const elements = {
  "Icon": (
    <Button.Icon>
      <IconChevronBlockEnd />
    </Button.Icon>
  ),
  "Label": <Button.Label>Message me</Button.Label>,
  "Avatar": (
    <Button.Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1" />
  ),
} as const;

function getPermutations<T>(options: Array<T>): Array<Array<T>> {
  const result: Array<Array<T>> = [];

  const permute = (arr: Array<T>, m: Array<T> = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(options);

  return result;
}

function getCombinations<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  const f = (prefix: T[], arr: T[]) => {
    for (let i = 0; i < arr.length; i++) {
      result.push([...prefix, arr[i]]);
      f([...prefix, arr[i]], arr.slice(i + 1));
    }
  };
  f([], arr);
  return result;
}

const options = getCombinations<keyof typeof elements>(
  Object.keys(elements) as Array<keyof typeof elements>
).flatMap(getPermutations);

export const Dynamic: Story = {
  argTypes: {
    children: {
      defaultValue: options[0].join(":"),
      options: options.map((keys) => keys.join(":")),
      mapping: options.reduce(
        (acc, keys) => ({
          ...acc,
          [keys.join(":")]: keys.map((key) => elements[key]),
        }),
        {}
      ),
      control: {
        type: "select",
      },
    },
  },

  render: (props) => {
    const { children, ...buttonProps } = props;

    return <Button {...buttonProps}>{children}</Button>;
  },
};
