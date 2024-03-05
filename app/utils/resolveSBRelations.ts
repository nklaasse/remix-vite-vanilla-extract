import type { ISbStoryData } from "storyblok-js-client";
import type { MainStory } from "~/routes/_marketing.$";

type StoryData = MainStory;

/**
 * Resolves relations in a Storyblok story
 * by replacing the uuid with the actual data from the rel array.
 */
export function resolveSBRelations(
  story: StoryData,
  rel: ISbStoryData[]
): StoryData["content"] {
  const storyContentWithRelations = Object.keys(story.content).reduce(
    (acc, key) => {
      const relation = rel.find((obj) => obj.uuid === story.content[key]);
      if (relation) {
        acc[key] = relation;
      } else {
        acc[key] = story.content[key];
      }

      return acc;
    },
    {} as StoryData["content"]
  );

  return storyContentWithRelations;
}
