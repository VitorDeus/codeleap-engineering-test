import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PostCard from "./PostCard";
import type { Post } from "../types/post";

const mockPost: Post = {
  id: 1,
  username: "vitor",
  title: "Test Post",
  content: "Some content here",
  created_datetime: new Date().toISOString(),
};

describe("PostCard ownership", () => {
  it("shows Edit and Delete buttons when user is the owner", () => {
    render(
      <PostCard
        post={mockPost}
        isOwner={true}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Edit post")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete post")).toBeInTheDocument();
  });

  it("hides Edit and Delete buttons when user is NOT the owner", () => {
    render(
      <PostCard
        post={mockPost}
        isOwner={false}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.queryByLabelText("Edit post")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Delete post")).not.toBeInTheDocument();
  });

  it("renders post title, username, and content", () => {
    render(
      <PostCard
        post={mockPost}
        isOwner={false}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("@vitor")).toBeInTheDocument();
    expect(screen.getByText("Some content here")).toBeInTheDocument();
  });
});
