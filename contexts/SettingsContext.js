"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    aiEnabled: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      const settingsDoc = await getDoc(doc(db, "settings", user.id));
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data());
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    }
  };

  const saveSettings = async (newSettings) => {
    setLoading(true);
    try {
      await setDoc(doc(db, "settings", user.id), {
        ...settings,
        ...newSettings,
        updatedAt: new Date(),
      });
      setSettings((prev) => ({ ...prev, ...newSettings }));
      toast.success("Settings saved successfully!");
      return true;
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        saveSettings,
        fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
