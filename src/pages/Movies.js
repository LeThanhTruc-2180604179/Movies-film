// Movies.js
import React, { useState } from 'react';
import MovieCard from '../components/common/MovieCard';
import { useApp } from '../context/AppContext';
import { Filter } from 'lucide-react';
import Loading from '../components/common/Loading';

const Movies = () => {
  const { movies, loading, searchQuery, searchContent } = useApp();
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  if (loading) {
    return <Loading text="Loading movies..." />;
  }

  // Get all unique genres
  const allGenres = ['all', ...new Set(movies.flatMap(movie => movie.genre))];

  // Filter and sort movies
  let filteredMovies = movies;

  // Apply search filter
  if (searchQuery.trim()) {
    filteredMovies = searchContent(searchQuery).filter(item => item.category === 'Movie');
  }

  // Apply genre filter
  if (selectedGenre !== 'all') {
    filteredMovies = filteredMovies.filter(movie => movie.genre.includes(selectedGenre));
  }

  // Apply sorting
  filteredMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1>🎬 Movies</h1>
        <p>{filteredMovies.length} movies available</p>
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
          </select>
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div className="content-grid movies-grid">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} item={movie} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No movies found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default Movies;