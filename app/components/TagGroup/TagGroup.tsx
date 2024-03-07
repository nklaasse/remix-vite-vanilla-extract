import { createElementTypeContext } from "~/components/ElementType";
import { Field } from "~/components/Field";
import type { TagGroupProps as ReactAriaTagGroupProps } from "react-aria-components";
import {
  InputContext,
  TagGroup as ReactAriaTagGroup,
} from "react-aria-components";
import { TagGroupErrorMessage } from "./TagGroupErrorMessage";
import { TagGroupLabel } from "./TagGroupLabel";
import { TagGroupList } from "./TagGroupList";
import { TagGroupTag } from "./TagGroupTag";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "root" | "select"
>();

export type TagGroupProps = ReactAriaTagGroupProps & {
  /**
   * The name of the TagGroup, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
};

export function TagGroup(props: TagGroupProps) {
  const { children, name, ...otherProps } = props;

  return (
    <ElementTypeProvider type="root">
      <Field>
        <ReactAriaTagGroup {...otherProps}>
          <InputContext.Provider
            value={{
              type: "hidden",
              name,
            }}
          >
            {children}
          </InputContext.Provider>
        </ReactAriaTagGroup>
      </Field>
    </ElementTypeProvider>
  );
}

TagGroup.Label = TagGroupLabel;
TagGroup.Tag = TagGroupTag;
TagGroup.List = TagGroupList;
TagGroup.ErrorMessage = TagGroupErrorMessage;
