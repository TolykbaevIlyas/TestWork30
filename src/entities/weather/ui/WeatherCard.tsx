'use client'
import { FavButton } from "@/features/add-to-fav/AddFav";
import React, { useState } from "react";
import Lottie from "lottie-react";
import sunnyAnimation from "@/shared/assets/animations/sunny.json";
import rainAnimation from "@/shared/assets/animations/rain.json";

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [notification, setNotification] = useState("");

  // Функция для выбора фона в зависимости от температуры
  const getBgColor = (temp: number) => {
    if (temp <= 0) return "bg-blue-200";
    if (temp > 0 && temp <= 15) return "bg-green-200";
    if (temp > 15 && temp <= 30) return "bg-yellow-200";
    return "bg-red-200";
  };

  const getWeatherAnimation = (description: string) => {
    const lower = description.toLowerCase();
    if (lower.includes("дождь")) return rainAnimation;
    return sunnyAnimation;
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  return (
    <div className={`rounded-xl p-4 ${getBgColor(temperature)} relative`}>
      {notification && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded-full">
          {notification}
        </div>
      )}

      <div className="absolute top-2 right-2">
        <button onClick={handleFavoriteToggle}>
          <FavButton city={city} />
        </button>
      </div>

      <Lottie
        animationData={getWeatherAnimation(description)}
        loop
        className="w-24 h-24 mx-auto mb-2 mt-10"
      />

      <h3 className="text-xl font-semibold text-center">{city}</h3>
      <p className="text-lg text-center">{Math.round(temperature)}°C</p>
      <p className="text-sm text-gray-700 text-center">{description}</p>
    </div>
  );
};
