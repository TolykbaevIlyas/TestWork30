import { FavButton } from "@/features/add-to-fav/AddFav";
import React from "react";

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  description,
}) => {
  return (
    <div className="card p-3 mb-3">
      <h2>{city}</h2>
      <p>Температура: {Math.round(temperature)}°C</p>
      <p>Погода: {description}</p>
      <FavButton city={city} />
    </div>
  );
};
