import { Stack } from "~/components/Stack";
import type { Meta, StoryFn } from "@storybook/react";
import { useOverlayTriggerState } from "react-stately";

export default {
  title: "Components/Stack",
  component: Stack,
} as Meta<typeof Stack>;

export const SingleScreen: StoryFn<typeof Stack> = () => {
  return <Stack.Screen>Single screen</Stack.Screen>;
};

export const MultpleScreens: StoryFn<typeof Stack> = () => {
  return (
    <Stack.Screen>
      <Stack.Screen>
        <Stack.Screen>Multiple screens</Stack.Screen>
      </Stack.Screen>
    </Stack.Screen>
  );
};

export const SingleModal: StoryFn<typeof Stack> = () => {
  const state = useOverlayTriggerState({
    isOpen: true,
  });

  return <Stack.Modal state={state}>Single Modal</Stack.Modal>;
};

export const MultipleModals: StoryFn<typeof Stack> = () => {
  const stateModal1 = useOverlayTriggerState({
    isOpen: true,
  });

  const stateModal2 = useOverlayTriggerState({
    isOpen: true,
  });

  const stateModal3 = useOverlayTriggerState({
    isOpen: true,
  });

  return (
    <Stack.Modal state={stateModal1}>
      <Stack.Modal state={stateModal2}>
        <Stack.Modal state={stateModal3}>Single Modal</Stack.Modal>
      </Stack.Modal>
    </Stack.Modal>
  );
};

export const Combined: StoryFn<typeof Stack> = () => {
  const state = useOverlayTriggerState({
    isOpen: true,
  });

  return (
    <Stack.Screen>
      <Stack.Screen>
        <Stack.Modal state={state}>Single Modal</Stack.Modal>
      </Stack.Screen>
    </Stack.Screen>
  );
};
