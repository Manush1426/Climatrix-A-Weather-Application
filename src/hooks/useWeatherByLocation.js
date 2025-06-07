import { useEffect } from 'react';

const useWeatherByLocation = (location, setWeather, setForecast, API_KEY) => {
  useEffect(() => {
    if (!location) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
      });
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        setForecast(data.list.slice(0, 5));
      });
  }, [location, setWeather, setForecast, API_KEY]);
};

export default useWeatherByLocation;
