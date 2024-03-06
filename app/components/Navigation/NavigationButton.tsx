import type { ButtonProps, LinkButtonProps } from "~/components/Button";
import { Button } from "~/components/Button";
import { ElementTypeProvider, useElementType } from "./Navigation";
import { railButton } from "./NavigationButton.css";

type RailButtonProps = Omit<ButtonProps, "variant" | "size"> &
  Required<Pick<ButtonProps, "aria-label">>;
type RailLinkButtonProps = Omit<LinkButtonProps, "variant" | "size"> &
  Required<Pick<LinkButtonProps, "aria-label">>;

function RailButton(props: RailButtonProps | RailLinkButtonProps) {
  const { children, ...otherProps } = props;

  return (
    <ElementTypeProvider type="button">
      <div className={railButton.container}>
        <Button {...otherProps} variant="tertiary" size="default">
          {children}
        </Button>
      </div>
    </ElementTypeProvider>
  );
}

type NavigationBackProps = RailButtonProps | RailLinkButtonProps;

export function NavigationButton(props: NavigationBackProps) {
  const { children, ...otherProps } = props;

  const type = useElementType();

  switch (type) {
    case "rail":
      return <RailButton {...otherProps}>{children}</RailButton>;
    default:
      return null;
  }
}
