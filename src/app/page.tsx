'use client'
import React, { useState } from "react";
import { weatherApi } from "@/shared/api/weatherApi";
import { WeatherCard } from "@/entities/weather/ui/WeatherCard";
import SearchForm from "@/features/search-city/SearchForm";
import Loader from "@/shared/ui/Loader/Loader";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
  }>;
}

const HomePage = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (searchCity: string) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await weatherApi.getCurrentWeather(searchCity);
      setData(res.data);
    } catch {
      setError("Не удалось загрузить данные. Проверьте название города.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Погода</h1>
      <SearchForm onSearch={handleSearch} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {data && (
        <WeatherCard
          city={data.name}
          temperature={data.main.temp}
          description={data.weather[0].description}
        />
      )}
    </div>
  );
};

export default HomePage;
