import { Button } from "~/components/Button";
import { Fieldset } from "~/components/Fieldset";
import { TextField } from "~/components/TextField";
import { IconDelete } from "~/icons/IconDelete";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Fieldset",
  component: Fieldset,
} as Meta<typeof Fieldset>;

export const Default: StoryFn<typeof Fieldset> = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Personal details</Fieldset.Legend>
      <Fieldset.Fields>
        <TextField>
          <TextField.Label>First name</TextField.Label>
          <TextField.Input />
        </TextField>
        <TextField>
          <TextField.Label>Last name</TextField.Label>
          <TextField.Input />
        </TextField>
      </Fieldset.Fields>
    </Fieldset>
  );
};

export const Actions: StoryFn<typeof Fieldset> = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Personal details</Fieldset.Legend>
      <Fieldset.Actions>
        <Button aria-label="Delete info" size="compact" variant="tertiary">
          <Button.Icon>
            <IconDelete />
          </Button.Icon>
        </Button>
      </Fieldset.Actions>
      <Fieldset.Fields>
        <TextField>
          <TextField.Label>First name</TextField.Label>
          <TextField.Input />
        </TextField>
        <TextField>
          <TextField.Label>Last name</TextField.Label>
          <TextField.Input />
        </TextField>
      </Fieldset.Fields>
    </Fieldset>
  );
};

export const Description: StoryFn<typeof Fieldset> = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Lorem ipsum dolor</Fieldset.Legend>
      <Fieldset.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        tristique tortor at viverra egestas. Sed et tempus erat, a convallis
        magna. Vestibulum dictum sollicitudin orci a finibus. Phasellus quis dui
        semper, porta justo sit amet, tristique diam.
      </Fieldset.Description>
      <Fieldset.Fields>
        <TextField>
          <TextField.Label>Lorem ipsum</TextField.Label>
          <TextField.Input />
        </TextField>
        <TextField>
          <TextField.Label>Lorem ipsum</TextField.Label>
          <TextField.Input />
        </TextField>
      </Fieldset.Fields>
    </Fieldset>
  );
};

export const Combined: StoryFn<typeof Fieldset> = () => {
  return (
    <Fieldset>
      <Fieldset.Legend>Lorem ipsum dolor</Fieldset.Legend>
      <Fieldset.Actions>
        <Button aria-label="Delete info" size="compact" variant="tertiary">
          <Button.Icon>
            <IconDelete />
          </Button.Icon>
        </Button>
      </Fieldset.Actions>
      <Fieldset.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        tristique tortor at viverra egestas. Sed et tempus erat, a convallis
        magna. Vestibulum dictum sollicitudin orci a finibus. Phasellus quis dui
        semper, porta justo sit amet, tristique diam.
      </Fieldset.Description>
      <Fieldset.Fields>
        <TextField>
          <TextField.Label>Lorem ipsum</TextField.Label>
          <TextField.Input />
        </TextField>
        <TextField>
          <TextField.Label>Lorem ipsum</TextField.Label>
          <TextField.Input />
        </TextField>
      </Fieldset.Fields>
    </Fieldset>
  );
};
