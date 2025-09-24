import { useQuery} from "@tanstack/react-query";
import { api } from "../../../App servise/axsios/MyAxiosWrapper";


export type Area = { strArea: string };
export type MealSummary = { idMeal: string; strMeal: string; strMealThumb: string };
export type MealDetail = { [key: string]: any };

export const useAreas = () => {
  return useQuery<Area[], Error>({
    queryKey: ["areas"],
    queryFn: async () => {
      const { data } = await api.get("/list.php?a=list");
      return data.meals ?? [];
    },
  });
};

export const useMealsByArea = (area: string | null) => {
  return useQuery<MealSummary[], Error>({
    queryKey: ["meals", area],
    queryFn: async () => {
      const { data } = await api.get(`/filter.php?a=${encodeURIComponent(area!)}`);
      return data.meals ?? [];
    },
    enabled: !!area, // აქ TypeScript უკვე იცის
  });
};

export const useMealDetail = (id: string | null) => {
  return useQuery<MealDetail | null, Error>({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await api.get(`/lookup.php?i=${id}`);
      return data.meals?.[0] ?? null;
    },
    enabled: !!id,
  });
};

export const useFavoriteMeals = (favoriteIds: string[]) => {
  return useQuery<MealDetail[], Error>({
    queryKey: ["favoriteMeals", favoriteIds],
    queryFn: async () => {
      const meals = await Promise.all(
        favoriteIds.map(async (id) => {
          const { data } = await api.get(`/lookup.php?i=${id}`);
          return data.meals?.[0] ?? null;
        })
      );
      return meals.filter(Boolean) as MealDetail[];
    },
    enabled: favoriteIds.length > 0,
  });
};
