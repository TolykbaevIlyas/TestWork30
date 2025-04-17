'use client'
import React from "react";
import { useWeatherStore } from "@/shared/model/weatherStore";
import { WeatherCard } from "@/entities/weather/ui/WeatherCard";

const FavoritesPage = () => {
  const { favorites } = useWeatherStore();

  return (
    <div className="container py-4">
      <h1 className="mb-4">Избранные города</h1>

      {favorites.length === 0 ? (
        <p>Добавьте города в избранное, чтобы они здесь появились.</p>
      ) : (
        <div className="row">
          {favorites.map((city, index) => (
            <div key={index} className="col-md-2 mb-4">
              <WeatherCard city={city} temperature={0} description="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
