import React, { useState } from 'react';
import './Browse.css';
import { Search, Filter } from 'lucide-react';
import PodcastCard from '../PodcastCard/PodcastCard';
import { podcastsData } from '../../utils/constants';

const Browse = ({ onView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Combine all podcasts for searching
  const allPodcasts = [
    ...podcastsData.continueListening,
    ...podcastsData.youMightLike,
    ...podcastsData.popularShows,
    ...podcastsData.newReleases,
    ...podcastsData.podcastOfWeek,
    ...podcastsData.comedy,
    ...podcastsData.crimeThriller,
    ...podcastsData.education,
    ...podcastsData.drama,
    ...podcastsData.topCharts
  ];

  // Remove duplicates based on id
  const uniquePodcasts = allPodcasts.filter((podcast, index, self) =>
    index === self.findIndex((p) => p.id === podcast.id)
  );

  // Function to get podcasts by category
  const getPodcastsByCategory = () => {
    switch(selectedCategory) {
      case 'comedy':
        return [...podcastsData.comedy];
      case 'crime':
        return [...podcastsData.crimeThriller];
      case 'education':
        return [...podcastsData.education];
      case 'drama':
        return [...podcastsData.drama];
      case 'all':
      default:
        return uniquePodcasts;
    }
  };

  // Get podcasts based on selected category
  const categoryPodcasts = getPodcastsByCategory();

  // Filter podcasts based on search query
  const filteredPodcasts = categoryPodcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.about.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'crime', name: 'Crime & Thriller' },
    { id: 'education', name: 'Education' },
    { id: 'drama', name: 'Drama' },
  ];

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1 className="browse-title">Browse Podcasts</h1>
        
        <div className="browse-search">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search for podcasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="browse-search-input"
          />
        </div>
      </div>

      <div className="browse-filters">
        <div className="filter-label">
          <Filter size={18} />
          <span>Categories:</span>
        </div>
        <div className="category-pills">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="browse-content">
        {filteredPodcasts.length > 0 ? (
          <div className="browse-grid">
            {filteredPodcasts.map(podcast => (
              <PodcastCard 
                key={podcast.id} 
                podcast={podcast} 
                onView={onView}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🎙️</div>
            <h3>Looks like the podcast isn't available right now</h3>
            <p>Try searching for something else or browse our categories</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;