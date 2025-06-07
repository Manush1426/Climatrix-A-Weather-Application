import { useEffect } from 'react';

const useGeolocationWeather = (setWeather, setLocation, setForecast, API_KEY) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(data => {
              setWeather(data);
              setLocation(data.name);
            });
          fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(data => {
              setForecast(data.list.slice(0, 5));
            });
        },
        (error) => {
          // fallback to default
        }
      );
    }
  }, [setWeather, setLocation, setForecast, API_KEY]);
};

export default useGeolocationWeather;
