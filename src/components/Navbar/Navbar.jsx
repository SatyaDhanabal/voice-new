import React, { useState } from 'react';
import './Navbar.css';
import { Home, Compass, Library, User, Search, Bell, LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browse', label: 'Browse', icon: Compass },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleNavClick = (itemId) => {
    setActiveItem(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <h1 className="navbar-logo">VOICESTREAM</h1>
          
          <div className="navbar-menu desktop-menu">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="navbar-right">
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <Search 
              size={20} 
              className="search-icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <input
              type="text"
              className="search-input"
              placeholder="Search podcasts, artists..."
            />
          </div>

          <button className="icon-btn notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>

          <div className="user-menu">
            <button className="user-avatar">
              <User size={20} />
            </button>
            <div className="user-dropdown">
              <div className="user-info">
                <p className="user-email">{localStorage.getItem('userEmail') || 'user@example.com'}</p>
              </div>
              <button className="dropdown-item" onClick={onLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`mobile-nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
        <button className="mobile-nav-item logout" onClick={onLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;