import React, { useState } from 'react';
import './Profile.css';
import { 
  Camera, 
  User, 
  Mail, 
  Calendar, 
  Crown, 
  Edit, 
  Lock, 
  CreditCard, 
  Trash2, 
  LogOut,
  ChevronRight,
  Shield,
  Bell,
  Settings
} from 'lucide-react';

const Profile = ({ onLogout, onNavigate }) => {
  // Use a stable default avatar to prevent flickering
  const [profileImage, setProfileImage] = useState('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiByeD0iNzUiIGZpbGw9IiMzNzQxNTEiLz4KPHN2ZyB4PSI0NSIgeT0iNDAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI3MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjOUM5Q0EzIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+PC9zdmc+PC9zdmc+');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Mock user data - replace with actual user data from your state/props
  const userData = {
    fullName: 'Satya Dhanabal',
    username: '@satyadhanabal',
    email: 'satya.dhanabal@email.com',
    dateJoined: 'January 15, 2024',
    subscriptionPlan: 'Premium',
    totalListeningHours: '234',
    favoriteGenre: 'Technology & Science',
    podcastsCompleted: '89'
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Add delete account logic here
    console.log('Account deleted');
    setShowDeleteModal(false);
    if (onLogout) onLogout();
  };

  const actionItems = [
    {
      icon: Edit,
      title: 'Edit Profile',
      description: 'Update your personal information',
      action: () => console.log('Edit profile')
    },
    {
      icon: Lock,
      title: 'Change Password',
      description: 'Update your security settings',
      action: () => console.log('Change password')
    },
    {
      icon: CreditCard,
      title: 'Manage Subscriptions',
      description: 'View and update your plan',
      action: () => console.log('Manage subscriptions')
    },
    {
      icon: Bell,
      title: 'Notification Settings',
      description: 'Control your notifications',
      action: () => console.log('Notification settings')
    },
    {
      icon: Shield,
      title: 'Privacy Settings',
      description: 'Manage your privacy preferences',
      action: () => console.log('Privacy settings')
    },
    {
      icon: Settings,
      title: 'App Settings',
      description: 'Customize your experience',
      action: () => console.log('App settings')
    }
  ];

  return (
    <div className="profile-container">
        <div className="profile-header">
          <button className="back-btn" onClick={() => onNavigate && onNavigate('home')}>
            <ChevronRight size={24} />
            Back to Home
          </button>
          <h1>My Profile</h1>
        </div>

        <div className="profile-content">
          {/* Profile Info Section */}
          <div className="profile-info-section">
            <div className="profile-picture-wrapper">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="profile-picture"
              />
              <label className="upload-photo-btn">
                <Camera size={20} />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </div>

            <div className="profile-details">
              <h2 className="profile-name">{userData.fullName}</h2>
              <p className="profile-username">{userData.username}</p>
              
              <div className="profile-info-grid">
                <div className="info-item">
                  <Mail size={18} />
                  <span>{userData.email}</span>
                </div>
                
                <div className="info-item">
                  <Calendar size={18} />
                  <span>Joined {userData.dateJoined}</span>
                </div>
                
                <div className="info-item">
                  <Crown size={18} />
                  <span className={`subscription-badge ${userData.subscriptionPlan.toLowerCase()}`}>
                    {userData.subscriptionPlan} Plan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="profile-stats">
            <div className="stat-card">
              <div className="stat-value">{userData.totalListeningHours}</div>
              <div className="stat-label">Hours Listened</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.podcastsCompleted}</div>
              <div className="stat-label">Podcasts Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{userData.favoriteGenre}</div>
              <div className="stat-label">Favorite Genre</div>
            </div>
          </div>

          {/* Settings & Actions */}
          <div className="profile-actions">
            <h3 className="section-title">Settings & Actions</h3>
            
            <div className="action-items">
              {actionItems.map((item, index) => (
                <button 
                  key={index} 
                  className="action-item"
                  onClick={item.action}
                >
                  <div className="action-icon">
                    <item.icon size={22} />
                  </div>
                  <div className="action-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                  <ChevronRight size={20} className="action-arrow" />
                </button>
              ))}
            </div>

            {/* Danger Zone */}
            <div className="danger-zone">
              <button 
                className="danger-btn delete-account"
                onClick={handleDeleteAccount}
              >
                <Trash2 size={20} />
                Delete Account
              </button>
              
              <button 
                className="danger-btn logout"
                onClick={onLogout}
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">
                <Trash2 size={32} />
              </div>
              <h3>Delete Account?</h3>
              <p>Are you sure you want to delete your account? This action cannot be undone and you will lose all your data.</p>
              <div className="modal-actions">
                <button 
                  className="modal-btn cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="modal-btn confirm danger"
                  onClick={confirmDelete}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default Profile;