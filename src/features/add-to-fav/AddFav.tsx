import React, { useState, useEffect } from "react";
import { useWeatherStore } from "@/shared/model/weatherStore";
import Lottie from "lottie-react";
import sunnyAnimation from "@/shared/assets/animations/sunny.json";
import rainAnimation from "@/shared/assets/animations/rain.json";
import styles from './FavButton.module.scss';

interface Props {
  city: string;
  className?: string;
}

export const FavButton: React.FC<Props> = ({ city }) => {
  const favorites = useWeatherStore((state) => state.favorites);
  const addFavorite = useWeatherStore((state) => state.addFavorite);
  const removeFavorite = useWeatherStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(city);
  const [notification, setNotification] = useState("");
  const [animating, setAnimating] = useState(false);

  const getWeatherAnimation = () => {
    if (city.includes("дождь")) return rainAnimation;
    return sunnyAnimation;
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(city);
      // setNotification("Удалено из избранного");
    } else {
      addFavorite(city);
      // setNotification("Добавлено в избранное");
    }
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="relative">
      {notification && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded-full z-10">
          {notification}
        </div>
      )}

      <button
        className={`${styles.button} ${isFavorite ? styles.active : styles.inactive} ms-2`}
        onClick={toggleFavorite}
      >
        <div className="flex items-center">
          <Lottie
            animationData={getWeatherAnimation()}
            loop
            autoplay={animating}
            className="w-6 h-6 mr-2"
          />
          <span>{isFavorite ? "Удалить из избранного" : "Добавить в избранное"}</span>
        </div>
      </button>
    </div>
  );
};
