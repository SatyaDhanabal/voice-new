import React, { useRef } from 'react';
import './LandingPage.css';
import ArtistCard from '../ArtistCard/ArtistCard';
import { artists } from '../../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <header className="landing-header">
          <h1 className="app-name">VOICESTREAM</h1>
          <p className="app-tagline">Stream powerful voices. Anywhere, Anytime.</p>
        </header>

        <section className="artists-section">
          <h2 className="section-title">Featured Voices</h2>
          <div className="artists-carousel-wrapper">
            <button 
              className="carousel-nav carousel-nav-left"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="artists-carousel" ref={scrollRef}>
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
            
            <button 
              className="carousel-nav carousel-nav-right"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

        <div className="cta-section">
          <button className="get-started-btn" onClick={onGetStarted}>
            <span className="btn-text">Get Started</span>
            <span className="btn-glow"></span>
          </button>
          <p className="cta-subtext">Join millions streaming their favorite podcasts</p>
        </div>
      </div>

      {/* Background effects */}
      <div className="landing-bg-gradient"></div>
      <div className="landing-bg-particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;