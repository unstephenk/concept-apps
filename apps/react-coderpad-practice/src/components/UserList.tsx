import UserCard from "./UserCard";
import type { User } from "../types/user";

type UserListProps = {
  users: User[];
  onDeleteUser: (userId: string) => Promise<void>;
};

function UserList({ users, onDeleteUser }: UserListProps) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} onDeleteUser={onDeleteUser} />
        </li>
      ))}
    </ul>
  );
}

export default UserList;