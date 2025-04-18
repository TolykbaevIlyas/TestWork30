import { create } from "zustand";
import { persist } from "zustand/middleware";

type WeatherState = {
  favorites: string[];
  history: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  addToHistory: (city: string) => void;
};

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      favorites: [],
      history: [],
      addFavorite: (city) =>
        set({ favorites: [...new Set([...get().favorites, city])] }),
      removeFavorite: (city) =>
        set({ favorites: get().favorites.filter((c) => c !== city) }),
      addToHistory: (city) =>
        set({
          history: [
            city,
            ...get().history.filter((c) => c !== city),
          ].slice(0, 5),
        }),
    }),
    { name: "weather-storage" }
  )
);