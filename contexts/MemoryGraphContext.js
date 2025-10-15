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

const MemoryGraphContext = createContext();

export const useMemoryGraph = () => {
  const context = useContext(MemoryGraphContext);
  if (!context) {
    throw new Error("useMemoryGraph must be used within a MemoryGraphProvider");
  }
  return context;
};

export const MemoryGraphProvider = ({ children }) => {
  const { user } = useAuth();
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const q = query(
        collection(db, "memory-graph"),
        where("userId", "==", user.id)
      );
      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const graphDataList = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
          setGraphData(graphDataList);
        },
        (error) => {
          console.error("Error listening to graph data:", error);
          toast.error("Failed to load memory graph");
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

  const saveGraphNode = async (nodeData) => {
    setLoading(true);
    try {
      const data = {
        ...nodeData,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, "memory-graph"), data);
      toast.success("Graph node saved successfully!");
      return true;
    } catch (error) {
      console.error("Error saving graph node:", error);
      toast.error("Failed to save graph node");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <MemoryGraphContext.Provider
      value={{
        graphData,
        loading,
        saveGraphNode,
      }}
    >
      {children}
    </MemoryGraphContext.Provider>
  );
};
