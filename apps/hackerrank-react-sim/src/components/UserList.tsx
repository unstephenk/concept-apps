import type { User } from "../types/user";
import UserCard from "./UserCard";

type UserListProps = {
  users: User[];
};

function UserList({ users }: UserListProps) {
  return (
    <section className="grid" aria-label="User results">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}

export default UserList;
