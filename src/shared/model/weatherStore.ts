import { create } from "zustand";
import { persist } from "zustand/middleware";

type WeatherState = {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
};

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (city) =>
        set({ favorites: [...new Set([...get().favorites, city])] }),
      removeFavorite: (city) =>
        set({ favorites: get().favorites.filter((c) => c !== city) }),
    }),
    { name: "weather-storage" }
  )
);
