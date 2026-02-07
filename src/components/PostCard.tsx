import { formatDistanceToNow } from "date-fns";
import type { Post } from "../types/post";

interface PostCardProps {
  post: Post;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PostCard({
  post,
  isOwner,
  onEdit,
  onDelete,
}: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.created_datetime), {
    addSuffix: true,
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-[#999] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#7695EC] px-6 py-5">
        <h3 className="text-[22px] font-bold text-white">{post.title}</h3>
        {isOwner && (
          <div className="flex gap-4">
            <button
              onClick={onDelete}
              aria-label="Delete post"
              className="text-white hover:opacity-80"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
            <button
              onClick={onEdit}
              aria-label="Edit post"
              className="text-white hover:opacity-80"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <div className="mb-4 flex items-center justify-between text-sm text-[#777]">
          <span className="font-bold text-[#777]">@{post.username}</span>
          <span>{timeAgo}</span>
        </div>
        <p className="whitespace-pre-wrap text-base text-[#000]">
          {post.content}
        </p>
      </div>
    </div>
  );
}
