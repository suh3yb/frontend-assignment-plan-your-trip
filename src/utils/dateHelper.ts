export const getShortenedDayName = (date: Date): string => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return days[date.getDay()].substring(0, 3);
};
