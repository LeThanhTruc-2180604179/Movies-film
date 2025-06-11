import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './SearchBar';
import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <SearchBar />
        
        <div className="header-right">
          <div className="user-profile-dropdown" ref={dropdownRef}>
            <div className="user-profile-trigger" onClick={toggleDropdown}>
              <div className="user-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="user-info">
                <div className="user-name">{user?.name || 'User'}</div>
                <div className="user-email">{user?.email}</div>
              </div>
              <ChevronDown 
                className={`dropdown-icon ${isDropdownOpen ? 'rotated' : ''}`} 
                size={16} 
              />
            </div>
            
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout} className="dropdown-item logout-item">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;