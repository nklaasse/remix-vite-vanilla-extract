import React from "react";
import { image } from "./Image.css";

export type ImageProps = {
  /**
   * The path to the image you want to embed
   */
  src: string;
  /**
   * The alternative text description of the image
   */
  alt: string;
};

/**
 * Image returns a full width img element
 */
export const Image = function (props: ImageProps) {
  const { src, alt } = props;

  return <img src={src} alt={alt ? alt : ""} className={image} />;
};
