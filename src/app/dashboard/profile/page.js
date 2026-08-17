'use client';

import { useState, useEffect } from 'react';
import { User, Phone, Mail, Lock, CheckCircle, AlertCircle, Edit, Save, KeyRound } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setProfileData({
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        phone: u.phone || '',
        gender: u.gender || 'male',
      });
    }
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });
    setProfileLoading(true);

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          action: 'update_profile',
          ...profileData,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message });
        setUser(data.user);
        localStorage.setItem('softtap_user', JSON.stringify(data.user));
        setEditMode(false);
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Profile update failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'An error occurred during update' });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassMsg({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPassMsg({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    setPassLoading(true);

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          action: 'change_password',
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPassMsg({ type: 'success', text: data.message });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPassMsg({ type: 'error', text: data.message || 'Password update failed' });
      }
    } catch (err) {
      setPassMsg({ type: 'error', text: 'An error occurred during password change' });
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 flex items-center gap-3">
          <User className="w-8 h-8 text-orange-500" /> My Profile Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account information, personal details, and change your password.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" /> Personal Details
            </h2>
            {!editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-3.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 hover:text-orange-600 hover:border-orange-300 flex items-center gap-1.5 transition"
              >
                <Edit className="w-3.5 h-3.5" /> Edit Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="text-xs font-bold text-gray-500 hover:text-gray-700 transition"
              >
                Cancel
              </button>
            )}
          </div>

          {statusMsg.text && (
            <div
              className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'bg-red-50 border-red-300 text-red-700'
              }`}
            >
              {statusMsg.type === 'success' ? <CheckCircle className="w-4.5 h-4.5" /> : <AlertCircle className="w-4.5 h-4.5" />}
              {statusMsg.text}
            </div>
          )}

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  disabled={!editMode}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm focus:outline-none focus:border-orange-500 disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  disabled={!editMode}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm focus:outline-none focus:border-orange-500 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 font-medium text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!editMode}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm focus:outline-none focus:border-orange-500 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Gender</label>
              <select
                value={profileData.gender}
                onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                disabled={!editMode}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm focus:outline-none focus:border-orange-500 disabled:opacity-60"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {editMode && (
              <button
                type="submit"
                disabled={profileLoading}
                className="w-full py-3.5 rounded-xl btn-orange text-sm flex items-center justify-center gap-2 transition"
              >
                <Save className="w-4 h-4" />
                {profileLoading ? 'Saving...' : 'Save Profile Details'}
              </button>
            )}
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6 h-fit">
          <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-orange-500" /> Security Controls
          </h2>

          {passMsg.text && (
            <div
              className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                passMsg.type === 'success'
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'bg-red-50 border-red-300 text-red-700'
              }`}
            >
              {passMsg.type === 'success' ? <CheckCircle className="w-4.5 h-4.5" /> : <AlertCircle className="w-4.5 h-4.5" />}
              {passMsg.text}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password (min. 6 chars)"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={passLoading}
              className="w-full py-3.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-800 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <KeyRound className="w-4 h-4 text-orange-500" />
              {passLoading ? 'Updating Password...' : 'Update Account Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
