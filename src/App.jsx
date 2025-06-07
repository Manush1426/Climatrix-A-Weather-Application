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
  const API_KEY = '343a143fd37d6176444a02142e8232ed';

  useClock(setDate);
  useGeolocationWeather(setWeather, setLocation, setForecast, API_KEY);
  useWeatherByLocation(location, setWeather, setForecast, API_KEY);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setLocation(input.trim());
      setInput('');
    }
  };

  const showTime = getShowTime(date);
  const { showDay, showDate } = getDayMonthDate(date);

  return (
    <div className="w-full h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url("/dummy bg img.jpg")' }}>
      <div className="flex flex-col items-center">
        <LogoTitle />
        <Slogan />
        <div className="flex w-[768px] h-[488px] bg-black bg-opacity-60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md ring-2 ring-blue-400/20 transition-transform duration-300 hover:scale-[1.025]">
          <LeftPanel weather={weather} location={location} showTime={showTime} showDay={showDay} showDate={showDate} />
          <RightPanel handleSearch={handleSearch} input={input} setInput={setInput} weather={weather} forecast={forecast} />
        </div>
        <p className="text-white text-sm mt-4">© Created by Manush Patel | First React Project</p>
      </div>
    </div>
  )
}

export default App
