import { describe, expect, it, vi, afterEach } from "vitest";
import { getUsers } from "./usersApi";

describe("getUsers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and maps API users into the app User type", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          users: [
            {
              id: 1,
              firstName: "Alice",
              lastName: "Johnson",
              email: "alice@test.com",
              image: "https://example.com/alice.png",
              address: { city: "Dallas" },
              company: { name: "Acme" },
            },
          ],
        }),
      })
    );

    await expect(getUsers()).resolves.toEqual([
      {
        id: 1,
        fullName: "Alice Johnson",
        email: "alice@test.com",
        city: "Dallas",
        company: "Acme",
        image: "https://example.com/alice.png",
      },
    ]);
  });

  it("throws when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    await expect(getUsers()).rejects.toThrow();
  });
});
