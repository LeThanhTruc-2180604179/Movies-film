import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
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
  const { user } = useAuth(); // Lấy thông tin user từ AuthContext
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [trending, setTrending] = useState([]);
  const [bookmarks, setBookmarks] = useState([]); // Không sử dụng useLocalStorage trực tiếp
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tạo key động cho Local Storage dựa trên userId
  const getBookmarkKey = React.useCallback(() => user ? `bookmarks_${user.id}` : 'bookmarks_guest', [user]);

  // Load bookmarks khi user thay đổi (đăng nhập, đăng xuất)
  useEffect(() => {
    setLoading(true);
    const bookmarkKey = getBookmarkKey();
    try {
      const savedBookmarks = localStorage.getItem(bookmarkKey);
      setBookmarks(savedBookmarks ? JSON.parse(savedBookmarks) : []);
    } catch (error) {
      console.error(`Error reading bookmarks for ${bookmarkKey}:`, error);
      setBookmarks([]);
    }
    setLoading(false);
  }, [user, getBookmarkKey]);

  // Lưu bookmarks vào Local Storage khi bookmarks thay đổi
  useEffect(() => {
    const bookmarkKey = getBookmarkKey();
    try {
      localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks));
    } catch (error) {
      console.error(`Error saving bookmarks for ${bookmarkKey}:`, error);
    }
  }, [bookmarks, user, getBookmarkKey]);

  // Load dữ liệu từ data.json
  useEffect(() => {
    setMovies(data.movies || []);
    setTvSeries(data.tvSeries || []);
    setTrending(data.trending || []);
    setLoading(false);
  }, []);

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
    setBookmarks(prevBookmarks => {
      const isBookmarked = prevBookmarks.some(bookmark => bookmark.id === item.id);
      if (isBookmarked) {
        return prevBookmarks.filter(bookmark => bookmark.id !== item.id);
      }
      return [...prevBookmarks, { ...item }];
    });
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
    
    const recommendations = allContent
      .filter(item => 
        item.id !== currentItem.id && 
        item.genre.some(genre => currentItem.genre.includes(genre))
      )
      .slice(0, limit);
    
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
    movies,
    tvSeries,
    trending,
    bookmarks,
    loading,
    searchQuery,
    setSearchQuery,
    currentVideo,
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