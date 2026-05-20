import type { User } from "../types/user";

const USERS_URL = "https://dummyjson.com/users?limit=20";

type ApiUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  address?: {
    city?: string;
  };
  company?: {
    name?: string;
  };
};

type ApiUsersResponse = {
  users: ApiUser[];
};

/**
 * TODO:
 * 1. Fetch USERS_URL.
 * 2. Throw an Error if the response is not ok.
 * 3. Parse JSON as ApiUsersResponse.
 * 4. Map ApiUser[] into User[].
 *
 * Hint:
 * fullName should combine firstName and lastName.
 * city and company should safely default to "Unknown" if missing.
 */
export async function getUsers(): Promise<User[]> {
  const res = await fetch(USERS_URL);

  if (!res.ok) {
    throw new Error('Failed to load users');
  }

  const data: ApiUsersResponse = await res.json()

  return data.users.map((user) => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    city: user.address?.city ?? "Unknown",
    company: user.company?.name ?? "Unknown",
    image: user.image
  }))
}

export const __testing = {
  USERS_URL,
};
