import { Form } from "~/components/Form";
import { TextField } from "~/components/TextField";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

export default {
  title: "Components/Form",
  component: Form,
} as Meta<typeof Form>;

export const Default: StoryFn<typeof Form> = () => {
  return (
    <Form>
      <TextField>
        <TextField.Label>First name</TextField.Label>
        <TextField.Input />
      </TextField>
      <TextField>
        <TextField.Label>Last name</TextField.Label>
        <TextField.Input />
      </TextField>
      <TextField>
        <TextField.Label>Zip code</TextField.Label>
        <TextField.Input />
      </TextField>
      <TextField>
        <TextField.Label>City</TextField.Label>
        <TextField.Input />
      </TextField>
      <Form.Actions>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Actions>
    </Form>
  );
};

export const Grouped: StoryFn<typeof Form> = () => {
  return (
    <Form>
      <Form.Group>
        <TextField>
          <TextField.Label>First name</TextField.Label>
          <TextField.Input />
        </TextField>
        <TextField>
          <TextField.Label>Last name</TextField.Label>
          <TextField.Input />
        </TextField>
      </Form.Group>
      <Form.Group>
        <TextField>
          <TextField.Label>Zip code</TextField.Label>
          <TextField.Input />
        </TextField>
        <TextField>
          <TextField.Label>City</TextField.Label>
          <TextField.Input />
        </TextField>
      </Form.Group>
      <Form.Actions>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Actions>
    </Form>
  );
};
