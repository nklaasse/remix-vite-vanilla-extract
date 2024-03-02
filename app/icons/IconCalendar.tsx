import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconCalendarProps = Omit<BaseProps, "children">;

export function IconCalendar(props: IconCalendarProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M17 4h-2V2h-2v2h-2V2H9v2H7V2H5v2H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm-1 12H4V7h12v9Z"
      />
      <path
        fill="currentColor"
        d="M8 9H6v2h2V9ZM11 9H9v2h2V9ZM8 12H6v2h2v-2ZM11 12H9v2h2v-2ZM14 9h-2v2h2V9ZM14 12h-2v2h2v-2Z"
      />
    </Base>
  );
}
