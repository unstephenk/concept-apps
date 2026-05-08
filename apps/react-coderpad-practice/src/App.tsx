import { useUsers } from "./hooks/useUsers";



function App() {

  const { users, isLoading, isError, refetch } = useUsers();
  

  return (
    <main style={{ padding: "1rem" }}>
      <h1>User Admin</h1>

      {isLoading && <p>Loading users...</p>}

      {isError && <p>Failed to load users.</p>}

      {!isLoading && !isError && (
        <>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))}
        </ul>

        <button onClick={refetch}>Reload Users</button>
        </>
      )}

    </main>
  );
}

export default App;