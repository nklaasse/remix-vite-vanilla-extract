import { IconProvider } from "~/icons/IconProvider";
import { mergeRefs } from "~/utils/mergeRefs";
import * as React from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton } from "react-aria";
import { inputGroupButton } from "./InputGroupButton.css";

type InputGroupButtonProps = Omit<
  AriaButtonProps,
  "elementType" | "href" | "target" | "rel"
> & {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

/**
 * InputGroupButton can be used as additionaly triggers which have relation to the value entered in the InputGroup
 */
export const InputGroupButton = React.forwardRef(function InputGroupButton(
  props: InputGroupButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { children } = props;

  const defaultButtonRef = React.useRef<HTMLButtonElement>(null);
  const buttonRef = mergeRefs(defaultButtonRef, ref);

  const { buttonProps } = useButton(props, defaultButtonRef);

  return (
    <button
      className={inputGroupButton.container}
      {...buttonProps}
      ref={buttonRef}
    >
      <IconProvider aria-hidden>{children}</IconProvider>
    </button>
  );
});
