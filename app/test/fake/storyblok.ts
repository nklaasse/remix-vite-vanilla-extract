import { faker } from "@faker-js/faker";
import type { StoryblokStory } from "storyblok-generate-ts";
import type { MultilinkStoryblok } from "~/storyblok/types/component-types-sb";

export function fakeStoryblokStory<T>(content: T): StoryblokStory<T> {
  return {
    name: faker.hacker.noun(),
    created_at: faker.date.past().toString(),
    published_at: faker.date.recent().toString(),
    id: faker.number.int(),
    uuid: faker.string.uuid(),
    content: content,
    slug: faker.string.alphanumeric(),
    full_slug: faker.string.alphanumeric(),
    sort_by_date: null,
    position: faker.number.int(),
    tag_list: [],
    is_startpage: false,
    parent_id: faker.string.uuid(),
    meta_data: null,
    group_id: faker.string.alphanumeric(),
    first_published_at: faker.date.recent().toString(),
    release_id: null,
    lang: "en",
    path: null,
    alternates: [],
    default_full_slug: faker.string.alphanumeric(),
    translated_slugs: [],
  };
}

export function fakeStoryblokLink(content: string, to: MultilinkStoryblok) {
  return {
    content,
    to,
    _uid: faker.string.uuid(),
    component: "link",
  } as const;
}
