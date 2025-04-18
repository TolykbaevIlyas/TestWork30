"use client";
import React, { useState } from "react";
import { weatherApi } from "@/shared/api/weatherApi";
import { getCurrentPosition } from "@/shared/api/geolocation";

import styles from "./Home.module.scss";
import SearchForm from "@/features/search-city/SearchForm";
import Loader from "@/shared/ui/Loader/Loader";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import { WeatherCard } from "@/entities/weather/ui/WeatherCard";
import { TemperatureChart } from "@/entities/weather/ui/TemperatureChart";
import { useWeatherStore } from "@/shared/model/weatherStore";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
  }>;
}

interface HourlyForecastItem {
  dt: number;
  main: { temp: number };
  weather: Array<{ description: string }>;
}

interface ForecastData {
  list: HourlyForecastItem[];
  city: { name: string };
}

const HomePage = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    favorites,
    history,
    addFavorite,
    removeFavorite,
    addToHistory
  } = useWeatherStore();

  const handleSearch = async (searchCity: string) => {
    setLoading(true);
    setError("");
    setData(null);
    setForecast(null);

    try {
      const [currentRes, forecastRes] = await Promise.all([
        weatherApi.getCurrentWeather(searchCity),
        weatherApi.getForecast(searchCity)
      ]);
      setData(currentRes.data);
      setForecast(forecastRes.data);
      addToHistory(searchCity);
    } catch {
      setError("Не удалось загрузить данные. Проверьте название города.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocationWeather = async () => {
    setLoading(true);
    setError("");
    setData(null);
    setForecast(null);

    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const [currentRes, forecastRes] = await Promise.all([
        weatherApi.getCurrentWeatherByCoords(latitude, longitude),
        weatherApi.getForecastByCoords(latitude, longitude)
      ]);

      setData(currentRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      setError("Не удалось получить погоду по геолокации.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Погода</h1>

        <SearchForm onSearch={handleSearch} />

        <button
          onClick={handleGetLocationWeather}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Показать погоду по геолокации
        </button>

        {/* История поиска */}
        {history.length > 0 && (
          <div className="my-6">
            <h2 className="text-lg font-semibold mb-2">История поиска:</h2>
            <div className="flex flex-wrap gap-2">
              {history.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSearch(city)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full transition"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Избранные города */}
        {favorites.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Избранные города:</h2>
            <div className="flex flex-wrap gap-2">
              {favorites.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSearch(city)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 rounded-full transition"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <Loader weather={data?.weather[0].description || ""} />}
        {error && <ErrorMessage message={error} />}

        {/* Карточка погоды и кнопка избранного */}
        {data && (
          <div className="my-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{data.name}</h2>
              {favorites.includes(data.name) ? (
                <button
                  onClick={() => removeFavorite(data.name)}
                  className="text-red-600 hover:underline"
                >
                  Удалить из избранного
                </button>
              ) : (
                <button
                  onClick={() => addFavorite(data.name)}
                  className="text-blue-600 hover:underline"
                >
                  Добавить в избранное
                </button>
              )}
            </div>
            <WeatherCard
              city={data.name}
              temperature={data.main.temp}
              description={data.weather[0].description}
            />
          </div>
        )}

        {forecast && (
          <div className="mt-6">
            <TemperatureChart forecastData={forecast.list.slice(0, 8)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
