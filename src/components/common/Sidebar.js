import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Tv, Bookmark, User } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/movies', icon: Film, label: 'Movies' },
    { path: '/tv-series', icon: Tv, label: 'TV Series' },
    { path: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { path: '/dashboard', icon: User, label: 'Your Profile' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/960px-Netflix_2015_logo.svg.png" 
          alt="Movies Film Logo" 
          style={{ 
            width: '200px', 
            height: '100px', 
            objectFit: 'contain',
            margin: '20px auto',
            display: 'block'
          }} 
          className="logo"
        />
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;