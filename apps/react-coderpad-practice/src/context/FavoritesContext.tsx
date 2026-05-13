import { createContext, useContext, useState, type ReactNode } from 'react';


type FavoritesContextValue = {
    favoriteUserIds: string[];
    toggleFavorite: (userId: string) => void;
    isFavorite: (userId: string) => boolean;
};

type FavoritesProviderProps = {
    children: ReactNode;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favoriteUserIds, setFavoriteUserIds] = useState<string[]>([])

    const toggleFavorite = (userId: string) => {
        setFavoriteUserIds((currentIds) => {
            if (currentIds.includes(userId)) {
                return currentIds.filter((id) => id !== userId);
            }

            return [...currentIds, userId];
        });
    };

    const isFavorite = (userId: string) => {
        return favoriteUserIds.includes(userId);
    };

    return (
        <FavoritesContext
            value={{
                favoriteUserIds,
                toggleFavorite,
                isFavorite,
            }}
        >{children}</FavoritesContext>
    )

}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
