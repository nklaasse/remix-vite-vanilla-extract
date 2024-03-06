import { TemplateSelect } from "~/components/TemplateSelect";
import type { Meta, StoryFn } from "@storybook/react";
import * as React from "react";

export default {
  title: "Components/TemplateSelect",
  component: TemplateSelect,
} as Meta<typeof TemplateSelect>;

const getTemplateSelectThumbnail = (fileName: string) =>
  `https://www.cvmaker.nl/assets/templates/thumbnails/${fileName}.jpeg`;

const RESUME_TEMPLATE_NAMES = [
  "hopkins",
  "yale",
  "erasmus",
  "cornell",
  "duke",
  "wheaton",
  "columbia",
  "toronto",
];

export const Default: StoryFn<typeof TemplateSelect> = () => {
  return (
    <TemplateSelect>
      <TemplateSelect.Label>Select a template</TemplateSelect.Label>
      <TemplateSelect.Input>
        {RESUME_TEMPLATE_NAMES.map((templateName) => {
          return (
            <TemplateSelect.Item key={templateName}>
              <TemplateSelect.Preview
                src={getTemplateSelectThumbnail(templateName)}
                alt={templateName}
              />
              <TemplateSelect.Label>{templateName}</TemplateSelect.Label>
            </TemplateSelect.Item>
          );
        })}
      </TemplateSelect.Input>
    </TemplateSelect>
  );
};

export const WithoutLabel: StoryFn<typeof TemplateSelect> = () => {
  return (
    <TemplateSelect>
      <TemplateSelect.Input>
        {RESUME_TEMPLATE_NAMES.map((templateName) => {
          return (
            <TemplateSelect.Item key={templateName}>
              <TemplateSelect.Preview
                src={getTemplateSelectThumbnail(templateName)}
                alt={templateName}
              />
              <TemplateSelect.Label>{templateName}</TemplateSelect.Label>
            </TemplateSelect.Item>
          );
        })}
      </TemplateSelect.Input>
    </TemplateSelect>
  );
};

export const Reset: StoryFn<typeof TemplateSelect> = () => {
  const [value, setValue] = React.useState("hopkins");

  return (
    <TemplateSelect value={value} onChange={setValue}>
      <TemplateSelect.Label>Select a template</TemplateSelect.Label>
      <TemplateSelect.Reset
        onPress={() => {
          setValue("hopkins");
        }}
      />
      <TemplateSelect.Input>
        {RESUME_TEMPLATE_NAMES.map((templateName) => {
          return (
            <TemplateSelect.Item key={templateName}>
              <TemplateSelect.Preview
                src={getTemplateSelectThumbnail(templateName)}
                alt={templateName}
              />
              <TemplateSelect.Label>{templateName}</TemplateSelect.Label>
            </TemplateSelect.Item>
          );
        })}
      </TemplateSelect.Input>
    </TemplateSelect>
  );
};

export const ContextualHelp: StoryFn<typeof TemplateSelect> = () => {
  return (
    <TemplateSelect>
      <TemplateSelect.Label>Select a template</TemplateSelect.Label>
      <TemplateSelect.ContextualHelp>
        Pick a template that best suits your needs. You can always change it
        later.
      </TemplateSelect.ContextualHelp>
      <TemplateSelect.Input>
        {RESUME_TEMPLATE_NAMES.map((templateName) => {
          return (
            <TemplateSelect.Item key={templateName}>
              <TemplateSelect.Preview
                src={getTemplateSelectThumbnail(templateName)}
                alt={templateName}
              />
              <TemplateSelect.Label>{templateName}</TemplateSelect.Label>
            </TemplateSelect.Item>
          );
        })}
      </TemplateSelect.Input>
    </TemplateSelect>
  );
};
