// Home.js
import React from 'react';
import MovieCard from '../components/common/MovieCard';
import { useApp } from '../context/AppContext';
import Loading from '../components/common/Loading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const { trending, movies, tvSeries, loading, searchQuery, searchContent } = useApp();

  if (loading) {
    return <Loading text="Loading content..." />;
  }

  if (searchQuery.trim()) {
    const searchResults = searchContent(searchQuery);
    
    return (
      <div className="page">
        <div className="page-header">
          <h1>Search Results for "{searchQuery}"</h1>
          <p>{searchResults.length} results found</p>
        </div>
        
        {searchResults.length > 0 ? (
          <div className="content-grid home-search-grid">
            {searchResults.map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No results found</h3>
            <p>Try searching with different keywords</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      {/* Hero Section - Banner Slider */}
      {trending.length > 0 && (
        <section className="hero-section">
          <div className="hero-slider">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={5000}
            >
              {trending.map((item) => (
                <div key={item.id} className="banner-slide">
                  <img 
                    src={item.bannerImage || item.thumbnail} 
                    alt={item.title} 
                    className="banner-image" 
                  />
                  <div className="banner-content">
                    <h2>{item.title}</h2>
                    <p className="banner-description">
                      {item.description.length > 150
                        ? `${item.description.substring(0, 150)}...`
                        : item.description}
                    </p>
                 
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* Trending Section */}
      <section className="content-section">
        <div className="section-header">
          <h2>🔥 Trending</h2>
          <span className="section-count">{trending.length} items</span>
        </div>
        <div className="content-carousel">
          {trending.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Recent Movies */}
      <section className="content-section">
        <div className="section-header">
          <h2>🎬 Latest Movies</h2>
          <span className="section-count">{movies.length} movies</span>
        </div>
        <div className="content-grid home-movies-grid">
          {movies.slice(0, 20).map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Popular TV Series */}
      <section className="content-section">
        <div className="section-header">
          <h2>📺 Popular TV Series</h2>
          <span className="section-count">{tvSeries.length} series</span>
        </div>
        <div className="content-grid home-tv-series-grid">
          {tvSeries.slice(0, 20).map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;