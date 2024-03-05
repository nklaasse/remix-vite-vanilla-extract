import type { AvatarProps } from "~/components/Avatar";
import { Avatar } from "~/components/Avatar";
import * as React from "react";
import { mergeProps } from "react-aria";
import { ButtonContext } from "./Button";
import { buttonAvatar } from "./ButtonAvatar.css";

export type ButtonAvatarProps = Omit<AvatarProps, "size">;

export function ButtonAvatar(props: ButtonAvatarProps) {
  const context = React.useContext(ButtonContext);

  const { avatarProps } = context.props;

  return (
    <span className={buttonAvatar.container}>
      <Avatar {...mergeProps(props, avatarProps)} />
    </span>
  );
}
