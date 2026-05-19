import type { User } from "../types/user";

let mockUsers: User[] = [
  { id: "u1", name: "Alice Johnson", email: "alice@test.com" },
  { id: "u2", name: "Bob Smith", email: "bob@test.com" },
  { id: "u3", name: "Charlie Davis", email: "charlie@test.com" },
];

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getUsers(): Promise<User[]> {
  await delay(1000);

  return mockUsers;
}

export async function createUser(user: User): Promise<User> {
  await delay(500);

  mockUsers = [...mockUsers, user];

  return user;
}

export async function deleteUser(userId: string): Promise<void> {
  await delay(500);

  mockUsers = mockUsers.filter((user) => user.id !== userId);

  alert(`User: ${userId} has been deleted`)
}