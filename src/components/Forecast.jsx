import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Forecast({ city, unit, apiKey }) {
  const [forecast, setForecast] = useState([]);

  // Helper: get emoji based on weather type
  const getWeatherEmoji = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "snow":
        return "❄️";
      case "thunderstorm":
        return "⛈️";
      case "drizzle":
        return "🌦️";
      case "mist":
      case "fog":
        return "🌫️";
      default:
        return "🌡️";
    }
  };

  useEffect(() => {
    if (!city) return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Filter for daily forecast at 12:00 PM
        const dailyData = response.data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForecast(dailyData);
      })
      .catch((error) => {
        console.error("Forecast API error:", error);
      });
  }, [city, apiKey]);

  if (forecast.length === 0) {
    return <p style={{ marginTop: "16px" }}>Loading forecast...</p>;
  }

  const convertTemp = (temp) => {
    if (unit === "celsius") return `${Math.round(temp)}°C`;
    return `${Math.round((temp * 9) / 5 + 32)}°F`;
  };

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>

      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div className="forecast-day" key={index}>
            <div className="forecast-date">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </div>

            {/* Emoji for weather */}
            <span className="weather-emoji">
              {getWeatherEmoji(day.weather[0].main)}
            </span>

            <div className="forecast-temp">
              <span className="max">{convertTemp(day.main.temp_max)}</span>
              <span className="min">{convertTemp(day.main.temp_min)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
