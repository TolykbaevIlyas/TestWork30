import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface TemperatureChartProps {
  forecastData: Array<{
    dt: number;
    main: { temp: number };
  }>;
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ forecastData }) => {
  const data = forecastData.map(item => ({
    time: new Date(item.dt * 1000).getHours() + ":00",
    temp: item.main.temp
  }));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Почасовая температура</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
