import { InfoAlert } from "~/components/InfoAlert";
import { Link } from "~/components/Link";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/InfoAlert",
  component: InfoAlert,
} as Meta<typeof InfoAlert>;

export const Default: StoryFn<typeof InfoAlert> = () => {
  return (
    <InfoAlert>
      <InfoAlert.Description>
        Something went wrong. Please try again. If the problem persists, please
        don&apos;t hesitate to contact our support at{" "}
        <Link href="mailto:support@me.com">
          <Link.Label>support@me.com . We&apos;re happy</Link.Label>
        </Link>{" "}
        to help!
      </InfoAlert.Description>
    </InfoAlert>
  );
};

export const Title: StoryFn<typeof InfoAlert> = () => {
  return (
    <InfoAlert>
      <InfoAlert.Title>Something went wrong</InfoAlert.Title>
      <InfoAlert.Description>
        Please try again. If the problem persists, please don&apos;t hesitate to
        contact our support at{" "}
        <Link href="mailto:support@me.com">
          <Link.Label>support@me.com</Link.Label>
        </Link>
        . We&apos;re happy to help!
      </InfoAlert.Description>
    </InfoAlert>
  );
};

export const Error: StoryFn<typeof InfoAlert> = () => {
  return (
    <InfoAlert type="error">
      <InfoAlert.Description>
        Something went wrong. Please try again. If the problem persists, please
        don&apos;t hesitate to contact our support at{" "}
        <Link href="mailto:support@me.com">
          <Link.Label>support@me.com</Link.Label>
        </Link>
        . We&apos;re happy to help!
      </InfoAlert.Description>
    </InfoAlert>
  );
};
