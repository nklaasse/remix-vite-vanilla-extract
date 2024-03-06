import { Button } from "~/components/Button";
import { Dialog } from "~/components/Dialog";
import { Form as DSForm } from "~/components/Form";
import { TextField } from "~/components/TextField";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Stack } from "../Stack";

export default {
  title: "Components/Dialog",
  component: Dialog,
} as Meta<typeof Dialog>;

export const Default: StoryFn<typeof Dialog> = (props) => {
  const state = useOverlayTriggerState({
    isOpen: true,
  });

  return (
    <Dialog {...props} state={state}>
      <Dialog.Title>Lorem ipsum dolor</Dialog.Title>
      <Dialog.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere
      </Dialog.Description>
      <Dialog.Close />
      <Dialog.Content>
        <DSForm>
          <TextField>
            <TextField.Label>First name</TextField.Label>
            <TextField.Input />
          </TextField>
          <TextField>
            <TextField.Label>Last name</TextField.Label>
            <TextField.Input />
          </TextField>
        </DSForm>
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="secondary" onPress={() => state.close()}>
          <Button.Label>Cancel</Button.Label>
        </Button>
        <Button onPress={() => state.close()}>
          <Button.Label>Save</Button.Label>
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

type NestedDialogProps = {
  depth: number;
};

function NestedDialog(props: NestedDialogProps) {
  const { depth } = props;

  const ref = React.useRef<HTMLButtonElement>(null);

  const state = useOverlayTriggerState({});

  const { overlayProps, triggerProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    ref
  );

  return (
    <>
      <Button
        {...triggerProps}
        onPress={() => {
          state.open();
        }}
      >
        <Button.Label>{`Open ${depth}`}</Button.Label>
      </Button>
      {state.isOpen ? (
        <Dialog {...overlayProps} state={state}>
          <Dialog.Title>{`Dialog ${depth}`}</Dialog.Title>
          <Dialog.Actions>
            <NestedDialog depth={depth + 1} />
          </Dialog.Actions>
          <Dialog.Close />
        </Dialog>
      ) : null}
    </>
  );
}

export const Nested: StoryFn<typeof Dialog> = () => {
  return <NestedDialog depth={1} />;
};

type NestedDynamicHeightDialogProps = {
  depth: number;
};

function NestedDynamicHeightDialog(props: NestedDynamicHeightDialogProps) {
  const { depth } = props;

  const ref = React.useRef<HTMLButtonElement>(null);

  const state = useOverlayTriggerState({});

  const { overlayProps, triggerProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    ref
  );

  const height = React.useRef(
    Math.floor(Math.random() * 100) * (Math.random() * 10)
  );

  return (
    <>
      <Button
        {...triggerProps}
        onPress={() => {
          state.open();
        }}
      >
        <Button.Label>{`Open ${depth}`}</Button.Label>
      </Button>
      {state.isOpen ? (
        <Dialog {...overlayProps} state={state}>
          <Dialog.Title>{`Dialog ${depth}`}</Dialog.Title>
          <Dialog.Content>
            <div style={{ width: "100%", height: `${height.current}px` }}></div>
          </Dialog.Content>
          <Dialog.Actions>
            <NestedDynamicHeightDialog depth={depth + 1} />
          </Dialog.Actions>
          <Dialog.Close />
        </Dialog>
      ) : null}
    </>
  );
}

export const NestedDynamicHeight: StoryFn<typeof Dialog> = () => {
  return <NestedDynamicHeightDialog depth={0} />;
};

export const Form: StoryFn<typeof Dialog> = () => {
  const state = useOverlayTriggerState({
    isOpen: true,
  });

  return (
    <Stack.Screen>
      <Dialog state={state}>
        <Dialog.Title>Add user</Dialog.Title>
        <Dialog.Content>
          <DSForm>
            <TextField>
              <TextField.Label>Email</TextField.Label>
              <TextField.Input />
            </TextField>
            <TextField>
              <TextField.Label>Last name</TextField.Label>
              <TextField.Input />
            </TextField>
            <TextField>
              <TextField.Label>City</TextField.Label>
              <TextField.Input />
            </TextField>
          </DSForm>
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="secondary">
            <Button.Label>Cancel</Button.Label>
          </Button>
          <Button variant="primary">
            <Button.Label>Save</Button.Label>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Stack.Screen>
  );
};
