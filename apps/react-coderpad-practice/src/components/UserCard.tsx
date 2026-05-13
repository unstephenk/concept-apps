import type { User } from "../types/user";
import { useFavorites } from "../context/FavoritesContext";

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorited = isFavorite(user.id);

  return (
    <>
      <strong>{user.name}</strong> — {user.email}
      <br />
      <button
        type="button"
        onClick={() => toggleFavorite(user.id)}
        aria-pressed={favorited}
      >
        {favorited ? "Unfavorite" : "Favorite"}
      </button>
    </>
  );
}

export default UserCard;