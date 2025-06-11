import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, searchContent } = useApp();
  const [localQuery, setLocalQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (localQuery.trim()) {
      const results = searchContent(localQuery);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [localQuery, searchContent]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    setSearchQuery(value);
  };

  const clearSearch = () => {
    setLocalQuery('');
    setSearchQuery('');
    setShowResults(false);
  };

  const handleResultClick = (item) => {
    setShowResults(false);
    // You can add navigation logic here if needed
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search for movies"
          value={localQuery}
          onChange={handleSearch}
          className="search-input"
        />
        {localQuery && (
          <button onClick={clearSearch} className="clear-search">
            <X size={16} />
          </button>
        )}
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="search-result-item"
              onClick={() => handleResultClick(item)}
            >
              <img src={item.thumbnail} alt={item.title} className="result-thumbnail" />
              <div className="result-info">
                <div className="result-title">{item.title}</div>
                <div className="result-meta">
                  {item.year} • {item.category}
                </div>
              </div>
            </div>
          ))}
          {searchResults.length > 5 && (
            <div className="search-results-count">
              +{searchResults.length - 5} more results
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;