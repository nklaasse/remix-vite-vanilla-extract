import { useIntl } from "react-intl";
import { describe, expect, test } from "~/test/util";
import { parseFieldError } from "../validation";

describe("validation", () => {
  test("renders an error message", ({ render, screen }) => {
    function InvalidEmailMessage() {
      const intl = useIntl();
      return <p>{parseFieldError({ key: "invalid_email" }, intl)}</p>;
    }

    render(<InvalidEmailMessage />);
    expect(screen.getByText("Enter a valid email address")).toBeVisible();
  });

  test("renders an error message with a link", ({ render, screen }) => {
    function ServerErrorMessage() {
      const intl = useIntl();
      return (
        <p>
          {parseFieldError(
            {
              key: "server_error",
              values: { supportEmail: "a.kolodeev@cvmaker.nl" },
            },
            intl
          )}
        </p>
      );
    }
    render(<ServerErrorMessage />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("a.kolodeev@cvmaker.nl");
  });
});
