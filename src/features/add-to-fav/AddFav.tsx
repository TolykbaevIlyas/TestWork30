import React from "react";
import { useWeatherStore } from "@/shared/model/weatherStore";

interface Props {
  city: string;
}

export const FavButton: React.FC<Props> = ({ city }) => {
  const favorites = useWeatherStore((state) => state.favorites);
  const addFavorite = useWeatherStore((state) => state.addFavorite);
  const removeFavorite = useWeatherStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(city);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
  };

  return (
    <button
      className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"} ms-2`}
      onClick={toggleFavorite}
    >
      {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
    </button>
  );
};
