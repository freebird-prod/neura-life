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

  const updateGraphNode = async (nodeId, nodeData) => {
    setLoading(true);
    try {
      const nodeRef = doc(db, "memory-graph", nodeId);
      await updateDoc(nodeRef, {
        ...nodeData,
        updatedAt: new Date(),
      });
      toast.success("Graph node updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating graph node:", error);
      toast.error("Failed to update graph node");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteGraphNode = async (nodeId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "memory-graph", nodeId));
      toast.success("Graph node deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting graph node:", error);
      toast.error("Failed to delete graph node");
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
        updateGraphNode,
        deleteGraphNode,
      }}
    >
      {children}
    </MemoryGraphContext.Provider>
  );
};
