import Modal from "./Modal";
import { useDeletePost } from "../hooks/usePosts";

interface DeletePostModalProps {
  open: boolean;
  postId: number | null;
  onClose: () => void;
}

export default function DeletePostModal({
  open,
  postId,
  onClose,
}: DeletePostModalProps) {
  const deletePost = useDeletePost();

  const handleDelete = () => {
    if (postId === null) return;
    deletePost.mutate(postId, { onSuccess: onClose });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <p className="mb-10 text-[22px] font-bold">
        Are you sure you want to delete this item?
      </p>

      {deletePost.isError && (
        <p className="mb-4 text-sm text-red-500">
          Failed to delete post. Please try again.
        </p>
      )}

      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          disabled={deletePost.isPending}
          className="rounded-lg border border-[#999] bg-white px-8 py-2 text-base font-bold uppercase disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={deletePost.isPending}
          className="rounded-lg bg-[#FF5151] px-8 py-2 text-base font-bold text-white uppercase disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
