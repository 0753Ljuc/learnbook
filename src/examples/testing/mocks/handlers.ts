import { http, HttpResponse, delay } from "msw";
import { User } from "../features/user/userSlice";

export const handlers = [
  http.get<never, never, User>("/user", async () => {
    await delay(1000);
    return HttpResponse.json({ name: "Garrett" });
  }),
];
