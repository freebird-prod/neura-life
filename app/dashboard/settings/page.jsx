"use client";
import React, { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import toast from "react-hot-toast";
import {
  Save,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Bell,
  Brain,
} from "lucide-react";

const SettingsPage = () => {
  const { settings, loading, saveSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = async () => {
    const success = await saveSettings(localSettings);
    if (success) {
      // Settings saved
    }
  };

  const updateSetting = (key, value) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
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
                Appearance
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {localSettings.theme === "dark" ? (
                      <Moon size={20} className="text-gray-600 mr-3" />
                    ) : (
                      <Sun size={20} className="text-gray-600 mr-3" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">Theme</p>
                      <p className="text-sm text-gray-600">
                        Choose your preferred theme
                      </p>
                    </div>
                  </div>
                  <select
                    value={localSettings.theme}
                    onChange={(e) => updateSetting("theme", e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell size={20} className="text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Push Notifications
                      </p>
                      <p className="text-sm text-gray-600">
                        Receive notifications for important updates
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.notifications}
                      onChange={(e) =>
                        updateSetting("notifications", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                AI Features
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain size={20} className="text-gray-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        AI Suggestions
                      </p>
                      <p className="text-sm text-gray-600">
                        Enable AI-powered recommendations
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.aiEnabled}
                      onChange={(e) =>
                        updateSetting("aiEnabled", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save size={20} />
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
