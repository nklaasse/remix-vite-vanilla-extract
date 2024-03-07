import "./Navigation.stories.css";
import { Navigation } from "~/components/Navigation";
import { IconArrowInlineStart } from "~/icons/IconArrowInlineStart";
import { IconDesign } from "~/icons/IconDesign";
import { IconImage } from "~/icons/IconImage";
import { IconSections } from "~/icons/IconSections";
import type { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Navigation",
  component: Navigation,
} as Meta<typeof Navigation>;

export const Bar: StoryFn<typeof Navigation> = () => {
  return (
    <Navigation>
      <Navigation.Bar>
        <Navigation.Menu>
          <Navigation.MenuItem id="content">
            <Navigation.Label>Content</Navigation.Label>
            <Navigation.Icon>
              <IconSections />
            </Navigation.Icon>
          </Navigation.MenuItem>
          <Navigation.MenuItem id="settings">
            <Navigation.Label>Settings</Navigation.Label>
            <Navigation.Icon>
              <IconDesign />
            </Navigation.Icon>
          </Navigation.MenuItem>
          <Navigation.MenuItem id="preview">
            <Navigation.Label>Preview</Navigation.Label>
            <Navigation.Icon>
              <IconImage />
            </Navigation.Icon>
          </Navigation.MenuItem>
        </Navigation.Menu>
      </Navigation.Bar>
      <Navigation.Screen id="content" />
      <Navigation.Screen id="settings" />
      <Navigation.Screen id="preview" />
    </Navigation>
  );
};

export const Rail: StoryFn<typeof Navigation> = () => {
  return (
    <Navigation>
      <Navigation.Rail>
        <Navigation.Button aria-label="Go back">
          <Navigation.Icon>
            <IconArrowInlineStart />
          </Navigation.Icon>
        </Navigation.Button>

        <Navigation.Menu>
          <Navigation.MenuItem id="content">
            <Navigation.Label>Content</Navigation.Label>
            <Navigation.Icon>
              <IconSections />
            </Navigation.Icon>
          </Navigation.MenuItem>
          <Navigation.MenuItem id="settings">
            <Navigation.Label>Settings</Navigation.Label>
            <Navigation.Icon>
              <IconDesign />
            </Navigation.Icon>
          </Navigation.MenuItem>
          <Navigation.MenuItem id="preview">
            <Navigation.Label>Preview</Navigation.Label>
            <Navigation.Icon>
              <IconImage />
            </Navigation.Icon>
          </Navigation.MenuItem>
        </Navigation.Menu>
      </Navigation.Rail>
      <Navigation.Screen id="content" />
      <Navigation.Screen id="settings" />
      <Navigation.Screen id="preview" />
    </Navigation>
  );
};
