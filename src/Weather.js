import React, { useState } from 'react';
import axios from 'axios';

export default function Weather() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf3b236e09eacada96e15ae21243df0b`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  return (
    <div className='weather-container'>
      <input
        type='text'
        placeholder='Enter City Name'
        value={city || ''}
        onChange={handleCityChange}
      />
      <button onClick={handleClick}>Get Weather</button>
      {weather && (
        <div className='weather-info'>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
