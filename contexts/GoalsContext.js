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
  updateDoc,
  deleteDoc,
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
    let unsubscribe;

    if (user) {
      const q = query(collection(db, "goals"), where("userId", "==", user.id));
      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const goalsData = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
          setGoals(goalsData);
        },
        (error) => {
          console.error("Error listening to goals:", error);
          toast.error("Failed to load goals");
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
      return true;
    } catch (error) {
      console.error("Error saving goal:", error);
      toast.error("Failed to save goal");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateGoal = async (goalId, goalData) => {
    setLoading(true);
    try {
      const goalRef = doc(db, "goals", goalId);
      await updateDoc(goalRef, {
        ...goalData,
        updatedAt: new Date(),
      });
      toast.success("Goal updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteGoal = async (goalId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "goals", goalId));
      toast.success("Goal deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast.error("Failed to delete goal");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleGoalCompletion = async (goalId, currentStatus) => {
    setLoading(true);
    try {
      const goalRef = doc(db, "goals", goalId);
      await updateDoc(goalRef, {
        completed: !currentStatus,
        updatedAt: new Date(),
        completedAt: !currentStatus ? new Date() : null,
      });
      toast.success(
        !currentStatus ? "Goal completed! 🎉" : "Goal marked as incomplete"
      );
      return true;
    } catch (error) {
      console.error("Error toggling goal completion:", error);
      toast.error("Failed to update goal status");
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
        updateGoal,
        deleteGoal,
        toggleGoalCompletion,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
