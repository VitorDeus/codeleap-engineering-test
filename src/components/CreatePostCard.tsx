import { useState } from "react";
import { useCreatePost } from "../hooks/usePosts";

interface CreatePostCardProps {
  username: string;
}

export default function CreatePostCard({ username }: CreatePostCardProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createPost = useCreatePost();

  const canSubmit = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;
    createPost.mutate(
      { username, title: title.trim(), content: content.trim() },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
        },
      }
    );
  };

  return (
    <div className="rounded-2xl border border-[#999] bg-white p-6">
      <h2 className="mb-6 text-[22px] font-bold">What's on your mind?</h2>

      <label className="mb-2 block text-base" htmlFor="post-title">
        Title
      </label>
      <input
        id="post-title"
        type="text"
        placeholder="Hello world"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-6 w-full rounded-lg border border-[#ccc] px-3 py-2 text-sm placeholder:text-[#ccc] focus:border-[#7695EC] focus:outline-none"
      />

      <label className="mb-2 block text-base" htmlFor="post-content">
        Content
      </label>
      <textarea
        id="post-content"
        placeholder="Content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="mb-6 w-full rounded-lg border border-[#ccc] px-3 py-2 text-sm placeholder:text-[#ccc] focus:border-[#7695EC] focus:outline-none resize-none"
      />

      {createPost.isError && (
        <p className="mb-4 text-sm text-red-500">
          Failed to create post. Please try again.
        </p>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || createPost.isPending}
          className="rounded-lg bg-[#7695EC] px-8 py-2 text-base font-bold text-white uppercase disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create
        </button>
      </div>
    </div>
  );
}
