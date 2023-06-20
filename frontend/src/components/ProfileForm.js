import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../features/auth/authSlice';


const ProfileForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedProfile = await updateUser(profile);
      dispatch(updateUser(updatedProfile));
      toast.success('Profile updated');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add inputs for the other fields here, following the same pattern */}
      <label>
        First Name:
        <input
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone:
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
        />
      </label>
      <label>
        New Password:
        <input
          name="newPassword"
          type="password"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
