import React, { useState } from 'react';
import './PodcastCard.css';
import { Play, Eye, MoreVertical } from 'lucide-react';

const PodcastCard = ({ podcast, showProgress = false, onView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="podcast-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="podcast-thumbnail-wrapper">
        <img
          src={podcast.thumbnail}
          alt={podcast.title}
          className="podcast-thumbnail"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x180/1a1a1a/ffffff?text=Podcast';
          }}
        />
       
        {showProgress && podcast.progress && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${podcast.progress}%` }}
            ></div>
          </div>
        )}

        <div className={`podcast-overlay ${isHovered ? 'visible' : ''}`}>
          <button className="play-btn">
            <Play size={24} fill="white" />
          </button>
        </div>

        <button className="more-btn">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="podcast-info">
        <h4 className="podcast-title">{podcast.title}</h4>
        <p className="podcast-about">{podcast.about}</p>
       
        <button className="view-btn" onClick={() => onView(podcast)}>
          <Eye size={16} />
          <span>View</span>
        </button>
      </div>
    </div>
  );
};

export default PodcastCard;