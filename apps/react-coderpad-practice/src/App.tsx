import { useUsers } from "./hooks/useUsers";
import EmptyState from "./components/EmptyState"
import UserList from "./components/UserList";
import ErrorMessage from "./components/ErrorMessage";


function App() {

  const { users, isLoading, isError, isEmpty, refetch } = useUsers();


  return (
    <main style={{ padding: "1rem" }}>
      <h1>User Admin</h1>

      {isLoading && <EmptyState message={"Loading users..."} />}

      {isError && <ErrorMessage message={"Failed to load users."} />}

      {!isLoading && !isError && isEmpty && (
        <EmptyState message={"No users found."} />
      )}

      {!isLoading && !isError && (
        <>
          <UserList users={users} />

          <button onClick={refetch}  disabled={isLoading}>Reload Users</button>
        </>
      )}

    </main>
  );
}

export default App;