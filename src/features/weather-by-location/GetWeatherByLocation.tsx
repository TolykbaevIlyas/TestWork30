"use client";
import React, { useState } from "react";
import { getCurrentPosition } from "@/shared/api/geolocation";
import { weatherApi } from "@/shared/api/weatherApi";
import Loader from "@/shared/ui/Loader/Loader";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import { WeatherCard } from "@/entities/weather/ui/WeatherCard";

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
}

const GetWeatherByLocation = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetLocationWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const res = await weatherApi.getCurrentWeatherByCoords(latitude, longitude);
      setData(res.data);
    } catch (err) {
      setError(`Не удалось получить погоду по геолокации. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleGetLocationWeather}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Показать погоду по геолокации
      </button>

      {loading && <Loader weather="" />}
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

export default GetWeatherByLocation;
