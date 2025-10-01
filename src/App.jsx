import React, { useState, useEffect } from "react";

// Note: In a real environment, the API key should be loaded securely, not hardcoded.
// For this single-file demonstration, we'll keep it here.
const API_KEY = "5725c128cfedc370bb0acf87e780ff7a";

/**
 * Helper function to get the initial city from localStorage.
 */
const getInitialCity = () => {
  // Use crypto.randomUUID() for a fallback key if localStorage isn't available
  // or if we were using a database, but here we stick to the original plan.
  const savedCity = localStorage.getItem("lastCity");
  return savedCity ? savedCity : "Pune";
};

/**
 * Main application component for the Weather App.
 */
export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState(getInitialCity());
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches current weather and 5-day forecast for a given city.
   * @param {string} cityName - The name of the city to search for.
   */
  const fetchWeatherData = async (cityName) => {
    // Check if the city name is empty or just whitespace
    if (!cityName.trim()) return;

    // Use a temporary variable to hold the trimmed city name for API calls and state updates
    const normalizedCityName = cityName.trim();

    // Update state and localStorage
    setCity(normalizedCityName);
    localStorage.setItem("lastCity", normalizedCityName);

    try {
      setLoading(true);
      setError(null);

      // --- 1. Fetch current weather data ---
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${normalizedCityName}&appid=${API_KEY}&units=metric`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message);
      }
      setWeatherData(weatherData);

      // --- 2. Fetch 5-day forecast data ---
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${normalizedCityName}&appid=${API_KEY}&units=metric`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if (forecastData.cod !== "200") {
        throw new Error(forecastData.message);
      }

      // Filter the list to get one entry per day (using index % 8, as data is every 3 hours)
      const dailyForecast = forecastData.list.filter(
        (item, index) => index % 8 === 0
      ).slice(0, 5); // Ensure exactly 5 days
      setForecast(dailyForecast);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Sorry, we couldn’t find weather data for that city. Please try again.");
      setWeatherData(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch weather data on initial load and when the `city` state changes
  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  /**
   * Handles form submission for city search.
   */
  function handleSearch(e) {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      fetchWeatherData(searchInput.trim());
      setSearchInput(""); // Clear input after search
    }
  }

  // Helper to format the day of the week
  const formatDay = (dt) => {
    return new Date(dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  // --- Loading State UI ---
  if (loading && !weatherData) { // Show full-screen loader only on initial load or new search
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-4">
        <div className="text-2xl font-semibold animate-pulse">Loading weather data...</div>
      </div>
    );
  }

  // --- Main App UI ---
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-start sm:items-center justify-center p-4 font-['Inter']">
      
      {/* Weather Card Wrapper */}
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 text-white mt-8 sm:mt-0">
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city name (e.g., Pune)"
            className="flex-1 p-3 text-base rounded-lg border border-white/50 bg-white/10 placeholder-white/70 focus:outline-none focus:border-indigo-300 transition-all text-white"
          />
          <button 
            type="submit" 
            className="px-4 py-3 bg-indigo-700 hover:bg-indigo-600 rounded-lg font-semibold shadow-lg transition-colors"
            disabled={loading}
          >
            {loading ? '...' : 'Search'}
          </button>
        </form>
        
        {/* Error Message */}
        {error && (
          <div className="p-3 mb-6 bg-red-500/80 rounded-lg font-medium text-center shadow-md">
            {error}
          </div>
        )}

        {/* Current Weather Data */}
        {weatherData && (
          <>
            {/* Header / Current Conditions */}
            <div className="text-center mb-6 border-b border-white/30 pb-6">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-1">
                {weatherData.name}, {weatherData.sys.country}
              </h1>
              <p className="text-6xl md:text-8xl font-light mb-2">
                {Math.round(weatherData.main.temp)}°C
              </p>
              <div className="text-xl md:text-2xl font-medium flex items-center justify-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                  className="w-12 h-12 inline-block -my-2"
                />
                <span className="capitalize">{weatherData.weather[0].description}</span>
              </div>
            </div>

            {/* Weather Details (Humidity and Wind) */}
            <div className="flex justify-around items-center mb-8 bg-white/10 rounded-xl p-4 shadow-inner">
              <div className="text-center">
                <p className="text-lg opacity-80">Humidity</p>
                <p className="text-3xl font-bold mt-1">
                  {Math.round(weatherData.main.humidity)}%
                </p>
              </div>
              <div className="w-px h-12 bg-white/30"></div> {/* Divider */}
              <div className="text-center">
                <p className="text-lg opacity-80">Wind Speed</p>
                <p className="text-3xl font-bold mt-1">
                  {Math.round(weatherData.wind.speed)} km/h
                </p>
              </div>
            </div>
          </>
        )}

        {/* 5-Day Forecast */}
        {forecast.length > 0 && (
          <div className="pt-6 border-t border-white/30">
            <h2 className="text-xl font-bold mb-4 text-center">5-Day Forecast</h2>
            <div className="flex flex-wrap justify-center sm:justify-between gap-3">
              {forecast.map((day, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center p-3 w-24 sm:w-1/6 bg-white/10 rounded-xl shadow-md flex-shrink-0"
                >
                  <p className="text-sm font-semibold opacity-80 mb-1">
                    {formatDay(day.dt)}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                    className="w-10 h-10"
                  />
                  <p className="text-lg font-bold mt-1">
                    {Math.round(day.main.temp)}°C
                  </p>
                  <p className="text-xs capitalize opacity-70 mt-1">{day.weather[0].main}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
