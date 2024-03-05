import { faker } from "@faker-js/faker";

export function words(wordCount?: number | { min: number; max: number }) {
  return faker.lorem.words(wordCount);
}
