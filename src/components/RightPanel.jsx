import React from 'react';
import VoiceSearch from './VoiceSearch';

const RightPanel = ({ handleSearch, input, setInput, weather, forecast }) => (
  <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center p-6">
    <div className='mb-10'>
      <form className="flex items-center max-w-lg mx-auto" onSubmit={handleSearch}>
        <label htmlFor="voice-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <input type="text" id="voice-search" value={input} onChange={e => setInput(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for a Location" required />
          <VoiceSearch setInput={setInput} />
        </div>
        <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>Search
        </button>
      </form>
    </div>
    <div className="flex flex-col items-center mb-6">
      {weather && weather.weather && weather.weather[0] && (
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
          style={{ width: '64px', height: '64px' }}
        />
      )}
      <h3 className="text-2xl">{weather ? weather.weather[0].main : ''}</h3>
    </div>
    <div className="border-t border-gray-600 pt-4">
      {forecast.length > 0 ? (
        forecast.map((item, idx) => (
          <div key={idx} className="flex justify-between py-1 px-2">
            <span>{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>{Math.round(item.main.temp)}°C</span>
            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" className="inline w-6 h-6 ml-2" />
          </div>
        ))
      ) : (
        [
          { time: 'Now', temp: '20°C' },
          { time: '09:00', temp: '22°C' },
          { time: '12:00', temp: '24°C' },
          { time: '15:00', temp: '23°C' },
          { time: '18:00', temp: '20°C' },
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between py-1 px-2">
            <span>{item.time}</span>
            <span>{item.temp}</span>
          </div>
        ))
      )}
    </div>
  </div>
);

export default RightPanel;
