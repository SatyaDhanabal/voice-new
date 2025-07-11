import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [name, setName] = useState("Satya Dhanabal");
  const [email, setEmail] = useState("satya@example.com");

  const handleUpdate = () => {
    alert('Profile updated!');
    // Integrate with API later
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">Your Profile</h2>

      <div className="profile-card">
        <img
          src="/avatars/satya.png"
          alt="User Avatar"
          className="profile-avatar"
        />
        <button className="avatar-btn">Change Avatar</button>
      </div>

      <div className="profile-form">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="update-btn" onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
