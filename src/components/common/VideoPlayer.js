import React, { useEffect } from 'react';
import { X, Bookmark, BookmarkCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const VideoPlayer = () => {
  const { currentVideo, closeVideo, toggleBookmark, isBookmarked, getRecommendations, playVideo } = useApp();
  const bookmarked = isBookmarked(currentVideo?.id);
  const recommendations = getRecommendations(currentVideo, 10);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBookmark = () => {
    toggleBookmark(currentVideo);
  };

  const handleRecommendationClick = (item) => {
    closeVideo();
    setTimeout(() => {
      playVideo(item); // Đảm bảo playVideo được định nghĩa từ useApp
    }, 100);
  };

  if (!currentVideo) return null;

  return (
    <div className="video-modal-overlay">
      <div className="video-modal">
        <div className="video-header">
          <h2>{currentVideo.title}</h2>
          <div className="video-controls">
            <button onClick={handleBookmark} className={`bookmark-btn ${bookmarked ? 'bookmarked' : ''}`}>
              {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button onClick={closeVideo} className="close-btn">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="video-content">
          <div className="video-player">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-details">
            <div className="video-meta">
              <span className="year">{currentVideo.year}</span>
              <span className="rating">{currentVideo.rating}</span>
              <span className="category">{currentVideo.category}</span>
              {currentVideo.duration && <span className="duration">{currentVideo.duration}</span>}
              {currentVideo.seasons && (
                <span className="seasons">
                  {currentVideo.seasons} Season{currentVideo.seasons > 1 ? 's' : ''} • {currentVideo.episodes} Episodes
                </span>
              )}
            </div>

            <div className="video-genres">
              {currentVideo.genre.map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>

            <p className="video-description">{currentVideo.description}</p>
          </div>

         {recommendations.length > 0 && (
  <div className="recommendations">
    <h3>Có thể bạn sẽ thích</h3>
    <div className="content-carousel">
      {recommendations.map((item) => (
        <div
          key={item.id}
          className="recommendation-card"
          onClick={() => handleRecommendationClick(item)}
        >
          <img src={item.thumbnail} alt={item.title} />
          <div className="recommendation-info">
            <h4>{item.title}</h4>
            <span>{item.year} • {item.category}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;