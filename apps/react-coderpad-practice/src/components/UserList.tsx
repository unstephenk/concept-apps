import UserCard from "./UserCard"
import type { User } from "../types/user"

type UserListProps = {
    users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <UserCard user={user}></UserCard>
                </li>
            ))}
        </ul>
    )
}

export default UserList