// Format duration from minutes to hours and minutes
export const formatDuration = (duration) => {
  if (!duration) return '';
  const [hours, minutes] = duration.split('h ');
  return `${hours}h ${minutes || ''}`.trim();
};

// Truncate text to a specified length
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Capitalize first letter of a string
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};