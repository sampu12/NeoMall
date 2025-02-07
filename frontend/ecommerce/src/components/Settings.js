import React from 'react';

const Settings = () => {
  return (
    <div>
      {/* Settings Options */}
      <div className="container mt-5">
        <h2 className="fw-bold text-dark text-center">Account Settings</h2>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="settings-option p-3 border shadow-sm">
              <h3>Change Password</h3>
              <p>Update your account password.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="settings-option p-3 border shadow-sm">
              <h3>Notification Preferences</h3>
              <p>Manage your email and push notifications.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="settings-option p-3 border shadow-sm">
              <h3>Privacy Settings</h3>
              <p>Control your privacy preferences and data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
