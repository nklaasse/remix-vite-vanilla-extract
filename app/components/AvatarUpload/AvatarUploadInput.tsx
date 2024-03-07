import { Button } from "~/components/Button";
import { Dialog } from "~/components/Dialog";
import { Field } from "~/components/Field";
import { InputGroup } from "~/components/InputGroup";
import { Slider } from "~/components/Slider";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import { useIntl } from "react-intl";
import { mergeRefs } from "~/utils/mergeRefs";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import classNames from "classnames";
import * as React from "react";
import type { AriaButtonProps, FileDropItem } from "react-aria";
import {
  useButton,
  useKeyboard,
  usePress,
  useDrop,
  useMove,
  useOverlayTrigger,
  mergeProps,
  useFocusRing,
  useHover,
} from "react-aria";
import { unstable_batchedUpdates } from "react-dom";
import type { OverlayTriggerState } from "react-stately";
import { useOverlayTriggerState } from "react-stately";
import type { Transform } from "./AvatarUpload";
import { AvatarUploadContext } from "./AvatarUpload";
import { avatarUpload } from "./AvatarUpload.css";
import {
  avatarUploadCrop,
  avatarUploadDialog,
  avatarUploadInput,
  avatarUploadInputDialogTrigger,
} from "./AvatarUploadInput.css";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

/**
 * Convert a 2d matrix to css transform values
 */
function decomposeDOMMatrix(m: DOMMatrixReadOnly) {
  const E = (m.a + m.d) / 2;
  const F = (m.a - m.d) / 2;
  const G = (m.c + m.b) / 2;
  const H = (m.c - m.b) / 2;

  const Q = Math.sqrt(E * E + H * H);
  const R = Math.sqrt(F * F + G * G);
  const a1 = Math.atan2(G, F);
  const a2 = Math.atan2(H, E);
  const theta = (a2 - a1) / 2;
  const phi = (a2 + a1) / 2;

  // The requested parameters are then theta,
  // sx, sy, phi,
  return {
    translateX: m.e,
    translateY: m.f,
    rotate: (-phi * 180) / Math.PI,
    scaleX: Q + R,
    scaleY: Q - R,
    skew: (-theta * 180) / Math.PI,
  };
}

function getElementScale(element: HTMLElement) {
  return decomposeDOMMatrix(
    new DOMMatrixReadOnly(window.getComputedStyle(element).transform)
  ).scaleX;
}

type AvatarUploadCropProps = {
  url: string;
  onChange: (value: [number, number]) => void;
};

/**
 * @private
 *
 * Renderes the image and crop indicator, handles moving the image.
 */
const AvatarUploadCrop = React.forwardRef(function AvatarUploadCrop(
  props: AvatarUploadCropProps,
  ref: React.ForwardedRef<HTMLImageElement>
) {
  const { url, onChange } = props;

  const defaultImageRef = React.useRef<HTMLImageElement>(null!);
  const imageRef = mergeRefs(defaultImageRef, ref);

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [orientation, setOrientation] =
    React.useState<keyof typeof avatarUploadCrop.variants.orientation>(
      "portrait"
    );

  const { hoverProps, isHovered } = useHover({});

  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    within: true,
  });

  const { moveProps } = useMove({
    onMove(event) {
      if (event.shiftKey && event.pointerType === "keyboard") {
        // Give the user the ability to quickly zoom move through the full canvas.
        const scale = getElementScale(defaultImageRef.current);

        const { width: originalWidth, height: originalHeight } =
          defaultImageRef.current;

        const canvasSize = Math.min(originalWidth, originalHeight);

        const currentWidth = originalWidth * scale;
        const currentHeight = originalHeight * scale;

        const overlapX = currentWidth - canvasSize;
        const overlapY = currentHeight - canvasSize;

        // If the user preses shift, we want to move the image by 10% of the overlap or 10px, whichever is smaller.
        const step = Math.max(10, Math.min(overlapX / 10, overlapY / 10));

        onChange([step * event.deltaX, step * event.deltaY]);
      } else {
        onChange([event.deltaX, event.deltaY]);
      }
    },
  });

  React.useEffect(() => {
    setIsLoaded(false);
  }, [url]);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    unstable_batchedUpdates(() => {
      setIsLoaded(true);

      if (
        event.currentTarget.naturalWidth > event.currentTarget.naturalHeight
      ) {
        setOrientation("landscape");
      } else {
        setOrientation("portrait");
      }
    });
  };

  const canvasRef = React.useRef<HTMLDivElement>(null);

  const [canvasWidth, setCanvasWidth] = React.useState(0);
  const [canvasHeight, setCanvasHeight] = React.useState(0);

  const onResize = React.useCallback(() => {
    if (canvasRef.current) {
      const { clientWidth, clientHeight } = canvasRef.current;

      unstable_batchedUpdates(() => {
        setCanvasWidth(clientWidth);
        setCanvasHeight(clientHeight);
      });
    }
  }, [setCanvasWidth, setCanvasHeight]);

  useResizeObserver({
    ref: canvasRef,
    onResize: onResize,
  });

  return (
    <div
      {...mergeProps(focusProps, hoverProps)}
      style={assignInlineVars({
        [avatarUploadCrop.vars.canvasWidth]: `${canvasWidth}px`,
        [avatarUploadCrop.vars.canvasHeight]: `${canvasHeight}px`,
      })}
      className={classNames(
        avatarUploadCrop.container,
        avatarUploadCrop.variants.orientation[orientation],
        {
          [avatarUploadCrop.states.isLoaded]: isLoaded,
          [avatarUploadCrop.states.isFocusVisible]: isFocusVisible,
          [avatarUploadCrop.states.isFocused]: isFocused,
          [avatarUploadCrop.states.isHovered]: isHovered,
        }
      )}
    >
      <div className={avatarUploadCrop.canvas} ref={canvasRef}>
        <div className={avatarUploadCrop.wrapper} tabIndex={0} {...moveProps}>
          <div className={avatarUploadCrop.image}>
            <div className={avatarUploadCrop.overlay} />
            <img
              onLoad={handleLoad}
              className={avatarUploadCrop.source}
              src={url}
              ref={imageRef}
              alt=""
            />
          </div>
          <div className={avatarUploadCrop.border} />
        </div>
      </div>
    </div>
  );
});

