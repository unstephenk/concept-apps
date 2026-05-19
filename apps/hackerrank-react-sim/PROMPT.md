# 60-Minute HackerRank-Style React Prompt

## Scenario

Build a user directory that loads users from a real API and lets the interviewer search the list.

Use this endpoint:

```txt
https://dummyjson.com/users?limit=20
```

## Requirements

1. Fetch users when the app loads.
2. Show a loading state while fetching.
3. Show an error state if the request fails.
4. Map the API response into the app's `User` type.
5. Render a list of user cards.
6. Add a controlled search input.
7. Search should match:
   - full name
   - email
   - city
   - company
8. Search should be case-insensitive.
9. If the API returns no users, show `No users found.`
10. If the search has no matches, show `No matching users found.`
11. Do not mutate the users array.
12. Keep components reusable and typed.

## Expected app model

Use this internal type:

```ts
export type User = {
  id: number;
  fullName: string;
  email: string;
  city: string;
  company: string;
  image: string;
};
```

## Suggested implementation order

1. Complete `getUsers()` in `src/api/usersApi.ts`.
2. Add loading/error/users state in `src/App.tsx`.
3. Call `getUsers()` from `useEffect`.
4. Render loading/error/empty states.
5. Render `UserList`.
6. Add search state and derived `filteredUsers`.
7. Use `useMemo` if you think it makes sense.

## Interview explanation to practice

Say:

> I keep the API-facing code in `usersApi.ts`, map the external response into an internal `User` type, and keep the app state inside `App`. Search results are derived from `users` and `searchTerm`, so I do not store filtered users in state.
