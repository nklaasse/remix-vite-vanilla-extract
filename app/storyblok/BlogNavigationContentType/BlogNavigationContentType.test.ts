import { faker } from "@faker-js/faker";
import type { StoryblokStory } from "storyblok-generate-ts";
import { describe, expect, test } from "~/test/util";
import type {
  BlogNavigationStoryblok,
  LinkStoryblok,
} from "~/storyblok/types/component-types-sb";
import { fakeStoryblokLink, fakeStoryblokStory } from "~/test/fake/storyblok";
import { loader } from "./BlogNavigationContentType";

function fakeBlogNavigationStory(links: LinkStoryblok[]) {
  return fakeStoryblokStory<BlogNavigationStoryblok>({
    links,
    _uid: faker.string.uuid(),
    component: "blogNavigation",
  });
}

describe("BlogNavigationContentType", () => {
  describe("loader", () => {
    const story: StoryblokStory<BlogNavigationStoryblok> =
      fakeBlogNavigationStory([
        fakeStoryblokLink("All Articles", {
          id: faker.string.uuid(),
          cached_url: "en-GB/blog/",
        }),
        fakeStoryblokLink("CV Writing", {
          id: faker.string.uuid(),
          cached_url: "en-GB/blog/cv/",
        }),
        fakeStoryblokLink("Job Interview", {
          id: faker.string.uuid(),
          cached_url: "en-GB/blog/job-interview/",
        }),
        fakeStoryblokLink("Cover Letter", {
          id: faker.string.uuid(),
          cached_url: "en-GB/blog/cover-letter/",
        }),
      ]);

    test("generates links from Storyblok's story", async () => {
      const {
        props: { links },
      } = await loader(story, {
        request: new Request(
          new URL("https://cvmaker.nl/blog/cv/how-to-write-a-good-cv")
        ),
        context: {},
        params: {
          "*": "https://cvmaker.nl/blog/cv/how-to-write-a-good-cv/",
        },
      });

      expect(links).toEqual([
        {
          id: expect.any(String),
          content: "All Articles",
          to: "/blog/",
          isActive: expect.any(Boolean),
        },
        {
          id: expect.any(String),
          content: "CV Writing",
          to: "/blog/cv/",
          isActive: expect.any(Boolean),
        },
        {
          id: expect.any(String),
          content: "Job Interview",
          to: "/blog/job-interview/",
          isActive: expect.any(Boolean),
        },
        {
          id: expect.any(String),
          content: "Cover Letter",
          to: "/blog/cover-letter/",
          isActive: expect.any(Boolean),
        },
      ]);
    });

    test("marks CV link active", async () => {
      const {
        props: { links },
      } = await loader(story, {
        request: new Request(
          new URL("https://cvmaker.nl/blog/cv/how-to-write-a-good-cv")
        ),
        context: {},
        params: {
          "*": "https://cvmaker.nl/blog/cv/how-to-write-a-good-cv/",
        },
      });

      const [, cvLink] = links;
      expect(cvLink.isActive).toBeTruthy();
    });

    test("does not mark blog and non-CV links active", async () => {
      const {
        props: { links },
      } = await loader(story, {
        request: new Request(
          new URL("https://cvmaker.nl/blog/cv/how-to-write-a-good-cv")
        ),
        context: {},
        params: {
          "*": "https://cvmaker.nl/blog/cv/how-to-write-a-good-cv/",
        },
      });

      const [blogLink, , jobLink, coverLetterLink] = links;
      for (const link of [blogLink, jobLink, coverLetterLink]) {
        expect(link.isActive).toBeFalsy();
      }
    });
  });
});