enum TransformActionTypes {
  Zoom = "ZOOM",
  Move = "MOVE",
  Reset = "RESET",
}

type TransformAction =
  | {
      type: TransformActionTypes.Move;
      payload: Pick<Transform, "translate">;
    }
  | {
      type: TransformActionTypes.Zoom;
      payload: Pick<Transform, "scale">;
    }
  | {
      type: TransformActionTypes.Reset;
    };

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function createTransformReducer(image: HTMLImageElement) {
  /**
   * the crop component returns pixels which the cursor is moved on the canvas
   * due to the rendered avatar being a responsive value we should convert it to
   * percentages
   */
  const convertTranslateToPercentage = (
    translate: [number, number]
  ): [number, number] => {
    const { width: originalWidth, height: originalHeight } = image;

    const scale = getElementScale(image);

    const currentWidth = originalWidth * scale;
    const currentHeight = originalHeight * scale;

    return [
      (translate[0] / currentWidth) * 100,
      (translate[1] / currentHeight) * 100,
    ];
  };

  /**
   * User can move outside the boundaries of the crop area, we should constraint it
   * when this happens due to either a changed scale or position
   */
  const constrainTransform = (transform: Transform): Transform => {
    const { width: originalWidth, height: originalHeight } = image;
    const { scale, translate } = transform;

    const canvasSize = Math.min(originalWidth, originalHeight);

    const currentWidth = originalWidth * scale;
    const currentHeight = originalHeight * scale;

    // How many percent can be outside the canvas
    const overlapX = ((currentWidth - canvasSize) / currentWidth) * 100;
    const overlapY = ((currentHeight - canvasSize) / currentHeight) * 100;

    const translateX = clamp(translate[0], (overlapX / 2) * -1, overlapX / 2);
    const translateY = clamp(translate[1], (overlapY / 2) * -1, overlapY / 2);

    return {
      ...transform,
      translate: [translateX, translateY],
    };
  };

  return function transformReducer(
    state: Transform,
    action: TransformAction
  ): Transform {
    switch (action.type) {
      case TransformActionTypes.Move: {
        const [translateX, translateY] = convertTranslateToPercentage(
          action.payload.translate
        );

        return constrainTransform({
          ...state,
          translate: [
            state.translate[0] + translateX,
            state.translate[1] + translateY,
          ],
        });
      }
      case TransformActionTypes.Zoom: {
        return constrainTransform({
          ...state,
          scale: action.payload.scale,
        });
      }
      case TransformActionTypes.Reset: {
        return {
          scale: 1,
          translate: [0, 0],
        };
      }
      default: {
        return state;
      }
    }
  };
}

