import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./api/usersApi", () => ({
  getUsers: vi.fn(async () => [
    {
      id: 1,
      fullName: "Alice Johnson",
      email: "alice@test.com",
      city: "Dallas",
      company: "Acme",
      image: "https://example.com/alice.png",
    },
    {
      id: 2,
      fullName: "Bob Smith",
      email: "bob@test.com",
      city: "Austin",
      company: "Globex",
      image: "https://example.com/bob.png",
    },
  ]),
}));

describe("App", () => {
  it("loads users and filters search results", async () => {
    render(<App />);

    expect(screen.getByText(/loading users/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
      expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    });

    await userEvent.type(screen.getByLabelText(/search users/i), "austin");

    expect(screen.queryByText("Alice Johnson")).not.toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });
});
