import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconLogoutProps = Omit<BaseProps, "children">;

export function IconLogout(props: IconLogoutProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M13 16H5V4h8a1 1 0 1 0 0-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a1 1 0 0 0 0-2Z"
      />
      <path
        fill="currentColor"
        d="m16.7 9.3-3-3a1 1 0 0 0-1.4 1.4L13.58 9H8a1 1 0 0 0 0 2h5.59l-1.3 1.3a1 1 0 1 0 1.42 1.4l3-3a1 1 0 0 0 0-1.4Z"
      />
    </Base>
  );
}
