import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5";

const instance = axios.create({ baseURL: baseUrl });

export const weatherApi = {
  getCurrentWeather: (city: string) =>
    instance.get(`/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric"
      }
    }),

  getForecast: (city: string) =>
    instance.get(`/forecast`, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric"
      }
    })
};
