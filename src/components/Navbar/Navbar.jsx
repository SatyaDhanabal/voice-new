import React, { useState } from 'react';
import './Navbar.css';
import { Home, Compass, Library, User, Search, Bell, LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ onLogout, onNavigate, currentView, onNotificationClick }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true); // Track notification status
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browse', label: 'Browse', icon: Compass },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'profile', label: 'Profile', icon: User }
  ];
  
  const handleNavClick = (itemId) => {
    onNavigate(itemId);
    setIsMobileMenuOpen(false);
  };
  
  const handleNotificationClick = () => {
    setHasNotifications(false); // Clear notification badge
    if (onNotificationClick) {
      onNotificationClick(); // Call the notification handler passed from parent
    }
  };
  
  const handleProfileClick = () => {
    onNavigate('profile');
  };
  
  const userEmail = typeof window !== 'undefined' ?
    (window.localStorage.getItem('userEmail') || 'user@example.com') :
    'user@example.com';
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <h1 className="navbar-logo" onClick={() => onNavigate('home')}>VOICESTREAM</h1>
         
          <div className="navbar-menu desktop-menu">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
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
          </div>      
          <button 
            className="icon-btn notification-btn"
            onClick={handleNotificationClick}
          >
            <Bell size={20} />
            {hasNotifications && <span className="notification-badge">3</span>}
          </button>
          
          <div className="user-menu">
            <button 
              className="user-avatar"
              onClick={handleProfileClick}
            >
              <User size={20} />
            </button>
            <div className="user-dropdown">
              <div className="user-info">
                <p className="user-email">{userEmail}</p>
              </div>
              <button 
                className="dropdown-item" 
                onClick={handleProfileClick}
              >
                <User size={18} />
                <span>My Profile</span>
              </button>
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
            className={`mobile-nav-item ${currentView === item.id ? 'active' : ''}`}
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