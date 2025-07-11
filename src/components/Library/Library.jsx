import React, { useState, useEffect } from 'react';
import './Library.css';
import { Heart, Clock, Plus, Play, Trash2, Calendar } from 'lucide-react';
import PodcastCard from '../PodcastCard/PodcastCard';

const Library = ({ onView }) => {
  const [activeTab, setActiveTab] = useState('liked');
  const [likedPodcasts, setLikedPodcasts] = useState([]);
  const [watchLaterPodcasts, setWatchLaterPodcasts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [podcastToDelete, setPodcastToDelete] = useState(null);

  // Load podcasts from localStorage on component mount
  useEffect(() => {
    loadPodcasts();
  }, []);

  // Load podcasts from localStorage
  const loadPodcasts = () => {
    const liked = JSON.parse(localStorage.getItem('likedPodcasts') || '[]');
    const watchLater = JSON.parse(localStorage.getItem('watchLaterPodcasts') || '[]');
    
    // Sort by date added (newest first)
    liked.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    watchLater.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    
    setLikedPodcasts(liked);
    setWatchLaterPodcasts(watchLater);
  };

  // Remove podcast from library
  const removePodcast = (podcast, type) => {
    if (type === 'liked') {
      const updatedLiked = likedPodcasts.filter(p => p.id !== podcast.id);
      localStorage.setItem('likedPodcasts', JSON.stringify(updatedLiked));
      setLikedPodcasts(updatedLiked);
    } else {
      const updatedWatchLater = watchLaterPodcasts.filter(p => p.id !== podcast.id);
      localStorage.setItem('watchLaterPodcasts', JSON.stringify(updatedWatchLater));
      setWatchLaterPodcasts(updatedWatchLater);
    }
    setShowDeleteModal(false);
    setPodcastToDelete(null);
  };

  // Handle delete button click
  const handleDeleteClick = (podcast, type) => {
    setPodcastToDelete({ podcast, type });
    setShowDeleteModal(true);
  };

  // Clear all podcasts
  const clearAll = () => {
    if (activeTab === 'liked') {
      localStorage.setItem('likedPodcasts', JSON.stringify([]));
      setLikedPodcasts([]);
    } else {
      localStorage.setItem('watchLaterPodcasts', JSON.stringify([]));
      setWatchLaterPodcasts([]);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  const currentPodcasts = activeTab === 'liked' ? likedPodcasts : watchLaterPodcasts;

  return (
    <div className="library-page">
      <div className="library-header">
        <h1 className="library-title">My Library</h1>
        <p className="library-subtitle">Your personal podcast collection</p>
      </div>

      <div className="library-tabs">
        <button
          className={`library-tab ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          <Heart size={20} />
          <span>Liked Podcasts</span>
          <span className="tab-count">{likedPodcasts.length}</span>
        </button>
        <button
          className={`library-tab ${activeTab === 'watchLater' ? 'active' : ''}`}
          onClick={() => setActiveTab('watchLater')}
        >
          <Clock size={20} />
          <span>Watch Later</span>
          <span className="tab-count">{watchLaterPodcasts.length}</span>
        </button>
      </div>

      <div className="library-content">
        {currentPodcasts.length > 0 ? (
          <>
            <div className="library-actions">
              <button className="play-all-btn">
                <Play size={20} fill="white" />
                <span>Play All</span>
              </button>
              <button 
                className="clear-all-btn"
                onClick={clearAll}
              >
                <Trash2 size={20} />
                <span>Clear All</span>
              </button>
            </div>

            <div className="library-grid">
              {currentPodcasts.map(podcast => (
                <div key={podcast.id} className="library-item">
                  <PodcastCard 
                    podcast={podcast} 
                    onView={onView}
                  />
                  <div className="library-item-info">
                    <p className="date-added">
                      <Calendar size={14} />
                      {formatDate(podcast.dateAdded)}
                    </p>
                    <button 
                      className="remove-btn"
                      onClick={() => handleDeleteClick(podcast, activeTab)}
                      title="Remove from library"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-library">
            <div className="empty-icon">
              {activeTab === 'liked' ? <Heart size={64} /> : <Clock size={64} />}
            </div>
            <h3>No podcasts yet</h3>
            <p>
              {activeTab === 'liked' 
                ? 'Start liking podcasts to see them here' 
                : 'Add podcasts to watch later'}
            </p>
            <button 
              className="browse-btn"
              onClick={() => window.location.href = '/'}
            >
              Browse Podcasts
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && podcastToDelete && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Remove from Library?</h3>
            <p>Are you sure you want to remove "{podcastToDelete.podcast.title}" from your {podcastToDelete.type === 'liked' ? 'liked podcasts' : 'watch later'}?</p>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn confirm"
                onClick={() => removePodcast(podcastToDelete.podcast, podcastToDelete.type)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;