import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeAll } from "vitest";
import DeletePostModal from "./DeletePostModal";

// jsdom doesn't implement HTMLDialogElement methods
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

function renderModal(props: { open: boolean; postId: number | null; onClose: () => void }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <DeletePostModal {...props} />
    </QueryClientProvider>,
  );
}

describe("DeletePostModal", () => {
  it("shows confirmation text when open", () => {
    const onClose = vi.fn();
    renderModal({ open: true, postId: 1, onClose });

    expect(
      screen.getByText("Are you sure you want to delete this item?"),
    ).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderModal({ open: true, postId: 1, onClose });

    await user.click(screen.getByRole("button", { name: /cancel/i, hidden: true }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
