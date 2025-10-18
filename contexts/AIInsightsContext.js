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
  doc,
  deleteDoc,
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

  const generateInsight = async (prompt, category = "General") => {
    setLoading(true);
    const loadingToast = toast.loading("🤖 AI is generating your insight...");

    try {
      const response = await fetch("/api/generate-insight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate insight");
      }

      // Save the generated insight to Firestore
      toast.dismiss(loadingToast);
      const saveToast = toast.loading("💾 Saving to database...");

      const success = await saveInsight(data.insight);
      toast.dismiss(saveToast);

      if (success) {
        toast.success("✨ AI insight generated successfully!", {
          duration: 2500,
        });
        return data.insight;
      } else {
        throw new Error("Failed to save generated insight");
      }
    } catch (error) {
      console.error("Error generating insight:", error);
      toast.dismiss(loadingToast);
      toast.error(`❌ ${error.message}`, {
        duration: 4000,
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const saveInsight = async (insightData) => {
    try {
      const data = {
        ...insightData,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, "ai-insights"), data);
      return true;
    } catch (error) {
      console.error("Error saving insight:", error);
      throw error;
    }
  };

  const deleteInsight = async (insightId) => {
    try {
      await deleteDoc(doc(db, "ai-insights", insightId));
      toast.success("🗑️ Insight deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting insight:", error);
      toast.error("❌ Failed to delete insight");
      return false;
    }
  };

  return (
    <AIInsightsContext.Provider
      value={{
        insights,
        loading,
        saveInsight,
        generateInsight,
        deleteInsight,
      }}
    >
      {children}
    </AIInsightsContext.Provider>
  );
};
