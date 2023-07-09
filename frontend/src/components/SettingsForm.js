import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserSettings } from '../api/userApi';
import { updateUser } from '../features/auth/authSlice';

const SettingsForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [settings, setSettings] = useState(user.settings);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedSettings = await updateUserSettings(settings);
      dispatch(updateUser({ settings: updatedSettings }));
      toast.success('Settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  const handleChange = (event) => {
    setSettings({ ...settings, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add inputs for the other fields here, following the same pattern */}
      <label>
        Measurement System:
        <select
          name="measurementSystem"
          value={settings.measurementSystem}
          onChange={handleChange}
        >
          <option value="metric">Metric</option>
          <option value="imperial">Imperial</option>
        </select>
      </label>
      {/* Other inputs would go here, similar to the Measurement System input */}
      <button type="submit">Update Settings</button>
    </form>
  );
};

export default SettingsForm;
