"use client";
import React, { useState, useEffect } from "react";
import { Wifi, WifiOff, RefreshCw, Check } from "lucide-react";

/**
 * SyncStatus Component
 *
 * A visual indicator that shows users when data is syncing in real-time.
 * Can be placed in the dashboard layout or individual pages.
 *
 * Usage:
 * <SyncStatus />
 */
const SyncStatus = ({ className = "" }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsSyncing(true);
      // Simulate sync completion
      setTimeout(() => {
        setIsSyncing(false);
        setLastSync(new Date());
      }, 1000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsSyncing(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Update last sync time periodically when online
  useEffect(() => {
    if (isOnline) {
      const interval = setInterval(() => {
        setLastSync(new Date());
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isOnline]);

  const getTimeSinceSync = () => {
    const seconds = Math.floor((new Date() - lastSync) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  if (!isOnline) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs ${className}`}
      >
        <WifiOff className="text-red-600" size={14} />
        <span className="text-red-700 font-medium">Offline</span>
        <span className="text-red-600">- Changes saved locally</span>
      </div>
    );
  }

  if (isSyncing) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs ${className}`}
      >
        <RefreshCw className="text-blue-600 animate-spin" size={14} />
        <span className="text-blue-700 font-medium">Syncing...</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs ${className}`}
      title="Real-time sync active"
    >
      <div className="relative">
        <Wifi className="text-green-600" size={14} />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
      <span className="text-green-700 font-medium">Live</span>
      <span className="text-green-600">• Synced {getTimeSinceSync()}</span>
    </div>
  );
};

export default SyncStatus;
