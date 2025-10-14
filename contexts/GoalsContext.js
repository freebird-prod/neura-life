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

const GoalsContext = createContext();

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
};

export const GoalsProvider = ({ children }) => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    try {
      const q = query(collection(db, "goals"), where("userId", "==", user.id));
      const querySnapshot = await getDocs(q);
      const goalsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setGoals(goalsData);
    } catch (error) {
      console.error("Error fetching goals:", error);
      toast.error("Failed to load goals");
    }
  };

  const saveGoal = async (goalData) => {
    setLoading(true);
    try {
      const data = {
        ...goalData,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, "goals"), data);
      toast.success("Goal saved successfully!");
      fetchGoals();
      return true;
    } catch (error) {
      console.error("Error saving goal:", error);
      toast.error("Failed to save goal");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        loading,
        saveGoal,
        fetchGoals,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
