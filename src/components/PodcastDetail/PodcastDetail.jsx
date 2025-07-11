import React, { useState, useEffect } from 'react';
import './PodcastDetail.css';
import { Play, Plus, ThumbsUp, Share2, X, Star, Check, Heart } from 'lucide-react';

const PodcastDetail = ({ podcast, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);
  const [isInWatchLater, setIsInWatchLater] = useState(false);
  const [showToast, setShowToast] = useState(null);

  // Check if podcast is already liked or in watch later on component mount
  useEffect(() => {
    const likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts') || '[]');
    const watchLaterPodcasts = JSON.parse(localStorage.getItem('watchLaterPodcasts') || '[]');
    
    setIsLiked(likedPodcasts.some(p => p.id === podcast.id));
    setIsInWatchLater(watchLaterPodcasts.some(p => p.id === podcast.id));
  }, [podcast.id]);

  // Show toast notification
  const showToastMessage = (message, type = 'success') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  // Function to add/remove from liked podcasts
  const toggleLike = () => {
    const likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts') || '[]');
    
    if (isLiked) {
      // Remove from liked
      const updatedLiked = likedPodcasts.filter(p => p.id !== podcast.id);
      localStorage.setItem('likedPodcasts', JSON.stringify(updatedLiked));
      setIsLiked(false);
      showToastMessage('Removed from liked podcasts');
    } else {
      // Add to liked
      const podcastData = {
        id: podcast.id,
        title: podcast.title,
        thumbnail: podcast.thumbnail,
        about: podcast.about || podcast.description || 'No description available',
        dateAdded: new Date().toISOString(),
        artist: podcast.artist || 'Unknown Artist',
        genre: podcast.genre || 'Podcast'
      };
      likedPodcasts.push(podcastData);
      localStorage.setItem('likedPodcasts', JSON.stringify(likedPodcasts));
      setIsLiked(true);
      showToastMessage('Added to liked podcasts');
    }
  };

  // Function to add/remove from watch later
  const toggleWatchLater = () => {
    const watchLaterPodcasts = JSON.parse(localStorage.getItem('watchLaterPodcasts') || '[]');
    
    if (isInWatchLater) {
      // Remove from watch later
      const updatedWatchLater = watchLaterPodcasts.filter(p => p.id !== podcast.id);
      localStorage.setItem('watchLaterPodcasts', JSON.stringify(updatedWatchLater));
      setIsInWatchLater(false);
      showToastMessage('Removed from watch later');
    } else {
      // Add to watch later
      const podcastData = {
        id: podcast.id,
        title: podcast.title,
        thumbnail: podcast.thumbnail,
        about: podcast.about || podcast.description || 'No description available',
        dateAdded: new Date().toISOString(),
        artist: podcast.artist || 'Unknown Artist',
        genre: podcast.genre || 'Podcast'
      };
      watchLaterPodcasts.push(podcastData);
      localStorage.setItem('watchLaterPodcasts', JSON.stringify(watchLaterPodcasts));
      setIsInWatchLater(true);
      showToastMessage('Added to watch later');
    }
  };

  // Dummy episodes data
  const episodes = [
    { id: 1, number: 'E01', title: 'Introduction to the Series', duration: '45:23', thumbnail: podcast.thumbnail },
    { id: 2, number: 'E02', title: 'Deep Dive Discussion', duration: '52:18', thumbnail: podcast.thumbnail },
    { id: 3, number: 'E03', title: 'Special Guest Interview', duration: '38:45', thumbnail: podcast.thumbnail },
    { id: 4, number: 'E04', title: 'Behind the Scenes', duration: '41:30', thumbnail: podcast.thumbnail },
    { id: 5, number: 'E05', title: 'Listener Questions', duration: '55:12', thumbnail: podcast.thumbnail },
    { id: 6, number: 'E06', title: 'Season Finale', duration: '48:37', thumbnail: podcast.thumbnail }
  ];

  const moreLikeThis = [
    { id: 1, title: 'Similar Podcast 1', thumbnail: '/assets/images/artists/huberman.png' },
    { id: 2, title: 'Similar Podcast 2', thumbnail: '/assets/images/artists/the daily.png' },
    { id: 3, title: 'Similar Podcast 3', thumbnail: '/assets/images/artists/RadioLabs.png' },
    { id: 4, title: 'Similar Podcast 4', thumbnail: '/assets/images/artists/hidden brain.png' }
  ];

  return (
    <div className="podcast-detail-overlay">
      <div className="podcast-detail-container">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="detail-content">
          <div className="detail-left">
            <div className="preview-container">
              <img 
                src={podcast.thumbnail} 
                alt={podcast.title}
                className="preview-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500/1a1a1a/ffffff?text=Podcast';
                }}
              />
              <button className="detail-play-btn">
                <Play size={32} fill="white" />
              </button>
            </div>
          </div>

          <div className="detail-right">
            <div className="detail-header">
              <h1 className="detail-title">{podcast.title}</h1>
              <div className="detail-meta">
                <span className="year">2024</span>
                <span className="separator">•</span>
                <span className="seasons">Season 1</span>
                <span className="separator">•</span>
                <span className="rating-badge">16+</span>
              </div>
              <div className="detail-rating">
                <span className="rating-score">9.0</span>
                <Star size={20} fill="#ffd700" color="#ffd700" />
              </div>
            </div>

            <div className="detail-actions">
              <button className="action-btn primary">
                <Play size={20} fill="white" />
                <span>Play</span>
              </button>
              <button 
                className={`action-btn secondary ${isInWatchLater ? 'added' : ''}`}
                onClick={toggleWatchLater}
              >
                {isInWatchLater ? <Check size={20} /> : <Plus size={20} />}
                <span>{isInWatchLater ? 'Added' : 'My List'}</span>
              </button>
              <button 
                className={`action-btn icon ${isLiked ? 'liked' : ''}`}
                onClick={toggleLike}
              >
                {isLiked ? <Heart size={20} fill="currentColor" /> : <ThumbsUp size={20} />}
              </button>
              <button className="action-btn icon">
                <Share2 size={20} />
              </button>
            </div>

            <div className="detail-tabs">
              <button 
                className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab ${activeTab === 'episodes' ? 'active' : ''}`}
                onClick={() => setActiveTab('episodes')}
              >
                Episodes
              </button>
              <button 
                className={`tab ${activeTab === 'trailers' ? 'active' : ''}`}
                onClick={() => setActiveTab('trailers')}
              >
                Trailers & More
              </button>
              <button 
                className={`tab ${activeTab === 'more' ? 'active' : ''}`}
                onClick={() => setActiveTab('more')}
              >
                More Like This
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <p className="overview-text">
                    {podcast.about || podcast.description || 'No description available'} Experience thought-provoking conversations with leading experts, 
                    celebrities, and influential thinkers. Each episode dives deep into topics that 
                    matter, from science and technology to culture and philosophy. Join millions of 
                    listeners worldwide in exploring ideas that shape our world.
                  </p>
                  
                  <div className="detail-info">
                    <div className="info-item">
                      <span className="info-label">Host:</span>
                      <span className="info-value">{podcast.artist || podcast.title.split(' ')[0]} {podcast.title.split(' ')[1] || ''}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Creator:</span>
                      <span className="info-value">Podcast Network Studios</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Genre:</span>
                      <span className="info-value">{podcast.genre || 'Talk Show, Interview, Educational'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'episodes' && (
                <div className="episodes-container">
                  <div className="episodes-scroll">
                    {episodes.map(episode => (
                      <div key={episode.id} className="episode-card">
                        <div className="episode-thumbnail">
                          <img src={episode.thumbnail} alt={episode.title} />
                          <div className="episode-play">
                            <Play size={20} fill="white" />
                          </div>
                        </div>
                        <div className="episode-info">
                          <h4 className="episode-number">{episode.number}</h4>
                          <p className="episode-title">{episode.title}</p>
                          <span className="episode-duration">{episode.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'trailers' && (
                <div className="trailers-content">
                  <p className="empty-state">No trailers available at this time.</p>
                </div>
              )}

              {activeTab === 'more' && (
                <div className="more-like-this">
                  <div className="similar-grid">
                    {moreLikeThis.map(item => (
                      <div key={item.id} className="similar-card">
                        <img src={item.thumbnail} alt={item.title} />
                        <p>{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`toast ${showToast.type}`}>
          {showToast.message}
        </div>
      )}
    </div>
  );
};

export default PodcastDetail;