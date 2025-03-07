import { FavouriteCityItem } from "@/api/types";
import { useLocalStorage } from "./useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFavourites() {
  const [favourites, setFavourites] = useLocalStorage<FavouriteCityItem[]>(
    "favourites",
    [] as FavouriteCityItem[]
  );

  const queryClient = useQueryClient();

  const favouritesQuery = useQuery({
    queryKey: ["favourites"],
    queryFn: () => favourites,
    initialData: favourites,
    staleTime: Infinity,
  });

  const addFavourite = useMutation({
    mutationFn: async (city: Omit<FavouriteCityItem, "id" | "addedAt">) => {
      const newFavourite: FavouriteCityItem = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const exists = favourites.some((fav) => fav.id === newFavourite.id);

      if (exists) {
        return favourites;
      }

      const newFavourites = [...favourites, newFavourite].slice(0, 10);

      setFavourites(newFavourites);
      return newFavourites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
  });

  const removeFavourite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavourites = favourites.filter((city) => city.id !== cityId);

      setFavourites(newFavourites);
      return newFavourites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
  });

  return {
    favourites: favouritesQuery.data ?? [],
    addFavourite,
    removeFavourite,
    isFavourite: (lat: number, lon: number) =>
      favourites.some((city) => city.lat === lat && city.lon === lon),
  };
}
