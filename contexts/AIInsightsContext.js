"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const AIInsightsContext = createContext();

export const useAIInsights = () => {
  const context = useContext(AIInsightsContext);
  if (!context) {
    throw new Error("useAIInsights must be used within an AIInsightsProvider");
  }
  return context;
};

export const AIInsightsProvider = ({ children }) => {
  const { user } = useAuth();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const q = query(
        collection(db, "ai-insights"),
        where("userId", "==", user.id)
      );
      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const insightsData = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
          setInsights(insightsData);
        },
        (error) => {
          console.error("Error listening to insights:", error);
          toast.error("Failed to load AI insights");
        }
      );
    }

    // Cleanup function to unsubscribe from the listener
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const saveInsight = async (insightData) => {
    setLoading(true);
    try {
      const data = {
        ...insightData,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, "ai-insights"), data);
      toast.success("Insight saved successfully!");
      return true;
    } catch (error) {
      console.error("Error saving insight:", error);
      toast.error("Failed to save insight");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AIInsightsContext.Provider
      value={{
        insights,
        loading,
        saveInsight,
      }}
    >
      {children}
    </AIInsightsContext.Provider>
  );
};
