import { useState, useCallback } from 'react';

const useSearch = (content) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchContent = useCallback((query) => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return content.filter(item =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.genre.some(g => g.toLowerCase().includes(searchTerm))
    );
  }, [content]);

  return { searchQuery, setSearchQuery, searchContent };
};

export default useSearch;