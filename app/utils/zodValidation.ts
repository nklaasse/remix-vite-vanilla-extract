import { parse as baseParse, type Submission } from "@conform-to/react";
import type { IntlShape } from "react-intl";
import {
  createFieldError as createFieldErrorOriginal,
  parseFieldError as parseFieldErrorOriginal,
} from "~/utils/validation";
import type { z } from "zod";

// Function which wraps the original createFieldError and stringifies it, this
// is necessary since conform.guide only accepts string as errors for now
export function createFieldError(
  options: Parameters<typeof createFieldErrorOriginal>[0]
) {
  return JSON.stringify(createFieldErrorOriginal(options));
}

// Function which wraps the original parseFieldError and parse it, this
// is necessary since conform.guide only accepts string as errors for now
export function parseFieldError(options: string, intl: IntlShape) {
  return parseFieldErrorOriginal(JSON.parse(options), intl);
}

// Copied from https://github.com/edmundhung/conform/blob/main/packages/conform-dom/formdata.ts
// Returns a formatted name from the paths based on the JS syntax convention
function getPathName(paths: Array<string | number>): string {
  return paths.reduce<string>((name, path) => {
    if (typeof path === "number") {
      return `${name}[${path}]`;
    }

    if (name === "" || path === "") {
      return [name, path].join("");
    }

    return [name, path].join(".");
  }, "");
}

export function parse<Schema extends z.ZodTypeAny>(
  payload: FormData | URLSearchParams,
  config: {
    schema: Schema;
  }
): Submission<z.output<Schema>> {
  return baseParse<z.output<Schema>>(payload, {
    resolve(payload) {
      const schema = config.schema;

      const resolveResult = (result: ReturnType<typeof schema.safeParse>) => {
        if (result.success) {
          return {
            value: result.data,
          };
        }

        return {
          error: result.error.errors.reduce<Record<string, string>>(
            (result, e) => {
              const name = getPathName(e.path);
              let error = "";

              // checks if error type is required
              if (e.code === "too_small" && e.type === "string") {
                error = createFieldError({
                  key: "required",
                });
                // checks if error type is invalid email
              } else if (
                e.code === "invalid_string" &&
                e.validation === "email"
              ) {
                error = createFieldError({
                  key: "invalid_email",
                });
              } else {
                throw new Error(
                  `Unhandled error: ${e.code} not yet implemented`
                );
              }

              if (result[name] === undefined) {
                result[name] = error;
              }

              return result;
            },
            {}
          ),
        };
      };

      return resolveResult(schema.safeParse(payload));
    },
  });
}
