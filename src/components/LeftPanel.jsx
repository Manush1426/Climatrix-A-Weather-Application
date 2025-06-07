import React from 'react';

const LeftPanel = ({ weather, location, showTime, showDay, showDate }) => (
  <div className="w-1/2 relative text-white p-6 bg-cover bg-center" style={{ backgroundImage: weather && weather.weather && weather.weather[0] && weather.weather[0].main ? `url('/${weather.weather[0].main}.jpg')` : `url('/def.jpg')` }}>
    <div className="relative z-10 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-2xl font-bold drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.8), 0 0 2px #000' }}>{weather ? weather.name : location}</h2>
        <p className="text-md font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 2px #000' }}>{weather ? weather.sys.country : ''}</p>
      </div>
      <div className='font-semibold mt-2'>
        <p className="text-xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]" style={{ textShadow: '0 4px 16px rgba(0,0,0,0.8), 0 0 2px #000' }}>{showTime}</p>
        <p className="text-sm mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 2px #000' }}>{showDay}, {showDate}</p>
        <p className="text-5xl drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)]" style={{ textShadow: '0 6px 24px rgba(0,0,0,0.9), 0 0 2px #000' }}>{weather ? `${Math.round(weather.main.temp)}°C` : '--°C'}</p>
        <p className="text-lg mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0 2px #000' }}>{weather ? weather.weather[0].description : ''}</p>
      </div>
    </div>
  </div>
);

export default LeftPanel;
