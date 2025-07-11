import React, { useState, useEffect } from 'react';
import './NotificationPopup.css';
import { 
  Bell, 
  X, 
  Check, 
  Headphones, 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Star,
  TrendingUp,
  Gift,
  Mic,
  Clock,
  CheckCheck
} from 'lucide-react';

const NotificationPopup = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_episode',
      icon: Headphones,
      title: 'New Episode Available',
      message: 'The Joe Rogan Experience just released a new episode with Elon Musk',
      time: '2 minutes ago',
      unread: true,
      color: '#e50914'
    },
    {
      id: 2,
      type: 'like',
      icon: Heart,
      title: 'Someone liked your playlist',
      message: 'John Doe liked your "Morning Motivation" playlist',
      time: '1 hour ago',
      unread: true,
      color: '#ef4444'
    },
    {
      id: 3,
      type: 'comment',
      icon: MessageCircle,
      title: 'New comment on your review',
      message: 'Sarah commented on your review of "The Daily"',
      time: '3 hours ago',
      unread: true,
      color: '#3b82f6'
    },
    {
      id: 4,
      type: 'follow',
      icon: UserPlus,
      title: 'New follower',
      message: 'Mike Johnson started following you',
      time: '5 hours ago',
      unread: false,
      color: '#10b981'
    },
    {
      id: 5,
      type: 'achievement',
      icon: Star,
      title: 'Achievement Unlocked!',
      message: 'You\'ve listened to 100 episodes this month',
      time: '1 day ago',
      unread: false,
      color: '#f59e0b'
    },
    {
      id: 6,
      type: 'trending',
      icon: TrendingUp,
      title: 'Your favorite show is trending',
      message: '"Tech Talk Daily" is now #1 in Technology',
      time: '2 days ago',
      unread: false,
      color: '#8b5cf6'
    },
    {
      id: 7,
      type: 'subscription',
      icon: Gift,
      title: 'Premium Feature Unlocked',
      message: 'Enjoy ad-free listening with your premium subscription',
      time: '3 days ago',
      unread: false,
      color: '#ec4899'
    },
    {
      id: 8,
      type: 'recommendation',
      icon: Mic,
      title: 'Recommended for you',
      message: 'Based on your history, you might like "Science Friday"',
      time: '1 week ago',
      unread: false,
      color: '#06b6d4'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return notif.unread;
    return false;
  });

  const unreadCount = notifications.filter(notif => notif.unread).length;

  if (!isOpen) return null;

  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className="notification-popup" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <div className="header-title">
            <Bell size={24} />
            <h2>Notifications</h2>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="notification-controls">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'unread' ? 'active' : ''}`}
              onClick={() => setActiveFilter('unread')}
            >
              Unread ({unreadCount})
            </button>
          </div>

          <div className="bulk-actions">
            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={markAllAsRead}>
                <CheckCheck size={16} />
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button className="clear-all-btn" onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="notification-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <Bell size={48} className="empty-icon" />
              <p>No notifications</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.unread ? 'unread' : ''}`}
              >
                <div 
                  className="notification-icon"
                  style={{ backgroundColor: `${notification.color}20`, color: notification.color }}
                >
                  <notification.icon size={20} />
                </div>
                
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    <Clock size={14} />
                    {notification.time}
                  </span>
                </div>

                <div className="notification-actions">
                  {notification.unread && (
                    <button 
                      className="mark-read-btn"
                      onClick={() => markAsRead(notification.id)}
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button 
                    className="delete-btn"
                    onClick={() => deleteNotification(notification.id)}
                    title="Delete"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="notification-footer">
          <button className="see-all-btn">
            See all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;