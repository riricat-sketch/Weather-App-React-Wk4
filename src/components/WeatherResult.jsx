export default function WeatherResult({ city, weatherData, unit, setUnit }) {
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

  const convertTemperature = (tempCelsius) => {
    if (unit === "celsius") {
      return `${Math.round(tempCelsius)}°C`;
    }
    return `${Math.round((tempCelsius * 9) / 5 + 32)}°F`;
  };

  return (
    <div className="weather-result">
      <h2>
        {city} {getWeatherEmoji(weatherData.weather[0].main)}
      </h2>

      <div className="unit-toggle">
        <button
          type="button"
          className={unit === "celsius" ? "active" : ""}
          onClick={() => setUnit("celsius")}
        >
          °C
        </button>
        <button
          type="button"
          className={unit === "fahrenheit" ? "active" : ""}
          onClick={() => setUnit("fahrenheit")}
        >
          °F
        </button>
      </div>

      <p>
        <strong>Temperature:</strong>{" "}
        {convertTemperature(weatherData.main.temp)}
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
  );
}
