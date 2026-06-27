/**
 * Helper: Temperature converter
 * Converts temp from Celsius to Celsius or Fahrenheit based on the selected unit.
 */
export const formatTemp = (tempCelsius, tempUnit) => {
  if (tempUnit === 'F') {
    return `${Math.round((tempCelsius * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(tempCelsius)}°C`;
};

/**
 * Helper: Formatted Time based on Local City Timezone Offset
 */
export const formatLocalTime = (utcTimestamp, timezoneOffsetSeconds) => {
  const localDate = new Date((utcTimestamp + timezoneOffsetSeconds) * 1000);
  const hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

/**
 * Helper: Day name of forecast
 */
export const getDayName = dtTxt => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const d = new Date(dtTxt.replace(/-/g, '/')); // Compatibility with older JS engines
  return days[d.getDay()];
};
