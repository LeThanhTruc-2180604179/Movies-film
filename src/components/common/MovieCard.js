import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MovieCard = ({ item, size = 'medium' }) => {
  const { toggleBookmark, isBookmarked, playVideo } = useApp();
  const bookmarked = isBookmarked(item.id);


  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(item);
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    playVideo(item);
  };

  const cardClass = `movie-card ${size}`;

  return (
    <div className={cardClass} onClick={handleCardClick}>
      <div className="card-image-container">
        <img src={item.thumbnail} alt={item.title} className="card-image" />
        
        <div className="card-overlay">
          <div className="card-content">
            <h3 className="card-title">{item.title}</h3>
            
            <div className="card-meta">
              <span className="year">{item.year}</span>
              <span className="category">{item.category}</span>
              {item.duration && (
                <span className="duration">{item.duration}</span>
              )}
              {item.seasons && (
                <span className="seasons">{item.seasons} Season{item.seasons > 1 ? 's' : ''}</span>
              )}
            </div>

            <div className="card-genres">
              {item.genre.slice(0, 2).map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleBookmark}
          className={`bookmark-btn ${bookmarked ? 'bookmarked' : ''}`}
        >
          {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>

        <div className="card-badge">
          <span className="rating">{item.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;