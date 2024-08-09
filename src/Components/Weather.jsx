import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import "./Weather.css";
import search1 from "../Assets/search1.svg";
import cloud_lightning from "../Assets/cloud_lightning.svg";
import cloud_rain from "../Assets/cloud_rain.svg";
import cloud from "../Assets/cloud.svg";
import Drizzle from "../Assets/Drizzle.svg";
import lightning from "../Assets/lightning.svg";
import Sunny from "../Assets/Sunny.svg";
import moisture from "../Assets/moisture.svg";
import wind from "../Assets/wind.svg";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": Sunny,
    "01n": Sunny,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud_rain,
    "03n": cloud_rain,
    "04d": cloud_lightning,
    "04n": cloud_lightning,
    "09d": Drizzle,
    "09n": Drizzle,
    "10d": Drizzle,
    "10n": Drizzle,
    "11d": lightning,
    "11n": lightning,
    "13d": cloud_rain,
    "13n": cloud_rain,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || Sunny;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {}
  };
  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search1}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className=" temperature">{weatherData.temperature}</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={moisture} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="" />
          <div>
            <p>{weatherData.windSpeed}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
