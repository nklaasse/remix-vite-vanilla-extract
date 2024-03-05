import { describe, expect, test } from "~/test/util";
import { Anchor } from "./Anchor";
import { Route, Routes } from "react-router";

describe("Anchor", () => {
  test("renders an internal link", async ({ render, screen, user }) => {
    render(
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <p>Root</p> <Anchor to="/dashboard">To Dashboard</Anchor>
            </div>
          }
        />
        <Route path="/dashboard" element={<p>Welcome to Dashboard</p>} />
      </Routes>
    );
    const dashboardLink = screen.getByRole("link", { name: "To Dashboard" });
    await user.click(dashboardLink);
    expect(screen.getByText("Welcome to Dashboard")).toBeVisible();
  });

  test("renders an external link", async ({ render, screen, user }) => {
    render(<Anchor to="https://google.com">To Google</Anchor>);
    const googleLink = screen.getByRole("link", { name: "To Google" });
    await user.click(googleLink);
    expect(googleLink).toBeVisible();
  });

  test("renders a relative link", async ({ render, screen, user }) => {
    render(<Anchor to="relatives">To Relatives</Anchor>);
    const relativesLink = screen.getByRole("link", { name: "To Relatives" });
    await user.click(relativesLink);
    expect(relativesLink).toBeVisible();
  });
});
