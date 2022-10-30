import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const KEY = "f3b8055dd6814e40874162259222810";
  const [city, setCity] = useState("");
  const [type, setType] = useState("current");
  const [weatherData, setWeatherData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let URL = `http://api.weatherapi.com/v1/${type}.json?key=${KEY}&q=${
    city?.charAt(0).toUpperCase() + city?.slice(1)
  }&aqi=no`;
  console.log(weatherData);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await axios.get(URL);
    const {
      data: { data },
    } = await handleWeatherUpdate(type, res.data);
    setWeatherData(data);
    setIsLoading(false);
  };

  const handleWeatherUpdate = async (type: string, data: any) => {
    const BASE_URL = `http://localhost:8000/${type}`;
    let weatherData: any = {
      url: BASE_URL,
      key: KEY,
    };
    if (type === "current") {
      weatherData.town = data?.location?.name;
      weatherData.state = data?.location?.region;

      weatherData.nation = data?.location?.country;
      weatherData.latitude = data?.location?.lat;
      weatherData.longitude = data?.location?.lon;
      weatherData.timezone = data?.location?.tz_id;
      weatherData.time = data?.location?.localtime;
    } else {
      weatherData.dawn = data?.forecast?.forecastday[0]?.astro?.sunrise;
      weatherData.dusk = data?.forecast?.forecastday[0]?.astro?.sunset;
      weatherData["moon lit"] = data?.forecast?.forecastday[0]?.astro?.moonrise;
      weatherData["moon sleep"] =
        data?.forecast?.forecastday[0]?.astro?.moonset;
      weatherData.orientation =
        data?.forecast?.forecastday[0]?.astro?.moon_phase;
      weatherData.illumination =
        data?.forecast?.forecastday[0]?.astro?.moon_illumination;
    }

    return await axios.post(BASE_URL, weatherData);
  };

  return (
    <div className="h-screen bg-white flex flex-col items-center pt-32 w-screen">
      <div className="w-1/3 px-4 mb-8 h-1/3 flex items-center justify-center bg-indigo-900 bg-opacity-20 backdrop-blur-sm rounded-lg">
        <form className="w-full">
          <div className="w-full flex mb-4 flex-col">
            <label htmlFor="city" className="mb-2 text-xl">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="py-4 px-2 focus:outline-none focus:border-2 rounded-lg focus:border-indigo-900"
              placeholder="City"
              name="city"
              id="city"
            />
          </div>
          <div className="flex w-full gap-4 items-center justify-between">
            <div className="flex flex-col w-1/2">
              <label htmlFor="type" className="text-xl mb-2">
                Weather Type
              </label>
              <select
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="py-4 text-xl bg-transparent border-2 rounded-lg border-indigo-900 focus:outline-none"
                id="type"
              >
                <option value="current">Current</option>
                <option value="forecast">Forecast</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="w-1/2 py-4 text-white text-xl font-bold bg-indigo-600 rounded-lg self-end"
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>
      </div>
      {weatherData && <WeatherTable data={weatherData} />}
    </div>
  );
};

export default App;

const WeatherTable = ({ data }: any) => {
  const excluded = ["_id", "__v"];
  const weatherData = data?.forecast || data?.current;
  excluded.forEach((val) => {
    return delete weatherData[val];
  });
  return (
    <div className="w-2/3 overflow-auto rounded-lg">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {Object.keys(weatherData).map((key) => (
              <th className="py-4 px-4 bg-slate-300">
                {key.charAt(0).toUpperCase() + key?.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(weatherData).map((val: any) => (
              <td className="py-4 px-4 text-center">
                <p className="truncate w-36">{val}</p>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
