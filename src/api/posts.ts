import { http } from "./http";
import type { Post } from "../types/post";

interface PostsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export const postsApi = {
  list: () => http.get<PostsResponse>(""),
  create: (body: { username: string; title: string; content: string }) =>
    http.post<Post>("", body),
  update: (id: number, body: { title: string; content: string }) =>
    http.patch<Post>(`${id}/`, body),
  remove: (id: number) => http.delete<void>(`${id}/`),
};
