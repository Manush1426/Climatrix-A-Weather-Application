export const getDayMonthDate = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return {
    showDay: days[date.getDay()],
    showDate: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  };
};

export const getShowTime = (date) =>
  date.getHours().toString().padStart(2, '0') + ':' +
  date.getMinutes().toString().padStart(2, '0') + ':' +
  date.getSeconds().toString().padStart(2, '0');
