import { useEffect, useState, useCallback, useMemo } from "react";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({ q: "ahmedabad" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  // Optimized API call
  const getWeather = useCallback(async () => {
    try {
      const cityName = query.q ? capitalizeFirstLetter(query.q) : "current location";
      toast.info(`Fetching weather data for ${cityName}`);

      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
      console.log(data);
    } catch (error) {
      toast.error("Error fetching weather data");
      console.error("Error fetching weather data:", error);
    }
  }, [query, units]);

  // Fetch weather when query or units change
  useEffect(() => {
    getWeather();
  }, [getWeather]);

  // Memoized background formatting function
  const formatBackground = useMemo(() => {
    if (!weather) return "from-cyan-600 to-blue-700"; // Default gradient

    const threshold = units === "metric" ? 20 : 60;
    return weather.temp <= threshold ? "from-cyan-600 to-blue-700" : "from-yellow-600 to-orange-700";
  }, [weather, units]);

  return (
    <div
      className={`w-full min-h-screen mx-auto py-5 px-5 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground}`}
    >
      {/* Memoized callbacks to avoid unnecessary re-renders */}
      <TopButtons setQuery={useCallback((query) => setQuery(query), [])} />
      <Inputs setQuery={useCallback((query) => setQuery(query), [])} setUnits={useCallback((units) => setUnits(units), [])} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title="3 hour step forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;