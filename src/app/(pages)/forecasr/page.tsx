'use client'
import React, { useState } from "react";
import { weatherApi } from "@/shared/api/weatherApi";
import { WeatherCard } from "@/entities/weather/ui/WeatherCard";
import Loader from "@/shared/ui/Loader/Loader";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";

interface ForecastData {
  list: Array<{
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
    }>;
  }>;
  city: {
    name: string;
  };
}

const ForecastPage = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchCity: string) => {
    setCity(searchCity);
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await weatherApi.getForecast(searchCity);
      setData(res.data);
    } catch {
      setError("Не удалось загрузить данные. Проверьте название города.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Прогноз погоды на 5 дней</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Введите город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary mt-2" onClick={() => handleSearch(city)}>
          Найти
        </button>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {data && (
        <div className="row">
          {data.list.slice(0, 5).map((forecast, index) => (
            <div key={index} className="col-md-2 mb-4">
              <WeatherCard
                city={data.city.name}
                temperature={forecast.main.temp}
                description={forecast.weather[0].description}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForecastPage;
