import { Toast } from "~/components/Toast";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";
import { Button } from "../Button";
import { useToastState } from "./useToastState";

export default {
  title: "Components/Toast",
  component: Toast,
} as Meta<typeof Toast>;

export const Default: StoryFn<typeof Toast> = () => {
  const { add } = useToastState();

  return (
    <>
      <Toast.Region />
      <Button
        onPress={() => {
          add(
            <Toast>
              <Toast.Title>Informative toast</Toast.Title>
            </Toast>
          );
        }}
      >
        Show toast
      </Button>
    </>
  );
};

export const Success: StoryFn<typeof Toast> = () => {
  const { add } = useToastState();

  return (
    <>
      <Toast.Region />
      <Button
        onPress={() => {
          add(
            <Toast type="success">
              <Toast.Title>
                Your request was successfully submitted!
              </Toast.Title>
            </Toast>
          );
        }}
      >
        Show toast
      </Button>
    </>
  );
};

export const Error: StoryFn<typeof Toast> = () => {
  const { add } = useToastState();

  return (
    <>
      <Toast.Region />
      <Button
        onPress={() => {
          add(
            <Toast type="error">
              <Toast.Title>
                Something went wrong. Please try again later.
              </Toast.Title>
            </Toast>
          );
        }}
      >
        Show toast
      </Button>
    </>
  );
};

export const WithDescription: StoryFn<typeof Toast> = () => {
  const { add } = useToastState();

  return (
    <>
      <Toast.Region />
      <Button
        onPress={() => {
          add(
            <Toast>
              <Toast.Title>Toast</Toast.Title>
              <Toast.Description>
                Toasts display brief, temporary notifications. They&apos;re
                meant to be noticed without disrupting a user&apos;s experience
                or requiring an action to be taken.
              </Toast.Description>
            </Toast>
          );
        }}
      >
        Show toast
      </Button>
    </>
  );
};

export const WithPriority: StoryFn<typeof Toast> = () => {
  const { add } = useToastState();

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Toast.Region />
      <Button
        onPress={() => {
          add(
            <Toast>
              <Toast.Title>Toasting…</Toast.Title>
            </Toast>,
            { priority: 1 }
          );
        }}
      >
        Show low priority toast
      </Button>
      <Button
        onPress={() => {
          add(
            <Toast type="success">
              <Toast.Title>Toast is done!</Toast.Title>
            </Toast>,
            { priority: 2 }
          );
        }}
      >
        Show medium priority toast
      </Button>
      <Button
        onPress={() => {
          add(
            <Toast type="error">
              <Toast.Title>Toast is burned!</Toast.Title>
            </Toast>,
            { priority: 3 }
          );
        }}
      >
        Show high priority toast
      </Button>
    </div>
  );
};

export const AutoDismiss: StoryFn<typeof Toast> = () => {
  const { add } = useToastState();

  return (
    <>
      <Toast.Region />
      <Button
        onPress={() => {
          add(
            <Toast>
              <Toast.Title>Auto-dismiss</Toast.Title>
              <Toast.Description>
                For accessibility, toasts should have a minimum timeout of 5
                seconds to give users enough time to read them. In addition,
                timers will automatically pause when the user focuses or hovers
                over a toast.
              </Toast.Description>
            </Toast>,
            { timeout: 5000 }
          );
        }}
      >
        Show toast
      </Button>
    </>
  );
};

export const ProgrammaticClosing: StoryFn<typeof Toast> = () => {
  const { add, close } = useToastState();
  const [toastKey, setToastKey] = React.useState<string | null>(null);

  return (
    <>
      <Toast.Region />
      <Button
        onPress={() => {
          if (!toastKey) {
            setToastKey(
              add(
                <Toast>
                  <Toast.Title>Programmatic closing</Toast.Title>
                  <Toast.Description>
                    Toasts may be programmatically closed if they become
                    irrelevant before the user manually closes them. add()
                    returns a key for the toast which may be passed to close()
                    to dismiss the toast.
                  </Toast.Description>
                </Toast>,
                {
                  onClose: () => setToastKey(null),
                }
              )
            );
          } else {
            close(toastKey);
          }
        }}
      >
        {toastKey ? "Hide" : "Show"} toast
      </Button>
    </>
  );
};
