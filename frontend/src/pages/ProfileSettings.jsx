import React from 'react';
import ProfileForm from '../components/ProfileForm';
import SettingsForm from '../components/SettingsForm';

const ProfileSettings = () => {
    return (
        <div>
            <h1>Profile/Settings</h1>
            <div>
                <ProfileForm />
                <SettingsForm />
            </div>
        </div>
    );
};

export default ProfileSettings;


