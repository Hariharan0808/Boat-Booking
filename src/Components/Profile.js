import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, logoutUser } from '../actions/authActions'; // Import your action creators
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Profile.css'; // Ensure you have a CSS file for styling

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function
  const user = useSelector(state => state.auth.user);

  const handleUpdateProfile = () => {
    // Placeholder for profile update logic
    // Example: Open a modal or redirect to an edit profile page
    // For demo purposes, let's simulate updating user info
    const updatedUser = { ...user, name: 'Updated User Name' };
    dispatch(updateUser(updatedUser));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login'); // Navigate to the login page after logout
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-header">
        <img src={'./img/profile.jpg'} alt="Profile" className="profile-picture" />
        <h2>{user.name || 'User Name'}</h2>
      </div>
      <div className="profile-details">
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone || '7712345678'}</p>
        <p>Address: {user.address || 'N/A'}</p>
        {/* Add more user details here */}
      </div>
      <button className="update-button" onClick={handleUpdateProfile}>Update Profile</button>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
