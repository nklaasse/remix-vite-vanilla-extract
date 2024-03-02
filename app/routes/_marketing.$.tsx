import { json } from "@remix-run/cloudflare";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { FlagAR } from "~/icons/FlagAR";
import { FlagNL } from "~/icons/FlagNL";
import { Button } from "~/components/Button/Button";

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
      Nice Content
      <FlagNL />
      <FlagAR />
      <Button>
        <Button.Label>Click me</Button.Label>
      </Button>
    </fieldset>
  );
}
