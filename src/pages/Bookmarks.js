import React, { useState } from 'react';
import MovieCard from '../components/common/MovieCard';
import { useApp } from '../context/AppContext';
import { Filter } from 'lucide-react';
import Loading from '../components/common/Loading';

const Bookmarks = () => {
  const { bookmarks, loading, searchQuery, searchContent } = useApp();
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  if (loading) {
    return <Loading text="Loading bookmarks..." />;
  }

  // Get all unique genres from bookmarked content
  const allGenres = ['all', ...new Set(bookmarks.flatMap(item => item.genre))];

  // Filter and sort bookmarks
  let filteredBookmarks = bookmarks;

  // Apply search filter
  if (searchQuery.trim()) {
    filteredBookmarks = searchContent(searchQuery).filter(item =>
      bookmarks.some(bookmark => bookmark.id === item.id)
    );
  }

  // Apply genre filter
  if (selectedGenre !== 'all') {
    filteredBookmarks = filteredBookmarks.filter(item => item.genre.includes(selectedGenre));
  }

  // Apply sorting
  filteredBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1>📑 Bookmarks</h1>
        <p>{filteredBookmarks.length} bookmarked items</p>
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
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length > 0 ? (
        <div className="content-grid">
          {filteredBookmarks.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No bookmarks found</h3>
          <p>Add some movies or TV series to your bookmarks</p>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;