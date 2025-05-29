import React, { createContext, useContext, useState, useEffect } from 'react';
import data from '../data/data.json';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [trending, setTrending] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from JSON file
    setMovies(data.movies || []);
    setTvSeries(data.tvSeries || []);
    setTrending(data.trending || []);
    
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('entertainmentBookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    }
    
    setLoading(false);
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem('entertainmentBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const getAllContent = () => {
    return [...movies, ...tvSeries, ...trending];
  };

  const getFilteredContent = (category = 'all') => {
    const allContent = getAllContent();
    
    if (category === 'all') return allContent;
    if (category === 'movies') return movies;
    if (category === 'tv-series') return tvSeries;
    if (category === 'trending') return trending;
    
    return allContent.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  };

  const searchContent = (query) => {
    if (!query.trim()) return [];
    
    const allContent = getAllContent();
    const searchTerm = query.toLowerCase();
    
    return allContent.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.genre.some(g => g.toLowerCase().includes(searchTerm))
    );
  };

  const toggleBookmark = (item) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.id === item.id);
    
    if (isBookmarked) {
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== item.id));
    } else {
      setBookmarks(prev => [...prev, item]);
    }
  };

  const isBookmarked = (itemId) => {
    return bookmarks.some(bookmark => bookmark.id === itemId);
  };

  const getBookmarkedContent = () => {
    return bookmarks;
  };

  const getContentById = (id) => {
    const allContent = getAllContent();
    return allContent.find(item => item.id === parseInt(id));
  };

  const getRecommendations = (currentItem, limit = 6) => {
    if (!currentItem) return [];
    
    const allContent = getAllContent();
    
    // Find similar content based on genre
    const recommendations = allContent
      .filter(item => 
        item.id !== currentItem.id && 
        item.genre.some(genre => currentItem.genre.includes(genre))
      )
      .slice(0, limit);
    
    // If not enough recommendations, fill with random content
    if (recommendations.length < limit) {
      const remaining = allContent
        .filter(item => 
          item.id !== currentItem.id && 
          !recommendations.some(rec => rec.id === item.id)
        )
        .slice(0, limit - recommendations.length);
      
      recommendations.push(...remaining);
    }
    
    return recommendations;
  };

  const playVideo = (item) => {
    setCurrentVideo(item);
  };

  const closeVideo = () => {
    setCurrentVideo(null);
  };

  const getPopularContent = (limit = 10) => {
    const allContent = getAllContent();
    // Sort by year (newest first) as a simple popularity metric
    return allContent
      .sort((a, b) => b.year - a.year)
      .slice(0, limit);
  };

  const getContentByGenre = (genre, limit = 10) => {
    const allContent = getAllContent();
    return allContent
      .filter(item => item.genre.includes(genre))
      .slice(0, limit);
  };

  const value = {
    // Data
    movies,
    tvSeries,
    trending,
    bookmarks,
    loading,
    
    // Current states
    searchQuery,
    setSearchQuery,
    currentVideo,
    
    // Methods
    getAllContent,
    getFilteredContent,
    searchContent,
    toggleBookmark,
    isBookmarked,
    getBookmarkedContent,
    getContentById,
    getRecommendations,
    playVideo,
    closeVideo,
    getPopularContent,
    getContentByGenre
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};