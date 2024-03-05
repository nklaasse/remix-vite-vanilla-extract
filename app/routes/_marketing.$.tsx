import { json } from "@remix-run/cloudflare";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Button } from "~/components/Button/Button";
import { Badge } from "~/components/Badge";

export const loader = async function loader() {
  return json({});
} satisfies LoaderFunction;

export const action = async function action() {
  return json({});
} satisfies ActionFunction;

export const meta = function meta() {
  return [];
} satisfies MetaFunction<typeof loader>;

export default function Index() {
  return (
    <fieldset>
      <legend>_marketing.$</legend>
      <Badge>Default</Badge>
      <Button variant="secondary">
        <Button.Label>Primary</Button.Label>
      </Button>
    </fieldset>
  );
}
