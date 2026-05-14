import { useMemo, useState } from "react";

import { useUsers } from "../hooks/useUsers";

import { useFavorites } from "../context/FavoritesContext";

import EmptyState from "../components/EmptyState";
import UserList from "../components/UserList";
import ErrorMessage from "../components/ErrorMessage";
import CounterDisplay from "../components/CounterDisplay";
import CounterControls from "../components/CounterControls";
import AddUserForm from "../components/AddUserForm";

function UserAdminPage() {

  const { users, isLoading, isError, isEmpty, refetch, addUser, deleteUser } = useUsers();
  const { favoriteUserIds } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [users, searchTerm]);

  const hasSearchTerm = searchTerm.trim().length > 0;
  const hasNoMatchingUsers = hasSearchTerm && filteredUsers.length === 0;

  return (
    <main style={{ padding: "1rem" }}>
      <h1>User Admin</h1>

      <p>Total Favorites: {favoriteUserIds.length}</p>

      <br />

      <div>
        <AddUserForm onAddUser={addUser} />
      </div>

      <label htmlFor="user-search">Search</label>
      <input
        id="user-search"
        value={searchTerm}
        type="text"
        placeholder="Search users by name or email"
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <br />

      <button onClick={refetch} disabled={isLoading}>
        Reload Users
      </button>

      {isLoading && <EmptyState message="Loading users..." />}

      {isError && <ErrorMessage message="Failed to load users." />}

      {!isLoading && !isError && isEmpty && (
        <EmptyState message="No users found." />
      )}

      {!isLoading && !isError && !isEmpty && hasNoMatchingUsers && (
        <EmptyState message="No matching users found." />
      )}

      {!isLoading && !isError && !isEmpty && !hasNoMatchingUsers && (
        <>
          <UserList users={filteredUsers} onDeleteUser={deleteUser} />

          <br />

          <CounterDisplay></CounterDisplay>
          <CounterControls></CounterControls>
        </>
      )}
    </main>
  );
}

export default UserAdminPage;