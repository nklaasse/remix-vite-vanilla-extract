import type { Meta, StoryFn } from "@storybook/react";
import { AvatarUpload } from "./AvatarUpload";

export default {
  title: "Components/AvatarUpload",
  component: AvatarUpload,
} as Meta<typeof AvatarUpload>;

export const Default: StoryFn<typeof AvatarUpload> = () => {
  return (
    <AvatarUpload>
      <AvatarUpload.Label>Photo</AvatarUpload.Label>
      <AvatarUpload.Input />
    </AvatarUpload>
  );
};

export const HiddenLabel: StoryFn<typeof AvatarUpload> = () => {
  return (
    <AvatarUpload aria-label="Photo">
      <AvatarUpload.Input />
    </AvatarUpload>
  );
};

export const Reset: StoryFn<typeof AvatarUpload> = () => {
  return (
    <AvatarUpload>
      <AvatarUpload.Label>Photo</AvatarUpload.Label>
      <AvatarUpload.Input />
      <AvatarUpload.Reset />
    </AvatarUpload>
  );
};

export const ContextualHelp: StoryFn<typeof AvatarUpload> = () => {
  return (
    <AvatarUpload>
      <AvatarUpload.Label>Photo</AvatarUpload.Label>
      <AvatarUpload.Input />
      <AvatarUpload.ContextualHelp>
        Upload an avatar with a maximum size of 5MB
      </AvatarUpload.ContextualHelp>
    </AvatarUpload>
  );
};
