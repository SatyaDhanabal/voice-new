import React, { useRef } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import PodcastCard from '../PodcastCard/PodcastCard';
import { podcastsData } from '../../utils/constants';
import { ChevronLeft, ChevronRight, Headphones, TrendingUp, Star, Radio, BarChart3, Hash, Clock } from 'lucide-react';

const Home = ({ onLogout }) => {
  const scrollRefs = {
    continueListening: useRef(null),
    youMightLike: useRef(null),
    popularShows: useRef(null),
    newReleases: useRef(null),
    podcastOfWeek: useRef(null),
    genres: useRef(null),
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
      id: 'genres',
      title: 'Browse by Genre',
      icon: Hash,
      data: podcastsData.genres
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
      <Navbar onLogout={onLogout} />
      
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
                <button className="banner-btn primary">
                  <ChevronRight size={20} />
                  Play Now
                </button>
                <button className="banner-btn secondary">
                  More Info
                </button>
              </div>
            </div>
            <div className="banner-image">
              <img 
                src="/assets/images/artists/The Joe Rogan Experience.png
                " 
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
              <button className="see-all-btn">See All</button>
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
    </div>
  );
};

export default Home;