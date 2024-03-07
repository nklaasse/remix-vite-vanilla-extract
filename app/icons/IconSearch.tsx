import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconSearchProps = Omit<BaseProps, "children">;

export function IconSearch(props: IconSearchProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M9 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM9 4C6.243 4 4 6.243 4 9s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5ZM17.707 16.293 15.314 13.9c-.411.529-.885 1.003-1.414 1.414l2.393 2.393c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414Z"
      />
    </Base>
  );
}
