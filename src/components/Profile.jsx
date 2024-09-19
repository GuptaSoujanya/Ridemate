import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@college.edu</p>
        <p><strong>Role:</strong> Rider</p>
      </div>
      <button className="edit-button">Edit Profile</button>
    </div>
  );
};

export default Profile;
