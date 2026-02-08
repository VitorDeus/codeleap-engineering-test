import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import { UsernameContext } from "./hooks/useUsername";
import SignupPage from "./pages/SignupPage";
import FeedPage from "./pages/FeedPage";

function renderApp(initialPath: string, username: string) {
  const ctx = {
    username,
    setUsername: () => {},
    clearUsername: () => {},
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <UsernameContext.Provider value={ctx}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route
              path="/signup"
              element={
                username ? (
                  <div data-testid="redirected-to-feed" />
                ) : (
                  <SignupPage />
                )
              }
            />
            <Route
              path="/feed"
              element={
                username ? (
                  <FeedPage />
                ) : (
                  <div data-testid="redirected-to-signup" />
                )
              }
            />
            <Route
              path="*"
              element={
                <div
                  data-testid={
                    username ? "redirected-to-feed" : "redirected-to-signup"
                  }
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </UsernameContext.Provider>
    </QueryClientProvider>,
  );
}

describe("App routing guards", () => {
  it("redirects to /signup when no username and navigating to /feed", () => {
    renderApp("/feed", "");
    expect(screen.getByTestId("redirected-to-signup")).toBeInTheDocument();
  });

  it("redirects to /feed when username exists and navigating to /signup", () => {
    renderApp("/signup", "vitor");
    expect(screen.getByTestId("redirected-to-feed")).toBeInTheDocument();
  });

  it("shows SignupPage when no username and navigating to /signup", () => {
    renderApp("/signup", "");
    expect(
      screen.getByText("Welcome to CodeLeap network!"),
    ).toBeInTheDocument();
  });
});
