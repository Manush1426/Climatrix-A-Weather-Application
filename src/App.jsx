import './App.css'
import React, { useState } from 'react';
import LogoTitle from './components/LogoTitle';
import Slogan from './components/Slogan';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import useClock from './hooks/useClock';
import useGeolocationWeather from './hooks/useGeolocationWeather';
import useWeatherByLocation from './hooks/useWeatherByLocation';
import { getDayMonthDate, getShowTime } from './utils/dateUtils';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('New York');
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(''); // New error state
  const API_KEY = '343a143fd37d6176444a02142e8232ed';

  useClock(setDate);
  useGeolocationWeather(setWeather, setLocation, setForecast, API_KEY);

  // Custom fetch for weather with error handling
  React.useEffect(() => {
    if (!location) return;
    setError(''); // Clear error on new search
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        if (data.cod === '404' || data.cod === 404) {
          setError('City not found. Please enter a valid city name.');
          setWeather(null);
          setForecast([]);
        } else {
          setWeather(data);
          setError('');
          // Fetch forecast only if city is valid
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(forecastData => {
              setForecast(forecastData.list ? forecastData.list.slice(0, 5) : []);
            });
        }
      })
      .catch(() => {
        setError('Failed to fetch weather data.');
        setWeather(null);
        setForecast([]);
      });
  }, [location, API_KEY]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setLocation(input.trim());
      setInput('');
    }
  };

  // Clear error on input change
  React.useEffect(() => {
    if (input) setError('');
  }, [input]);

  const showTime = getShowTime(date);
  const { showDay, showDate } = getDayMonthDate(date);

  return (
    <div className={"w-full h-screen bg-cover bg-center flex items-center justify-center relative"} style={{ backgroundImage: 'url("")' }}>
      {/* Double gradient overlay: bottom and top for extra darkness */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-500`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${(() => {
          const main = weather && weather.weather && weather.weather[0] && weather.weather[0].main;
          switch ((main || '').toLowerCase()) {
            case 'clear':
              return 'from-blue-900 via-blue-950 to-transparent';
            case 'clouds':
              return 'from-gray-800 via-gray-900 to-transparent';
            case 'rain':
              return 'from-lime-900 to-emerald-50';
            case 'drizzle':
              return 'from-cyan-900 via-blue-900 to-transparent';
            case 'thunderstorm':
              return 'from-purple-900 via-indigo-950 to-transparent';
            case 'snow':
              return 'from-blue-900 via-gray-300 to-transparent';
            case 'mist':
            case 'fog':
            case 'haze':
              return 'from-gray-700 via-gray-800 to-transparent';
            case 'dust':
            case 'sand':
              return 'from-yellow-900 via-orange-900 to-transparent';
            case 'tornado':
              return 'from-gray-900 via-gray-950 to-transparent';
            default:
              return 'from-blue-900 via-blue-800 to-transparent';
          }
        })()} opacity-80`}></div>

      </div>
      <div className="flex flex-col items-center relative z-10">
        <div className='mb-3'>
          <LogoTitle />
          <Slogan />
        </div>
        {error && (
          <div className="mb-4 px-5 py-2 bg-red-600 text-white font-semibold rounded shadow text-center animate-pulse max-w-md">
            {error}
          </div>
        )}
        <div className="flex w-[768px] h-[488px] bg-black bg-opacity-60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md ring-2 ring-blue-400/20 transition-transform duration-300 hover:scale-[1.025]">
          <LeftPanel weather={weather} location={location} showTime={showTime} showDay={showDay} showDate={showDate} />
          <RightPanel handleSearch={handleSearch} input={input} setInput={setInput} weather={weather} forecast={forecast} />
        </div>
        <p className="text-black text-sm mt-4">© Created by Manush Patel | First React Project</p>
      </div>
    </div>
  )
}

export default App
