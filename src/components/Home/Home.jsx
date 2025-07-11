import React, { useRef, useState } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import PodcastCard from '../PodcastCard/PodcastCard';
import PodcastDetail from '../PodcastDetail/PodcastDetail';
import Profile from '../Profile/Profile';
import NotificationPopup from '../NotificationPopup/NotificationPopup';

import Browse from '../Browse/Browse';
import Library from '../Library/Library';

import { podcastsData } from '../../utils/constants';
import { ChevronLeft, ChevronRight, Headphones, TrendingUp, Star, Radio, BarChart3, Laugh, Shield, GraduationCap, Drama, Clock } from 'lucide-react';

const Home = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [autoPlayVideo, setAutoPlayVideo] = useState(false);
  
  const scrollRefs = {
    continueListening: useRef(null),
    youMightLike: useRef(null),
    popularShows: useRef(null),
    newReleases: useRef(null),
    podcastOfWeek: useRef(null),
    comedy: useRef(null),
    crimeThriller: useRef(null),
    education: useRef(null),
    drama: useRef(null),
    topCharts: useRef(null)
  };

  const handleScroll = (section, direction) => {
    const container = scrollRefs[section].current;
    const scrollAmount = 300;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleViewPodcast = (podcast, autoPlay = false) => {
    setSelectedPodcast(podcast);
    setAutoPlayVideo(autoPlay);
  };

  const handleClosePodcastDetail = () => {
    setSelectedPodcast(null);
    setAutoPlayVideo(false);
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setSelectedPodcast(null);
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const sections = [
    {
      id: 'continueListening',
      title: 'Continue Listening',
      icon: Clock,
      data: podcastsData.continueListening,
      showProgress: true
    },
    {
      id: 'youMightLike',
      title: 'You Might Like It',
      icon: Headphones,
      data: podcastsData.youMightLike
    },
    {
      id: 'popularShows',
      title: 'Popular Shows',
      icon: TrendingUp,
      data: podcastsData.popularShows
    },
    {
      id: 'newReleases',
      title: 'New Releases',
      icon: Star,
      data: podcastsData.newReleases
    },
    {
      id: 'podcastOfWeek',
      title: 'Podcast of the Week',
      icon: Radio,
      data: podcastsData.podcastOfWeek
    },
    {
      id: 'comedy',
      title: 'Comedy',
      icon: Laugh,
      data: podcastsData.comedy
    },
    {
      id: 'crimeThriller',
      title: 'Crime Thriller',
      icon: Shield,
      data: podcastsData.crimeThriller
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      data: podcastsData.education
    },
    {
      id: 'drama',
      title: 'Drama',
      icon: Drama,
      data: podcastsData.drama
    },
    {
      id: 'topCharts',
      title: 'Top Charts',
      icon: BarChart3,
      data: podcastsData.topCharts
    }
  ];

  return (
    <div className="home-page">
      <Navbar 
        onLogout={onLogout} 
        onNavigate={handleNavigation} 
        currentView={currentView}
        onNotificationClick={handleNotificationClick}
      />
      
      {currentView === 'home' && (
        <main className="home-content">
          {/* Hero Banner */}
          <section className="hero-banner">
            <div className="banner-content">
              <div className="banner-info">
                <span className="banner-tag">FEATURED PODCAST</span>
                <h2 className="banner-title">The Joe Rogan Experience</h2>
                <p className="banner-description">
                  The official podcast of comedian Joe Rogan. Follow for free to get new episodes.
                </p>
                <div className="banner-actions">
                  <button className="banner-btn primary" onClick={() => {
                    const featuredPodcast = {
                      id: 'featured',
                      title: 'The Joe Rogan Experience',
                      about: 'The official podcast of comedian Joe Rogan. Follow for free to get new episodes.',
                      thumbnail: '/assets/images/artists/The Joe Rogan Experience.png'
                    };
                    handleViewPodcast(featuredPodcast, true);
                  }}>
                    <ChevronRight size={20} />
                    Play Now
                  </button>
                  <button className="banner-btn secondary" onClick={() => {
                    const featuredPodcast = {
                      id: 'featured',
                      title: 'The Joe Rogan Experience',
                      about: 'The official podcast of comedian Joe Rogan. Follow for free to get new episodes.',
                      thumbnail: '/assets/images/artists/The Joe Rogan Experience.png'
                    };
                    handleViewPodcast(featuredPodcast, false);
                  }}>
                    More Info
                  </button>
                </div>
              </div>
              <div className="banner-image">
                <img 
                  src="/assets/images/artists/The Joe Rogan Experience.png" 
                  alt="Featured Podcast"
                />
              </div>
            </div>
            <div className="banner-gradient"></div>
          </section>

          {/* Podcast Sections */}
          {sections.map(section => (
            <section key={section.id} className="podcast-section">
              <div className="section-header">
                <div className="section-title-wrapper">
                  <section.icon size={24} className="section-icon" />
                  <h3 className="section-title">{section.title}</h3>
                </div>
              </div>

              <div className="carousel-wrapper">
                <button 
                  className="carousel-btn prev"
                  onClick={() => handleScroll(section.id, 'left')}
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </button>

                <div 
                  className="podcasts-carousel" 
                  ref={scrollRefs[section.id]}
                >
                  {section.data.map(podcast => (
                    <PodcastCard 
                      key={podcast.id} 
                      podcast={podcast} 
                      showProgress={section.showProgress}
                      onView={handleViewPodcast}
                    />
                  ))}
                </div>

                <button 
                  className="carousel-btn next"
                  onClick={() => handleScroll(section.id, 'right')}
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </section>
          ))}
        </main>
      )}

      {currentView === 'browse' && <Browse onView={handleViewPodcast} />}
      {currentView === 'library' && <Library onView={handleViewPodcast} />}
      {currentView === 'profile' && (
        <Profile 
          onLogout={onLogout} 
          onNavigate={handleNavigation}
        />
      )}

      {selectedPodcast && (
        <PodcastDetail 
          podcast={selectedPodcast} 
          onClose={handleClosePodcastDetail}
          autoPlay={autoPlayVideo}
        />
      )}

      <NotificationPopup 
        isOpen={showNotifications}
        onClose={handleCloseNotifications}
      />
    </div>
  );
};

export default Home;