// src/components/Profile.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, fetchUserProfile } from '../store/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (isAuthenticated && !userInfo) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, userInfo]);

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      {userInfo ? (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
