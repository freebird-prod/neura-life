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
    if (user) {
      fetchInsights();
    }
  }, [user]);

  const fetchInsights = async () => {
    try {
      const q = query(
        collection(db, "ai-insights"),
        where("userId", "==", user.id),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const insightsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInsights(insightsData);
    } catch (error) {
      console.error("Error fetching insights:", error);
      toast.error("Failed to load insights");
    }
  };

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
      fetchInsights();
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
        fetchInsights,
      }}
    >
      {children}
    </AIInsightsContext.Provider>
  );
};
