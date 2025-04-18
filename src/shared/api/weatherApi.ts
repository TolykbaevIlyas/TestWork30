import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "ru",
  },
});

export const weatherApi = {
  // Текущая погода по названию города
  getCurrentWeather(city: string) {
    return instance.get("/weather", {
      params: {
        q: city,
      },
    });
  },

  // Текущая погода по координатам
  getCurrentWeatherByCoords(lat: number, lon: number) {
    return instance.get("/weather", {
      params: {
        lat,
        lon,
      },
    });
  },

  // Прогноз по названию города
  getForecast(city: string) {
    return instance.get("/forecast", {
      params: {
        q: city,
      },
    });
  },

  // Прогноз по координатам
  getForecastByCoords(lat: number, lon: number) {
    return instance.get("/forecast", {
      params: {
        lat,
        lon,
      },
    });
  },
};
