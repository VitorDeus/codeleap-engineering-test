import { useState } from "react";
import Header from "../components/Header";
import CreatePostCard from "../components/CreatePostCard";
import PostCard from "../components/PostCard";
import DeletePostModal from "../components/DeletePostModal";
import EditPostModal from "../components/EditPostModal";
import { usePosts } from "../hooks/usePosts";
import { useUsername } from "../hooks/useUsername";
import type { Post } from "../types/post";

export default function FeedPage() {
  const { username } = useUsername();
  const { data: posts, isLoading, isError } = usePosts();

  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [editPost, setEditPost] = useState<Post | null>(null);

  return (
    <div className="min-h-screen bg-[#333]">
      <div className="mx-auto max-w-[800px]">
        <Header />

        <div className="flex flex-col gap-6 bg-white p-6">
          <CreatePostCard username={username} />

          {isLoading && (
            <div className="flex flex-col gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl border border-[#ccc]"
                >
                  <div className="h-18 bg-[#bdd0f7]" />
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-1/3 rounded bg-[#e5e5e5]" />
                    <div className="h-4 w-full rounded bg-[#e5e5e5]" />
                    <div className="h-4 w-2/3 rounded bg-[#e5e5e5]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <p className="text-center text-sm text-red-500">
              Failed to load posts. Please try again later.
            </p>
          )}

          {posts?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isOwner={post.username === username}
              onEdit={() => setEditPost(post)}
              onDelete={() => setDeletePostId(post.id)}
            />
          ))}
        </div>
      </div>

      <DeletePostModal
        open={deletePostId !== null}
        postId={deletePostId}
        onClose={() => setDeletePostId(null)}
      />

      <EditPostModal
        open={editPost !== null}
        post={editPost}
        onClose={() => setEditPost(null)}
      />
    </div>
  );
}
