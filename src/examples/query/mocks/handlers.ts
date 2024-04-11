import { http, HttpResponse, delay } from "msw";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { Post } from "../app/services/types";

let _id = 0;
const createFetchedAt = () => new Date().toUTCString();
const createNewId = () => (_id++).toString();

const postsAdapter = createEntityAdapter<Post>();

let state = postsAdapter.getInitialState();
state = postsAdapter.setAll(state, [
  { id: createNewId(), name: "default post A", fetched_at: createFetchedAt() },
  { id: createNewId(), name: "default post B", fetched_at: createFetchedAt() },
]);

export const handlers = [
  http.get("/posts", async () => {
    await delay(1000);
    return HttpResponse.json(Object.values(state.entities));
  }),

  http.get<Pick<Post, "id">>("/posts/:id", async ({ params }) => {
    const { id } = params;
    await delay(1000);

    if (!state.ids.includes(id)) {
      return HttpResponse.error();
    }

    state = postsAdapter.updateOne(state, {
      id,
      changes: { fetched_at: createFetchedAt() },
    });

    return HttpResponse.json(state.entities[id]);
  }),

  http.put<Pick<Post, "id">, Pick<Post, "name">>(
    "/posts/:id",
    async ({ params, request }) => {
      const { id } = params;
      const { name } = await request.json();
      await delay(1000);

      if (!state.ids.includes(id)) {
        return HttpResponse.error();
      }

      state = postsAdapter.updateOne(state, {
        id,
        changes: { fetched_at: createFetchedAt(), name },
      });

      return HttpResponse.json(state.entities[id]);
    }
  ),

  http.post<never, Pick<Post, "name">>("/posts", async ({ request }) => {
    const { name } = await request.json();
    await delay(1000);
    const id = createNewId();
    state = postsAdapter.addOne(state, {
      id,
      name,
      fetched_at: createFetchedAt(),
    });
    return HttpResponse.json(state.entities[id]);
  }),

  http.delete<Pick<Post, "id">>("/posts/:id", async ({ params }) => {
    const { id } = params;
    await delay(1000);

    if (!state.ids.includes(id)) {
      return HttpResponse.error();
    }
    state = postsAdapter.removeOne(state, id);
    return HttpResponse.json(null);
  }),
];
