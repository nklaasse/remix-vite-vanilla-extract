import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import type { LinkMatcher } from "@lexical/react/LexicalAutoLinkPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import {
  $isAtNodeEnd,
  createDOMRange,
  createRectsFromDOMRange,
} from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import { Button } from "~/components/Button";
import { Popover } from "~/components/Popover";
import { TextField } from "~/components/TextField";
import { Tray } from "~/components/Tray";
import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { IconLink } from "~/icons/IconLink";
import { useIntl } from "react-intl";
import type { RangeSelection } from "lexical";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import * as React from "react";
import {
  FocusScope,
  mergeProps,
  useDialog,
  useOverlayTrigger,
} from "react-aria";
import { createPortal } from "react-dom";
import type { OverlayTriggerState } from "react-stately";
import { useOverlayTriggerState } from "react-stately";
import { Tooltip } from "../Tooltip";
import { TextEditorToggleButton } from "./_TextEditorToggleButton";
import {
  textEditorLinkForm,
  textEditorLinkOverlay,
} from "./TextEditorLink.css";

type TextEditorLinkFormProps = {
  onSave: (value: string) => void;
  onCancel: () => void;
  value: string;
};

const TextEditorLinkForm = React.memo(function TextEditorLinkForm(
  props: TextEditorLinkFormProps
) {
  const { onSave, onCancel, value } = props;

  const inputRef = React.useRef<HTMLInputElement>(null!);

  const intl = useIntl();

  return (
    <div className={textEditorLinkForm.container}>
      <TextField name="link" type="url" autoFocus={true} defaultValue={value}>
        <TextField.Label>
          {intl.formatMessage({
            id: "components.textEditor.textEditorLinkFormURLInputLabel",
            defaultMessage: "URL",
            description:
              "Label for the input in the form which is shown when the user want's to add or change the link inside the rich text editor",
          })}
        </TextField.Label>
        <TextField.Input ref={inputRef} />
      </TextField>

      <div className={textEditorLinkForm.actions}>
        <Button
          onPress={() => {
            onCancel();
          }}
          size="compact"
          variant="secondary"
        >
          <Button.Label>Cancel</Button.Label>
        </Button>
        <Button
          onPress={() => {
            onSave(inputRef.current.value);
          }}
          size="compact"
          variant="primary"
        >
          <Button.Label>Save</Button.Label>
        </Button>
      </div>
    </div>
  );
});

type TextEditorLinkPopoverProps = React.DOMAttributes<HTMLDivElement> & {
  state: OverlayTriggerState;
  children: React.ReactNode;
};

// Merge multiple dom rects in a single dom rect so it's usable to use
// to position the popover
const mergeRects = ([currentRect, ...rects]: Array<DOMRect>):
  | DOMRect
  | undefined => {
  let nextRect = currentRect;

  for (const rect of rects) {
    const xStart = Math.min(nextRect.x, rect.x);
    const yStart = Math.min(nextRect.y, rect.y);

    const xEnd = Math.max(nextRect.x + nextRect.width, rect.x + rect.width);
    const yEnd = Math.max(nextRect.y + nextRect.height, rect.y + rect.height);

    nextRect = new DOMRect(xStart, yStart, xEnd - xStart, yEnd - yStart);
  }

  return nextRect;
};

// Convert one ore multiple rects to the correct dom position
function updatePopoverPosition(element: HTMLElement, rect: DOMRect) {
  element.style.position = "absolute";
  element.style.top = `${rect.top + rect.height}px`;
  element.style.left = `${rect.left + rect.width / 2}px`;
}

function TextEditorLinkPopover(props: TextEditorLinkPopoverProps) {
  const { state, ...otherProps } = props;

  const ref = React.useRef<HTMLSpanElement>(null);

  const [editor] = useLexicalComposerContext();

  const updatePosition = React.useCallback(() => {
    const rootElement = editor.getRootElement();

    if (rootElement === null) {
      return;
    }

    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const range = createDOMRange(
        editor,
        selection.anchor.getNode(),
        selection.anchor.offset,
        selection.focus.getNode(),
        selection.focus.offset
      );

      if (range) {
        const rects = mergeRects(createRectsFromDOMRange(editor, range));

        if (ref.current) {
          // In case we can get a dom rect from the editor range, we just
          // use it to position the popover
          //
          // Otherwise the user has not yet had any iteraction with the editor,
          // and it does not have any content yet, so we need to create a safe
          // fallback, which in this case should mimic a cursor as the first character
          // of the editor
          if (rects) {
            updatePopoverPosition(ref.current, rects);
          } else {
            const rootElement = editor.getRootElement();

            if (rootElement) {
              const rootDomRect = rootElement.getBoundingClientRect();

              const pt = parseFloat(getComputedStyle(rootElement).paddingTop);
              const pl = parseFloat(getComputedStyle(rootElement).paddingLeft);
              const lh = parseFloat(getComputedStyle(rootElement).lineHeight);

              const rect = new DOMRect(
                rootDomRect.left + pl,
                rootDomRect.top + pt,
                0,
                lh
              );

              updatePopoverPosition(ref.current, rect);
            }
          }
        }
      }
    }
  }, [editor]);

  React.useLayoutEffect(() => {
    editor.getEditorState().read(() => {
      updatePosition();
    });

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updatePosition();
      });
    });
  }, [editor, updatePosition]);

  return (
    <>
      {createPortal(<span ref={ref} />, document.body)}
      <Popover.Provider
        value={{
          isOpen: state.isOpen,
          onOpenChange: state.setOpen,
        }}
      >
        <Popover {...otherProps} triggerRef={ref} />
      </Popover.Provider>
    </>
  );
}

