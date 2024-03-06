import { useControlledState } from "~/hooks/useControlledState";
import { useSlot } from "~/hooks/useSlot";
import type { IntlShape } from "react-intl";
import { useIntl } from "react-intl";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as React from "react";
import type { AriaFieldProps, FieldAria } from "react-aria";
import { useField } from "react-aria";
import { Field } from "../Field";
import { avatarUpload } from "./AvatarUpload.css";
import { AvatarUploadContextualHelp } from "./AvatarUploadContextualHelp";
import { AvatarUploadErrorMessage } from "./AvatarUploadErrorMessage";
import { AvatarUploadInput } from "./AvatarUploadInput";
import { AvatarUploadLabel } from "./AvatarUploadLabel";
import type { AvatarUploadResetProps } from "./AvatarUploadReset";
import { AvatarUploadReset } from "./AvatarUploadReset";

export type Transform = {
  scale: number;
  translate: [number, number];
};

type AvatarUploadContextValue = {
  translations: Translations;
  props: {
    labelProps: FieldAria["labelProps"];
    fieldProps: FieldAria["fieldProps"];
    errorMessageProps: FieldAria["errorMessageProps"];
    inputProps: {
      value?: string;
      name?: string;
      autoComplete?: string;
      onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    dialogProps: {
      value?: string;
      onChange?: (file: File) => void;
      transform?: Transform;
      onTransformChange?: (transform: Transform) => void;
    };
    resetProps: Pick<AvatarUploadResetProps, "onPress">;
  };
  state: {
    file: {
      value?: string;
      setValue: (value?: string) => void;
    };
    transform: {
      value?: Transform;
      setValue: (value?: Transform) => void;
    };
  };
  refs: {
    inputRef: React.RefObject<HTMLInputElement>;
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
  };
};

export const AvatarUploadContext =
  React.createContext<AvatarUploadContextValue>({
    translations: {
      dialogTitle: "",
      zoomLabel: "",
    },
    state: {
      file: {
        value: undefined,
        setValue: () => {},
      },
      transform: {
        value: undefined,
        setValue: () => {},
      },
    },
    props: {
      labelProps: {},
      fieldProps: {},
      errorMessageProps: {},
      inputProps: {},
      dialogProps: {},
      resetProps: {},
    },
    refs: {
      inputRef: React.createRef<HTMLInputElement>(),
      labelRef: () => {},
      errorMessageRef: () => {},
    },
  });

type Translations = {
  /**
   * Title which is displayed in the dialog where the user can crop the image.
   */
  dialogTitle: string;
  /**
   * Label for the zoom slider, with which the user can scale the image.
   */
  zoomLabel: string;
};

const getTranslations = (
  intl: IntlShape,
  overides: Partial<Translations>
): Translations => ({
  dialogTitle: intl.formatMessage({
    id: "components.avatarUpload.avatarUploadDialogTitle",
    description:
      "Title which is used for the dialog when changing the position or scale of the avatar",
    defaultMessage: "Edit Avatar",
  }),
  zoomLabel: intl.formatMessage({
    id: "components.textEditor.avatarUploadDialogZoomInputLabel",
    defaultMessage: "Scale avatar",
    description:
      "Label which is used to change to scale of the uploaded avatar inside the avatar upload dialog",
  }),
  ...overides,
});

export type AvatarUploadProps = Omit<
  AriaFieldProps,
  "errorMessage" | "label" | "description"
> & {
  children?: React.ReactNode;
  /**
   * Avatar image value (controlled).
   */
  value?: string;
  /**
   * Avatar image value (uncontrolled).
   */
  defaultValue?: string;
  /**
   * Transform value used to apply filter (controlled).
   */
  transform?: Transform;
  /**
   * Transform value used to apply filter (uncontrolled).
   */
  defaultTransform?: Transform;
  /**
   * Triggered on every file upload.
   */
  onChange?: (value?: File) => void;
  /**
   * Triggered on when transform changes are saved.
   */
  onTransformChange?: (transform?: Transform) => void;
  /**
   * The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
  /**
   * Translations which can be overriden in the component.
   *
   * @default {}
   */
  translations?: Partial<Translations>;
};

/**
 * Component which allows custom text entries with a keyboard
 */
export function AvatarUpload(props: AvatarUploadProps) {
  const {
    children,
    // Transform
    transform,
    defaultTransform,
    onTransformChange,
    // Input
    value,
    defaultValue,
    name,
    autoComplete,
    onChange,
    // Translation strings
    translations = {},
  } = props;

  const intl = useIntl();

  const [fileValue, setFileValue] = useControlledState(value, defaultValue);
  const [transformValue, setTransformValue] = useControlledState(
    transform,
    defaultTransform,
    onTransformChange
  );

  const [labelRef, label] = useSlot();
  const [errorMessageRef, errorMessage] = useSlot();

  const inputRef = React.useRef<HTMLInputElement>(null!);

  const { labelProps, fieldProps, errorMessageProps } = useField({
    ...props,
    label,
    errorMessage,
  });

  const handleFileChange = (file: File) => {
    onChange && onChange(file);

    setTransformValue({
      scale: 1,
      translate: [0, 0],
    });
    setFileValue(file ? URL.createObjectURL(file) : "");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (!files || files.length === 0) {
      return;
    }

    handleFileChange(files[0]);

    event.currentTarget.value = "";
  };

  const handleReset = () => {
    onChange && onChange(undefined);

    setFileValue("");
    setTransformValue({
      scale: 1,
      translate: [0, 0],
    });

    inputRef.current?.focus();
  };

  const inputProps = {
    name,
    autoComplete,
    onChange: handleInputChange,
  };

  const dialogProps = {
    value: fileValue,
    // NOTE: This uses a type cast because the useControlledState hook marks every value as possibly undefined
    transform: transformValue,
    onChange: handleFileChange,
    onTransformChange: setTransformValue,
  };

  const resetProps = {
    onPress: handleReset,
  };

  return (
    <div
      className={avatarUpload.container}
      style={assignInlineVars({
        [avatarUpload.vars.translateX]: `${transformValue?.translate[0] ?? 0}%`,
        [avatarUpload.vars.translateY]: `${transformValue?.translate[1] ?? 0}%`,
        [avatarUpload.vars.scale]: `${transformValue?.scale ?? 1}`,
      })}
    >
      <AvatarUploadContext.Provider
        value={{
          translations: getTranslations(intl, translations),
          props: {
            labelProps,
            fieldProps,
            errorMessageProps,
            inputProps,
            dialogProps,
            resetProps,
          },
          state: {
            file: {
              value: fileValue,
              setValue: setFileValue,
            },
            transform: {
              value: transformValue,
              setValue: setTransformValue,
            },
          },
          refs: {
            inputRef,
            labelRef,
            errorMessageRef,
          },
        }}
      >
        <Field>{children}</Field>
      </AvatarUploadContext.Provider>
    </div>
  );
}

AvatarUpload.Input = AvatarUploadInput;
AvatarUpload.Label = AvatarUploadLabel;
AvatarUpload.ErrorMessage = AvatarUploadErrorMessage;
AvatarUpload.Reset = AvatarUploadReset;
AvatarUpload.ContextualHelp = AvatarUploadContextualHelp;
