import classnames from "classnames";
import React from "react";
import { avatar } from "./Avatar.css";

export type AvatarProps = {
  /**
   * The URL of the image.
   */
  src: string;
  /**
   * Text description of the image.
   *
   * @default ''
   */
  alt?: string;
  /**
   * The size of the avatar.
   *
   * @default 'default'
   */
  size?: keyof typeof avatar.variants.sizes;
};

/**
 * A thumbnail representation of given image.
 */
export function Avatar(props: AvatarProps) {
  const { src, alt = "", size = "default" } = props;

  return (
    <div className={classnames(avatar.container, avatar.variants.sizes[size])}>
      <img className={avatar.image} src={src} alt={alt} />
    </div>
  );
}
