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

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    try {
      const q = query(
        collection(db, "notes"),
        where("userId", "==", user.id),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const notesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to load notes");
    }
  };

  const saveNote = async (noteData) => {
    setLoading(true);
    try {
      const data = {
        ...noteData,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await addDoc(collection(db, "notes"), data);
      toast.success("Note saved successfully!");
      fetchNotes();
      return true;
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        saveNote,
        fetchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
