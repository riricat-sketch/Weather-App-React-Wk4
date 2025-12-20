import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "fe1483f743b581b5520a1b725af03a49";

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!city) return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setError("");
      })
      .catch(() => {
        setWeatherData(null);
        setError("City not found. Please try again.");
      });
  };

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

  return (
    <div className="App">
      <h1>Weather Search Engine</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-result">
          <h2>
            {city} {getWeatherEmoji(weatherData.weather[0].main)}
          </h2>
          <p>
            <strong>Temperature:</strong> {weatherData.main.temp}°C
          </p>
          <p>
            <strong>Description:</strong> {weatherData.weather[0].description}
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </p>
          <p>
            <strong>Wind speed:</strong> {weatherData.wind.speed} m/s
          </p>
        </div>
      )}
      <footer style={{ marginTop: "40px", fontSize: "14px" }}>
        <p>
          View this project on{' '}
          <a
            href="https://github.com/riricat-sketch/Weather-App-React-Wk4"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0366d6", textDecoration: "none" }}
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
