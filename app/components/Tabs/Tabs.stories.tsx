import { Tabs } from "~/components/Tabs";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Tabs",
  component: Tabs,
} as Meta<typeof Tabs>;

const TABS = [
  {
    key: "1",
    label: "Tab 1",
    count: 12,
  },
  {
    key: "2",
    label: "Tab 2",
  },
  {
    key: "3",
    label: "Tab 3",
    count: 11,
  },
];

export const Default: StoryFn<typeof Tabs> = () => {
  return (
    <Tabs>
      <Tabs.List items={TABS}>
        {(item) => (
          <Tabs.Tab id={item.key} key={item.key}>
            <Tabs.Label>{item.label}</Tabs.Label>
          </Tabs.Tab>
        )}
      </Tabs.List>

      {TABS.map((item) => (
        <Tabs.Panel key={item.key} id={item.key}>
          <p>Content for {item.label}</p>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export const Count: StoryFn<typeof Tabs> = () => {
  return (
    <Tabs>
      <Tabs.List items={TABS}>
        {(item) => (
          <Tabs.Tab id={item.key} key={item.key}>
            <Tabs.Label>{item.label}</Tabs.Label>
            {item.count ? <Tabs.Total>{item.count}</Tabs.Total> : null}
          </Tabs.Tab>
        )}
      </Tabs.List>

      {TABS.map((item) => (
        <Tabs.Panel key={item.key} id={item.key}>
          <p>Content for {item.label}</p>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
