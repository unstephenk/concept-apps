import type { User } from "../types/user"

type UserCardProps = {
    user: User;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {

    return (
        <>
            <strong>{user.name}</strong> — {user.email}
        </>
    );
};

export default UserCard;