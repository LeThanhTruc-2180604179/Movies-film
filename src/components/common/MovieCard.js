import React from 'react';
import { Play, Bookmark, BookmarkCheck, Calendar } from 'lucide-react'; // Xóa Star
import { useApp } from '../../context/AppContext';

const MovieCard = ({ item, size = 'medium' }) => {
  const { toggleBookmark, isBookmarked, playVideo } = useApp();
  const bookmarked = isBookmarked(item.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    playVideo(item);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(item);
  };

  const cardClass = `movie-card ${size}`;

  return (
    <div className={cardClass}>
      <div className="card-image-container">
        <img src={item.thumbnail} alt={item.title} className="card-image" />
        
        <div className="card-overlay">
          <button onClick={handlePlay} className="play-btn">
            <Play size={24} fill="white" />
          </button>
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

      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        
        <div className="card-meta">
          <span className="year">
            <Calendar size={14} />
            {item.year}
          </span>
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

        {size === 'large' && (
          <p className="card-description">
            {item.description.length > 120 
              ? `${item.description.substring(0, 120)}...` 
              : item.description
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;