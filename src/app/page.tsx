import React, { useState } from "react";
import { weatherApi } from "@/shared/api/weatherApi";
import { WeatherCard } from "@/entities/weather/ui/WeatherCard";
import SearchForm from "@/features/search-city/SearchForm";
import Loader from "@/shared/ui/Loader/Loader";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchCity: string) => {
    setCity(searchCity);
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await weatherApi.getCurrentWeather(searchCity);
      setData(res.data);
    } catch (err: any) {
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
