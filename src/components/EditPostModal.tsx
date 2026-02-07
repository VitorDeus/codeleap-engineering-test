import { useState } from "react";
import Modal from "./Modal";
import { useUpdatePost } from "../hooks/usePosts";
import type { Post } from "../types/post";

interface EditPostModalProps {
  open: boolean;
  post: Post | null;
  onClose: () => void;
}

function EditPostForm({ post, onClose }: { post: Post; onClose: () => void }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const updatePost = useUpdatePost();

  const canSave = title.trim() !== "" && content.trim() !== "";

  const handleSave = () => {
    if (!canSave) return;
    updatePost.mutate(
      { id: post.id, title: title.trim(), content: content.trim() },
      { onSuccess: onClose }
    );
  };

  return (
    <>
      <h2 className="mb-6 text-[22px] font-bold">Edit item</h2>

      <label className="mb-2 block text-base" htmlFor="edit-title">
        Title
      </label>
      <input
        id="edit-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-6 w-full rounded-lg border border-[#ccc] px-3 py-2 text-sm focus:border-[#7695EC] focus:outline-none"
      />

      <label className="mb-2 block text-base" htmlFor="edit-content">
        Content
      </label>
      <textarea
        id="edit-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="mb-6 w-full rounded-lg border border-[#ccc] px-3 py-2 text-sm focus:border-[#7695EC] focus:outline-none resize-none"
      />

      {updatePost.isError && (
        <p className="mb-4 text-sm text-red-500">
          Failed to update post. Please try again.
        </p>
      )}

      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          disabled={updatePost.isPending}
          className="rounded-lg border border-[#999] bg-white px-8 py-2 text-base font-bold uppercase disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!canSave || updatePost.isPending}
          className="rounded-lg bg-[#47B960] px-8 py-2 text-base font-bold text-white uppercase disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </>
  );
}

export default function EditPostModal({
  open,
  post,
  onClose,
}: EditPostModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      {post && <EditPostForm key={post.id} post={post} onClose={onClose} />}
    </Modal>
  );
}
