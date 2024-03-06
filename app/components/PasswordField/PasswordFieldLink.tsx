import type { LinkLabelProps, LinkProps } from "~/components/Link";
import { Link } from "~/components/Link";
import { Field } from "../Field";
import { passwordFieldLink } from "./PasswordFieldLink.css";

export type PasswordFieldLinkProps = Omit<LinkProps, "children"> &
  Pick<LinkLabelProps, "children">;

export function PasswordFieldLink(props: PasswordFieldLinkProps) {
  return (
    <Field.ValueLabel>
      <span className={passwordFieldLink.container}>
        <Link {...props}>
          <Link.Label>{props.children}</Link.Label>
        </Link>
      </span>
    </Field.ValueLabel>
  );
}
