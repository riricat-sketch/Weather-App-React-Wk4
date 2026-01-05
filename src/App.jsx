import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import WeatherResult from "./components/WeatherResult";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("celsius");

  const apiKey = "fe1483f743b581b5520a1b725af03a49";

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

  return (
    <div className="App">
      <h1>Weather Search Engine</h1>

      <SearchForm city={city} setCity={setCity} onSearch={handleSearch} />

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <WeatherResult
          city={city}
          weatherData={weatherData}
          unit={unit}
          setUnit={setUnit}
        />
      )}

      <Footer />
    </div>
  );
}
