// Placeholder for API calls
export const fetchMovies = async () => {
  // In a real app, this would make an API call
  // For now, we're using data.json
  return import('../data/data.json').then(data => data.default.movies);
};

export const fetchTVSeries = async () => {
  return import('../data/data.json').then(data => data.default.tvSeries);
};

export const fetchTrending = async () => {
  return import('../data/data.json').then(data => data.default.trending);
};