import { useState } from "react"

import { useUsers } from "./hooks/useUsers";
import EmptyState from "./components/EmptyState"
import UserList from "./components/UserList";
import ErrorMessage from "./components/ErrorMessage";


function App() {

  const { users, isLoading, isError, isEmpty, refetch } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch)
    );
  });

  const hasSearchTerm = normalizedSearch.length > 0;
  const hasNoMatchingUsers = hasSearchTerm && filteredUsers.length === 0;

  return (
    <main style={{ padding: "1rem" }}>
      <h1>User Admin</h1>

      <label htmlFor="user-search">Search</label>
      <input
        id="user-search"
        value={searchTerm}
        type="text"
        placeholder="Search users by name or email"
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <br />

      <button onClick={refetch} disabled={isLoading}>Reload Users</button>

      {isLoading && <EmptyState message={"Loading users..."} />}

      {isError && <ErrorMessage message={"Failed to load users."} />}

      {!isLoading && !isError && isEmpty && (
        <EmptyState message="No users found." />
      )}

      {!isLoading && !isError && !isEmpty && hasNoMatchingUsers && (
        <EmptyState message="No matching users found." />
      )}

      {!isLoading && !isError && !isEmpty && !hasNoMatchingUsers && (
        <UserList users={filteredUsers} />
      )}

    </main>
  );
}

export default App;