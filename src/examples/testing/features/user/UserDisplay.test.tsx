import { http, HttpResponse, delay } from "msw";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { UserDisplay } from "./UserDisplay";
import { setupServer } from "msw/node";
import { User } from "./userSlice";

const handlers = [
  http.get<never, never, User>("/user", async () => {
    await delay(200);
    return HttpResponse.json({ name: "John Smith" });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("show 'No user' by default in idle status", async () => {
  renderWithProviders(<UserDisplay />);
  expect(screen.getByText(/no user/i)).toBeInTheDocument();
});

test("show 'Fetching user' while calling api", async () => {
  renderWithProviders(<UserDisplay />);
  fireEvent.click(screen.getByRole("button", { name: /Fetch user/i }));
  expect(screen.queryByText("Fetching user...")).toBeInTheDocument();
});

test("show username while calling api", async () => {
  renderWithProviders(<UserDisplay />);
  fireEvent.click(screen.getByRole("button", { name: /Fetch user/i }));

  expect(screen.queryByText("Fetching user...")).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText("John Smith")).toBeInTheDocument();
    expect(screen.queryByText("Fetching user...")).not.toBeInTheDocument();
  });
});

test("show 'Fetching Fail!' while api call failing", async () => {
  server.use(http.get("/user", () => HttpResponse.error()));

  renderWithProviders(<UserDisplay />);
  fireEvent.click(screen.getByRole("button", { name: /Fetch user/i }));

  await waitFor(() => {
    expect(screen.queryByText("Fetching Fail!")).toBeInTheDocument();
  });
});
