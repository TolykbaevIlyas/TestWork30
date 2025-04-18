"use client";
import React, { useState } from "react";
import { weatherApi } from "@/shared/api/weatherApi";
import { WeatherCard } from "@/entities/weather/ui/WeatherCard";
import Loader from "@/shared/ui/Loader/Loader";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import SearchForm from "@/features/search-city/SearchForm";
import { useWeatherStore } from "@/shared/model/weatherStore";
import HourlyForecastChart from "@/entities/weather/ui/HourlyForecastChart"; // ← импорт графика

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ForecastData {
  list: Array<{
    main: { temp: number };
    weather: Array<{ description: string }>;
    dt: number;
  }>;
  city: { name: string };
}

const ForecastPage = () => {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {
      const res = await weatherApi.getForecast(searchCity);
      setData(res.data);
      addToHistory(searchCity);
    } catch {
      setError("Не удалось загрузить данные. Проверьте название города.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Прогноз погоды на 5 дней</h1>

      {/* Поисковая форма */}
      <SearchForm onSearch={handleSearch} />

      {/* История поиска */}
      {history.length > 0 && (
        <div className="mb-6">
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

      {/* Заголовок и кнопка избранного */}
      {data && (
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{data.city.name}</h2>
          {favorites.includes(data.city.name) ? (
            <button
              onClick={() => removeFavorite(data.city.name)}
              className="text-red-600 hover:underline"
            >
              Удалить из избранного
            </button>
          ) : (
            <button
              onClick={() => addFavorite(data.city.name)}
              className="text-blue-600 hover:underline"
            >
              Добавить в избранное
            </button>
          )}
        </div>
      )}

      {/* Загрузка и ошибка */}
      {loading && (
        <Loader weather={data?.list[0].weather[0].description || ""} />
      )}
      {error && <ErrorMessage message={error} />}

      {/* Слайдер прогноза */}
      {data && (
        <div className="mt-4">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 }
            }}
            navigation
            pagination={{ clickable: true }}
          >
            {data.list
              .filter((_, index) => index % 8 === 0)
              .slice(0, 5)
              .map((forecast, index) => (
                <SwiperSlide key={index}>
                  <div className="p-4 bg-white shadow-md rounded-xl text-center">
                    <p className="text-lg font-semibold mb-2">
                      {new Date(forecast.dt * 1000).toLocaleDateString()}
                    </p>
                    <WeatherCard
                      city={data.city.name}
                      temperature={forecast.main.temp}
                      description={forecast.weather[0].description}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}

      {/* График почасовой температуры */}
      {data && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Почасовой прогноз</h3>
          <HourlyForecastChart forecastData={data.list.slice(0, 12)} />
        </div>
      )}
    </div>
  );
};

export default ForecastPage;
