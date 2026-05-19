# HackerRank React Simulation

This is a fresh React + TypeScript mini codebase for a one-question, full-hour interview simulation.

## Setup

```bash
npm install
npm run dev
```

Run tests:

```bash
npm test
```

The tests are intentionally written like a coding assessment. Some may fail until you complete the exercise.

## Main exercise

Open `PROMPT.md` and implement the requested feature.

The project is intentionally small:

```txt
src/
  api/
    usersApi.ts
  components/
    SearchInput.tsx
    StatusMessage.tsx
    UserCard.tsx
    UserList.tsx
  types/
    user.ts
  App.tsx
```

## Real API

The intended API is:

```txt
https://dummyjson.com/users?limit=20
```

The API returns a shape different from the app's internal `User` type. Part of the exercise is mapping API data into a clean frontend model.
