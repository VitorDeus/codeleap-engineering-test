import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { UsernameContext } from "../hooks/useUsername";
import SignupPage from "./SignupPage";

function renderSignup() {
  const ctx = {
    username: "",
    setUsername: () => {},
    clearUsername: () => {},
  };

  return render(
    <UsernameContext.Provider value={ctx}>
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    </UsernameContext.Provider>,
  );
}

describe("SignupPage", () => {
  it("disables ENTER button when username is empty", () => {
    renderSignup();
    const button = screen.getByRole("button", { name: /enter/i });
    expect(button).toBeDisabled();
  });

  it("enables ENTER button after typing a username", async () => {
    const user = userEvent.setup();
    renderSignup();

    const input = screen.getByPlaceholderText("John Doe");
    await user.type(input, "Vitor");

    const button = screen.getByRole("button", { name: /enter/i });
    expect(button).toBeEnabled();
  });
});
