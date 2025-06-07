import React from 'react';

const LogoTitle = () => (
  <div className='flex items-center mb-1'>
    <img src='/logo.jpg' className='h-12 w-12 mr-3 object-contain shadow-xl rounded-full transition-transform duration-300 hover:scale-110' alt='Logo' />
    <h1 className="text-white text-5xl font-bold tracking-wider" style={{ fontFamily: 'Fira Sans, Questrial, sans-serif' }}>CLIMATRIX</h1>
  </div>
);

export default LogoTitle;
