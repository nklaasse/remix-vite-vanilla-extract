import type { MetaFunction } from "@remix-run/cloudflare";

export const meta = function meta() {
  return [{ title: "Oops!" }];
} satisfies MetaFunction;

export function ErrorBoundary() {
  return (
    <fieldset>
      <legend>_marketing</legend>
    </fieldset>
  );
}