type TextEditorLinkTrayProps = React.DOMAttributes<HTMLDivElement> & {
  state: OverlayTriggerState;
  children: React.ReactNode;
};

function TextEditorLinkTray(props: TextEditorLinkTrayProps) {
  const { state, ...otherProps } = props;

  return (
    <Tray.Provider
      value={{
        isOpen: state.isOpen,
        onOpenChange: state.setOpen,
      }}
    >
      <Tray {...otherProps} />
    </Tray.Provider>
  );
}

type TextEditorLinkOverlayProps = React.DOMAttributes<HTMLDivElement> & {
  state: OverlayTriggerState;
  children: React.ReactNode;
};

function TextEditorLinkOverlay(props: TextEditorLinkOverlayProps) {
  const { children, state, ...otherProps } = props;

  const isPopover = useMediaQuery(breakpoints.medium);

  const dialogRef = React.useRef<HTMLDivElement>(null);

  const { dialogProps } = useDialog({}, dialogRef);

  if (isPopover) {
    return (
      <TextEditorLinkPopover state={state}>
        <div
          {...mergeProps(otherProps, dialogProps)}
          className={textEditorLinkOverlay.container}
          ref={dialogRef}
        >
          {children}
        </div>
      </TextEditorLinkPopover>
    );
  } else {
    return (
      <TextEditorLinkTray state={state}>
        <div
          {...mergeProps(otherProps, dialogProps)}
          className={textEditorLinkOverlay.container}
          ref={dialogRef}
        >
          {children}
        </div>
      </TextEditorLinkTray>
    );
  }
}

function getSelectedNode(selection: RangeSelection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();

  if (anchorNode === focusNode) {
    return anchorNode;
  }

  const isBackward = selection.isBackward();

  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_MATCHER =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const LINK_MATCHERS: Array<LinkMatcher> = [
  (text) => {
    const match = URL_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: match[0],
      }
    );
  },
  (text) => {
    const match = EMAIL_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: `mailto:${match[0]}`,
      }
    );
  },
];

export function TextEditorLink() {
  const ref = React.useRef<HTMLButtonElement>(null);

  const [link, setLink] = React.useState<string | null>(null);

  const [editor] = useLexicalComposerContext();

  const handleSave = (url: string) => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);

    state.close();
  };

  const handleRemove = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);

    setLink(null);
  };

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLink(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLink(node.getURL());
      } else {
        setLink(null);
      }
    }
  }, [setLink]);

  React.useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [updateToolbar, editor]);

  const state = useOverlayTriggerState({});

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    ref
  );

  const intl = useIntl();

  const label = intl.formatMessage(
    {
      id: "components.textEditor.textEditorLinkLabel",
      description: "Accessible label for the link toolbar action",
      defaultMessage:
        "{isSelected, select, true {Remove link} other {Add link}}",
    },
    {
      isSelected: link !== null,
    }
  );

  // In case we use a popover, we don't want to keep focus on the editor
  // because the popover will be closed if it loses focus.
  // In case we use a tray, we want to keep focus on the editor so the
  // keyboard is not dismissed and enabled again
  const keepEditorFocused = !useMediaQuery(breakpoints.medium);

  return (
    <>
      <LinkPlugin />
      <AutoLinkPlugin matchers={LINK_MATCHERS} />

      <Tooltip.Trigger>
        <Tooltip>{label}</Tooltip>
        <TextEditorToggleButton
          {...triggerProps}
          ref={ref}
          onPress={() => {
            if (link === null) {
              const cb = () => {
                state.open();
              };

              // We setup a timeout here so we can call focus on the rootElement, in case
              // the editor.focus couldn't focus the editor. This can happen in case the
              // the editor has no data and the user didn't interact with the editor yet.
              const tId = setTimeout(() => {
                editor.getRootElement()?.focus();

                cb();
              }, 100);

              editor.focus(
                () => {
                  // We can safely clear the timeout here since the editor.focus was able
                  // to focus the editor
                  clearTimeout(tId);
                  cb();
                },
                {
                  defaultSelection: "rootEnd",
                }
              );
            } else {
              handleRemove();
            }
          }}
          isSelected={link !== null}
          keepEditorFocused={keepEditorFocused}
          aria-label={label}
        >
          <IconLink />
        </TextEditorToggleButton>
      </Tooltip.Trigger>

      {state.isOpen ? (
        <TextEditorLinkOverlay state={state} {...overlayProps}>
          <FocusScope restoreFocus>
            <TextEditorLinkForm
              value={link ?? ""}
              onCancel={() => {
                state.close();
              }}
              onSave={handleSave}
            />
          </FocusScope>
        </TextEditorLinkOverlay>
      ) : null}
    </>
  );
}
