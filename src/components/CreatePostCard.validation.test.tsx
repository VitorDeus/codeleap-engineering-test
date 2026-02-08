import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import CreatePostCard from "./CreatePostCard";

function renderCard() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <CreatePostCard username="vitor" />
    </QueryClientProvider>,
  );
}

describe("CreatePostCard validation", () => {
  it("disables Create button when title and content are empty", () => {
    renderCard();
    const button = screen.getByRole("button", { name: /create/i });
    expect(button).toBeDisabled();
  });

  it("disables Create button when only title is filled", async () => {
    const user = userEvent.setup();
    renderCard();

    await user.type(screen.getByPlaceholderText("Hello world"), "My title");

    expect(screen.getByRole("button", { name: /create/i })).toBeDisabled();
  });

  it("disables Create button when only content is filled", async () => {
    const user = userEvent.setup();
    renderCard();

    await user.type(screen.getByPlaceholderText("Content here"), "My content");

    expect(screen.getByRole("button", { name: /create/i })).toBeDisabled();
  });

  it("enables Create button when both title and content are filled", async () => {
    const user = userEvent.setup();
    renderCard();

    await user.type(screen.getByPlaceholderText("Hello world"), "My title");
    await user.type(screen.getByPlaceholderText("Content here"), "My content");

    expect(screen.getByRole("button", { name: /create/i })).toBeEnabled();
  });
});
