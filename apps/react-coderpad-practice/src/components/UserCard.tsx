import type { User } from "../types/user";
import { useFavorites } from "../context/FavoritesContext";

type UserCardProps = {
  user: User;
  onDeleteUser: (userId: string) => void
};

function UserCard({ user, onDeleteUser }: UserCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorited = isFavorite(user.id);

  return (
    <>
      <strong>{user.name}</strong> — {user.email}
      <br />
      <div>
        <button
          type="button"
          onClick={() => toggleFavorite(user.id)}
          aria-pressed={favorited}
        >
          {favorited ? "Unfavorite" : "Favorite"}
        </button>
      </div>

      <div>
        <button type="button" onClick={() => onDeleteUser(user.id)}>
          Delete
        </button>
      </div>

    </>
  );
}

export default UserCard;