type AvatarUploadDialogProps = {
  value?: string;
  state: OverlayTriggerState;
  transform?: Transform;
  onTransformChange?: (transform: Transform) => void;
  onChange?: (value: File) => void;
};

/**
 * @private
 *
 * Renderes the dialog used for editing the transform.
 */
function AvatarUploadDialog(props: AvatarUploadDialogProps) {
  const {
    onTransformChange,
    value,
    state: overlayState,
    onChange,
    transform,
  } = props;

  const context = React.useContext(AvatarUploadContext);

  const { translations } = context;

  const intl = useIntl();

  const imageRef = React.useRef<HTMLImageElement>(null!);

  const [state, dispatch] = React.useReducer(
    createTransformReducer(imageRef.current),
    transform ?? {
      scale: 1,
      translate: [0, 0],
    }
  );

  const reset = () => {
    dispatch({
      type: TransformActionTypes.Reset,
    });
  };

  const move = (translate: [number, number]) => {
    dispatch({
      payload: {
        translate,
      },
      type: TransformActionTypes.Move,
    });
  };

  const zoom = (scale: number) => {
    dispatch({
      payload: {
        scale,
      },
      type: TransformActionTypes.Zoom,
    });
  };

  const handleSave = () => {
    onTransformChange?.(state);

    overlayState.close();
  };

  const dropRef = React.useRef<HTMLDivElement>(null!);

  const { dropProps, isDropTarget } = useDrop({
    ref: dropRef,
    async onDrop(event) {
      const fileDrop = event.items.find((item) => {
        return item.kind === "file" && ACCEPTED_FILE_TYPES.includes(item.type);
      }) as FileDropItem | undefined;

      if (!fileDrop) {
        return;
      }

      const file = await fileDrop.getFile();

      onChange?.(file);

      reset();
    },
  });

  return (
    <Dialog state={overlayState}>
      <Dialog.Close />
      <Dialog.Title>{translations.dialogTitle}</Dialog.Title>
      <Dialog.Content>
        <div
          className={classNames(avatarUploadDialog.container, {
            [avatarUploadDialog.states.isDropTarget]: isDropTarget,
          })}
          style={assignInlineVars({
            [avatarUpload.vars.scale]: `${state.scale}`,
            [avatarUpload.vars.translateX]: `${state.translate[0]}%`,
            [avatarUpload.vars.translateY]: `${state.translate[1]}%`,
          })}
        >
          {value ? (
            <div {...dropProps} className={avatarUploadDialog.wrapper}>
              <AvatarUploadCrop ref={imageRef} url={value} onChange={move} />
              <Slider
                onChange={zoom}
                minValue={1}
                maxValue={2}
                step={0.01}
                fillOffset={1}
                defaultValue={state.scale}
                formatOptions={{
                  style: "percent",
                }}
              >
                <Slider.Label>{translations.zoomLabel}</Slider.Label>
                <Slider.Input />
              </Slider>
            </div>
          ) : null}
          <div className={avatarUploadDialog.actions}>
            <Button variant="tertiary" onPress={overlayState.close}>
              <Button.Label>
                {intl.formatMessage({
                  id: "components.avatarUpload.avatarUploadDialogCancelLabel",
                  description:
                    "Label for the cancel action inside of the avatar editor dialog",
                  defaultMessage: "Cancel",
                })}
              </Button.Label>
            </Button>
            <Button onPress={handleSave}>
              <Button.Label>
                {intl.formatMessage({
                  id: "components.avatarUpload.avatarUploadDialogSubmitLabel",
                  description:
                    "Label for the submit action inside of the avatar editor dialog",
                  defaultMessage: "Submit",
                })}
              </Button.Label>
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

type AvatarUploadInputDialogTriggerProps = AriaButtonProps & {
  value?: string;
};

/**
 * @private
 *
 * Button with a image / placeholder used to trigger the overlay to crop / change the avatar.
 */
const AvatarDialogTrigger = React.forwardRef(
  function AvatarUploadInputDialogTrigger(
    props: AvatarUploadInputDialogTriggerProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) {
    const { value, ...otherProps } = props;

    const intl = useIntl();

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [orientation, setOrientation] =
      React.useState<
        keyof typeof avatarUploadInputDialogTrigger.variants.orientation
      >("portrait");

    const defaultButtonRef = React.useRef<HTMLButtonElement>(null!);

    const buttonRef = mergeRefs(ref, defaultButtonRef);

    const isDisabled = value == null;

    const { buttonProps, isPressed } = useButton(
      {
        ...otherProps,
        isDisabled,
        excludeFromTabOrder: isDisabled,
      },
      defaultButtonRef
    );

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      unstable_batchedUpdates(() => {
        setIsLoaded(true);

        if (
          event.currentTarget.naturalWidth > event.currentTarget.naturalHeight
        ) {
          setOrientation("landscape");
        } else {
          setOrientation("portrait");
        }
      });
    };

    const { focusProps, isFocused } = useFocusRing({});
    const { hoverProps, isHovered } = useHover({});
    const isExpanded = buttonProps["aria-expanded"] === true;

    return (
      <button
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        className={classNames(
          avatarUploadInputDialogTrigger.container,
          avatarUploadInputDialogTrigger.variants.orientation[orientation],
          {
            [avatarUploadInputDialogTrigger.states.isLoaded]: isLoaded,
            [avatarUploadInputDialogTrigger.states.isFocused]: isFocused,
            [avatarUploadInputDialogTrigger.states.isHovered]: isHovered,
            [avatarUploadInputDialogTrigger.states.isPressed]: isPressed,
            [avatarUploadInputDialogTrigger.states.isExpanded]: isExpanded,
          }
        )}
        ref={buttonRef}
        aria-label={intl.formatMessage({
          id: "components.avatarUpload.openDialogButtonLabel",
          description:
            "Accessible label which is used for the open the avatar editor",
          defaultMessage: "Open",
        })}
      >
        {value ? (
          <div className={avatarUploadInputDialogTrigger.wrapper}>
            <img
              className={avatarUploadInputDialogTrigger.transform}
              onLoad={handleLoad}
              src={value}
              alt=""
            />
          </div>
        ) : (
          <div className={avatarUploadInputDialogTrigger.placeholder}></div>
        )}
      </button>
    );
  }
);

export function AvatarUploadInput() {
  const context = React.useContext(AvatarUploadContext);

  const { inputRef } = context.refs;
  const { fieldProps, inputProps, dialogProps } = context.props;
  const { file, transform } = context.state;

  // Dialog
  const triggerRef = React.useRef<HTMLButtonElement>(null!);

  const state = useOverlayTriggerState({});

  const { overlayProps, triggerProps } = useOverlayTrigger(
    {
      type: "dialog",
    },
    state,
    triggerRef
  );

  // Input container
  const containerRef = React.useRef<HTMLDivElement>(null!);

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === "Backspace") {
        file.setValue("");
        transform.setValue({
          scale: 1,
          translate: [0, 0],
        });
      }
    },
  });

  const { pressProps } = usePress({
    onPress: () => {
      inputRef.current?.click();
    },
  });

  const { dropProps, isDropTarget } = useDrop({
    ref: containerRef,
    async onDrop(event) {
      const fileDrop = event.items.find((item) => {
        return item.kind === "file" && ACCEPTED_FILE_TYPES.includes(item.type);
      }) as FileDropItem | undefined;

      if (!fileDrop) {
        return;
      }

      const file = await fileDrop.getFile();

      if (dialogProps.onChange) {
        dialogProps.onChange(file);
      }

      state.open();
    },
  });

  const intl = useIntl();

  return (
    <>
      <Field.Input>
        <InputGroup
          {...mergeProps(keyboardProps, pressProps, dropProps)}
          ref={containerRef}
          states={{ isDropTarget }}
        >
          <InputGroup.Addon>
            <AvatarDialogTrigger
              {...triggerProps}
              ref={triggerRef}
              value={file.value}
            />
          </InputGroup.Addon>
          <InputGroup.Value>
            <input
              {...mergeProps(fieldProps, inputProps, {
                onChange: () => {
                  state.open();
                },
              })}
              ref={inputRef}
              type="file"
              accept={ACCEPTED_FILE_TYPES.join(",")}
              className={avatarUploadInput.hiddenInput}
            />

            {intl.formatMessage(
              {
                id: "components.avatarUpload.inputFeedbackLabel",
                description:
                  "Label which is used to explain the possible actions to the user inside the avatar upload",
                defaultMessage: "<b>Choose a file</b> or drag it here",
              },
              {
                b: (str: React.ReactNode) => <b>{str}</b>,
              }
            )}
          </InputGroup.Value>
        </InputGroup>
      </Field.Input>
      {state.isOpen ? (
        <AvatarUploadDialog
          {...mergeProps(overlayProps, dialogProps)}
          transform={dialogProps.transform}
          state={state}
        />
      ) : null}
    </>
  );
}
