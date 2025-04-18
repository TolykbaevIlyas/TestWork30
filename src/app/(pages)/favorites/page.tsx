'use client';
import React, { useEffect, useState } from "react";
import { useWeatherStore } from "@/shared/model/weatherStore";
import { weatherApi } from "@/shared/api/weatherApi";
import { WeatherCard } from "@/entities/weather/ui/WeatherCard";
import Loader from "@/shared/ui/Loader/Loader";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";

// Типы
interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

interface FavoritesPageState {
  weatherData: WeatherData[];
  loading: boolean;
  error: string;
}

const FavoritesPage = () => {
  const { favorites } = useWeatherStore();
  const [state, setState] = useState<FavoritesPageState>({
    weatherData: [],
    loading: false,
    error: ""
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      setState({ ...state, loading: true, error: "" });

      try {
        const data = await Promise.all(
          favorites.map(async (city) => {
            const res = await weatherApi.getCurrentWeather(city);
            return res.data;
          })
        );
        setState({ ...state, weatherData: data, loading: false });
      } catch {
        setState({
          ...state,
          error: "Не удалось загрузить данные для избранных городов.",
          loading: false
        });
      }
    };

    if (favorites.length > 0) {
      fetchWeatherData();
    }
  }, [favorites]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Избранные города</h1>

      {state.loading && <Loader weather="" />}
      {state.error && <ErrorMessage message={state.error} />}

      {favorites.length === 0 ? (
        <p className="text-gray-500">Добавьте города в избранное, чтобы они здесь появились.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {state.weatherData.map((data, index) => (
            <WeatherCard
              key={index}
              city={data.name}
              temperature={data.main.temp}
              description={data.weather[0].description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
