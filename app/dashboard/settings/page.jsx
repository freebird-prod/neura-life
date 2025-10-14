"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { Save, Settings as SettingsIcon, User } from "lucide-react";

const SettingsPage = () => {
  const { settings, loading, saveSettings } = useSettings();
  const { user } = useAuth();
  const [localSettings, setLocalSettings] = useState(settings);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [profilePhoto, setProfilePhoto] = useState(settings.profilePhoto);
  const fileInputRef = useRef(null);

  // Sync profilePhoto with settings when settings are fetched
  useEffect(() => {
    setProfilePhoto(settings.profilePhoto);
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = async () => {
    const success = await saveSettings(localSettings);
    if (success) {
      // Settings saved
    }
  };

  const updateProfile = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Resize image to max 300x300 to reduce file size
          const maxSize = 300;
          let { width, height } = img;

          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 with reduced quality
          const base64Data = canvas.toDataURL("image/jpeg", 0.7);
          setProfilePhoto(base64Data);
          setLocalSettings((prev) => ({ ...prev, profilePhoto: base64Data }));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveProfile = async () => {
    const success = await saveSettings(localSettings);
    if (success) {
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <SettingsIcon className="text-pink-600 mr-4" size={32} />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Customize your NeuraLife experience</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Profile
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors"
                      onClick={() => fileInputRef.current.click()}
                    >
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.warn(
                              "Profile photo failed to load, resetting to default"
                            );
                            setProfilePhoto(null);
                            setLocalSettings((prev) => ({
                              ...prev,
                              profilePhoto: null,
                            }));
                          }}
                        />
                      ) : (
                        <User size={48} className="text-gray-400" />
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User size={20} className="text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Name</p>
                      <p className="text-sm text-gray-600">Your display name</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => updateProfile("name", e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User size={20} className="text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">
                        Your email address
                      </p>
                    </div>
                  </div>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile("email", e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
