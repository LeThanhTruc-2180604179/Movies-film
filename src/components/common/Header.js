import React from 'react';
import SearchBar from './SearchBar';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <SearchBar />
        
        <div className="header-right">
          <div className="welcome-text">
            Welcome back, {user?.name || 'User'}!
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;