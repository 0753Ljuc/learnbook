import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "./types";
// Or from '@reduxjs/toolkit/query', but it does not help to infer the `useGetPostQuery` from api.

export const api = createApi({
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (build) => ({
    getPost: build.query<Post, Pick<Post, "id">>({
      query: ({ id }) => ({ url: `posts/${id}` }),
      providesTags: ["Posts"],
    }),

    getPosts: build.query<Post[], void>({
      query: () => ({ url: "posts" }),
      providesTags: ["Posts"],
    }),

    addPost: build.mutation<Post, Pick<Post, "name">>({
      query(data) {
        return { url: "posts", method: "POST", body: data };
      },
      invalidatesTags: ["Posts"],
    }),

    updatePost: build.mutation<Post, Omit<Post, "fetched_at">>({
      query({ id, name }) {
        return {
          url: `posts/${id}`,
          method: "PUT",
          body: { name },
        };
      },
      invalidatesTags: ["Posts"],
    }),

    deletePost: build.mutation<unknown, Pick<Post, "id">>({
      query(data) {
        return { url: `posts/${data.id}`, method: "DELETE" };
      },
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = api;

export const _sourceCode = `export const api = createApi({
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (build) => ({
    getPost: build.query<Post, Pick<Post, "id">>({
      query: ({ id }) => ({ url: \`posts/\${id}\` }),
      providesTags: ["Posts"],
    }),

    getPosts: build.query<Post[], void>({
      query: () => ({ url: "posts" }),
    }),

    addPost: build.mutation<Post, Pick<Post, "name">>({
      query(data) {
        return { url: "posts", method: "POST", body: data };
      },
      invalidatesTags: ["Posts"],
    }),

    updatePost: build.mutation<Post, Omit<Post, "fetched_at">>({
      query({ id, name }) {
        return {
          url: \`posts/\${id}\`,
          method: "PUT",
          body: { name },
        };
      },
      invalidatesTags: ["Posts"],
    }),

    deletePost: build.mutation<unknown, Pick<Post, "id">>({
      query(data) {
        return { url: \`posts/\${data.id}\`, method: "DELETE" };
      },
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = api;`;
