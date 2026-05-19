import { useMemo, useState } from "react";
import { getUsers } from "./api/usersApi";
import SearchInput from "./components/SearchInput";
import StatusMessage from "./components/StatusMessage";
import UserList from "./components/UserList";
import type { User } from "./types/user";

type LoadStatus = "idle" | "loading" | "success" | "error";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<LoadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * TODO:
   * Fetch users when the app loads.
   *
   * Requirements:
   * - set status to "loading"
   * - call getUsers()
   * - save users on success
   * - set status to "success"
   * - set error message and status "error" on failure
   */

  const filteredUsers = useMemo(() => {
    /**
     * TODO:
     * Return users filtered by searchTerm.
     *
     * Search should check:
     * - fullName
     * - email
     * - city
     * - company
     *
     * Search should be case-insensitive.
     */
    return users;
  }, [users, searchTerm]);

  const hasSearchTerm = searchTerm.trim().length > 0;
  const isLoading = status === "loading";
  const isError = status === "error";
  const isEmpty = status === "success" && users.length === 0;
  const hasNoMatches =
    status === "success" && users.length > 0 && hasSearchTerm && filteredUsers.length === 0;

  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>User Directory</h1>
          <p>Load users from a real API and search the results.</p>
        </div>

        <button type="button" onClick={() => void getUsers()} disabled={isLoading}>
          API Smoke Test
        </button>
      </header>

      <SearchInput value={searchTerm} onChange={setSearchTerm} />

      {status === "idle" && (
        <StatusMessage message="TODO: Fetch users when the app loads." />
      )}

      {isLoading && <StatusMessage message="Loading users..." />}

      {isError && (
        <StatusMessage message={errorMessage || "Failed to load users."} />
      )}

      {isEmpty && <StatusMessage message="No users found." />}

      {hasNoMatches && <StatusMessage message="No matching users found." />}

      {status === "success" && !isEmpty && !hasNoMatches && (
        <UserList users={filteredUsers} />
      )}
    </main>
  );
}

export default App;
