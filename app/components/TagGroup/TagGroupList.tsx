import { Field } from "~/components/Field";
import type { TagListProps as ReactAriaTagListProps } from "react-aria-components";
import { TagList as ReactAriaTagList } from "react-aria-components";
import { ElementTypeProvider } from "./TagGroup";
import { tagGroupList } from "./TagGroupList.css";

export type TagGroupListProps<T> = ReactAriaTagListProps<T>;

export function TagGroupList<T extends object>(props: TagGroupListProps<T>) {
  const { children, ...otherProps } = props;
  return (
    <ElementTypeProvider type="select">
      <Field.Input>
        <ReactAriaTagList className={tagGroupList.container} {...otherProps}>
          {children}
        </ReactAriaTagList>
      </Field.Input>
    </ElementTypeProvider>
  );
}
