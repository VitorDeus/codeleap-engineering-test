import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../api/posts";

const POSTS_KEY = ["posts"];

export function usePosts() {
  return useQuery({
    queryKey: POSTS_KEY,
    queryFn: postsApi.list,
    select: (data) =>
      [...data.results].sort(
        (a, b) =>
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime()
      ),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: number; title: string; content: string }) =>
      postsApi.update(id, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => postsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });
}
