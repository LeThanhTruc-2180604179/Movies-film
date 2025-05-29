import React, { useState } from 'react';
import MovieCard from '../components/common/MovieCard';
import { useApp } from '../context/AppContext';
import { Filter } from 'lucide-react';
import Loading from '../components/common/Loading';

const TVSeries = () => {
  const { tvSeries, loading, searchQuery, searchContent } = useApp();
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  if (loading) {
    return <Loading text="Loading TV series..." />;
  }

  // Get all unique genres
  const allGenres = ['all', ...new Set(tvSeries.flatMap(series => series.genre))];

  // Filter and sort TV series
  let filteredSeries = tvSeries;

  // Apply search filter
  if (searchQuery.trim()) {
    filteredSeries = searchContent(searchQuery).filter(item => item.category === 'TV Series');
  }

  // Apply genre filter
  if (selectedGenre !== 'all') {
    filteredSeries = filteredSeries.filter(series => series.genre.includes(selectedGenre));
  }

  // Apply sorting
  filteredSeries = [...filteredSeries].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'seasons':
        return (b.seasons || 0) - (a.seasons || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1>📺 TV Series</h1>
        <p>{filteredSeries.length} TV series available</p>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="genre-filter">
            <Filter size={16} />
            Genre:
          </label>
          <select
            id="genre-filter"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="filter-select"
          >
            {allGenres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Sort by:</label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
            <option value="seasons">Most Seasons</option>
          </select>
        </div>
      </div>

      {/* TV Series Grid */}
      {filteredSeries.length > 0 ? (
        <div className="content-grid">
          {filteredSeries.map((series) => (
            <MovieCard key={series.id} item={series} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No TV series found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default TVSeries;