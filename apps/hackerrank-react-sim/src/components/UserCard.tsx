import type { User } from "../types/user";

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  return (
    <article className="card">
      <img src={user.image} alt={`${user.fullName} avatar`} />
      <div>
        <h2>{user.fullName}</h2>
        <p>{user.email}</p>
        <p>
          {user.city} • {user.company}
        </p>
      </div>
    </article>
  );
}

export default UserCard;
