import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setCurrentPage('home');
    }
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleAuth = (email, password) => {
    // Simple auth simulation
    if (email && password) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setCurrentPage('landing');
  };

  return (
    <div className="App">
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
      {currentPage === 'auth' && (
        <Auth onAuth={handleAuth} />
      )}
      {currentPage === 'home' && isAuthenticated && (
        <Home onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;