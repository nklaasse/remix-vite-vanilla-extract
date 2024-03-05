import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { beforeAll, afterEach } from "vitest";

beforeAll(() => {
  faker.seed(42);
});

afterEach(cleanup);
