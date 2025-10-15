"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import {
  saveNoteToIndexedDB,
  getNotesFromIndexedDB,
  getNoteByIdFromIndexedDB,
  deleteNoteFromIndexedDB,
  getUnsyncedNotes,
  markNoteAsSynced,
  saveVersionToIndexedDB,
  getVersionsForNote,
  saveFolderToIndexedDB,
  getFoldersFromIndexedDB,
  deleteFolderFromIndexedDB,
} from "@/lib/indexedDB";

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
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const syncTimeoutRef = useRef(null);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Back online - syncing notes...");
      syncOfflineNotes();
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You're offline - changes will be saved locally");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Load notes from IndexedDB on mount
  useEffect(() => {
    const loadOfflineNotes = async () => {
      if (user) {
        const offlineNotes = await getNotesFromIndexedDB(user.id);
        if (offlineNotes.length > 0) {
          setNotes(offlineNotes);
        }
      }
    };
    loadOfflineNotes();
  }, [user]);

  // Sync with Firebase
  useEffect(() => {
    let unsubscribe;

    if (user && isOnline) {
      const q = query(collection(db, "notes"), where("userId", "==", user.id));
      unsubscribe = onSnapshot(
        q,
        async (querySnapshot) => {
          const notesData = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt:
                doc.data().createdAt?.toDate?.() ||
                new Date(doc.data().createdAt),
              updatedAt:
                doc.data().updatedAt?.toDate?.() ||
                new Date(doc.data().updatedAt),
            }))
            .sort((a, b) => b.updatedAt - a.updatedAt);

          setNotes(notesData);

          // Save to IndexedDB
          for (const note of notesData) {
            await saveNoteToIndexedDB({ ...note, synced: true });
          }
        },
        (error) => {
          console.error("Error listening to notes:", error);
          toast.error("Failed to sync notes from server");
        }
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, isOnline]);

  // Load folders
  useEffect(() => {
    const loadFolders = async () => {
      if (user) {
        if (isOnline) {
          const q = query(
            collection(db, "folders"),
            where("userId", "==", user.id)
          );
          const querySnapshot = await getDocs(q);
          const foldersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFolders(foldersData);

          // Save to IndexedDB
          for (const folder of foldersData) {
            await saveFolderToIndexedDB({ ...folder, synced: true });
          }
        } else {
          const offlineFolders = await getFoldersFromIndexedDB(user.id);
          setFolders(offlineFolders);
        }
      }
    };
    loadFolders();
  }, [user, isOnline]);

  // Sync offline notes to Firebase
  const syncOfflineNotes = async () => {
    try {
      const unsyncedNotes = await getUnsyncedNotes();
      for (const note of unsyncedNotes) {
        if (note.id.startsWith("temp-")) {
          // New note created offline
          const { id, synced, ...noteData } = note;
          const docRef = await addDoc(collection(db, "notes"), {
            ...noteData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          await deleteNoteFromIndexedDB(id);
          await saveNoteToIndexedDB({
            ...noteData,
            id: docRef.id,
            synced: true,
          });
        } else {
          // Updated note
          await updateDoc(doc(db, "notes", note.id), {
            ...note,
            updatedAt: serverTimestamp(),
          });
          await markNoteAsSynced(note.id);
        }
      }
      if (unsyncedNotes.length > 0) {
        toast.success(`Synced ${unsyncedNotes.length} notes`);
      }
    } catch (error) {
      console.error("Error syncing notes:", error);
      toast.error("Failed to sync some notes");
    }
  };

  const saveNote = async (noteData) => {
    setLoading(true);
    try {
      const now = new Date();
      const noteId = noteData.id || `temp-${Date.now()}`;
      const data = {
        ...noteData,
        id: noteId,
        userId: user.id,
        createdAt: noteData.createdAt || now,
        updatedAt: now,
        folderId: noteData.folderId || null,
        tags: noteData.tags || [],
      };

      // Save to IndexedDB first (offline support)
      await saveNoteToIndexedDB(data);

      // If online, sync to Firebase
      if (isOnline) {
        if (noteData.id && !noteData.id.startsWith("temp-")) {
          // Update existing note
          await updateDoc(doc(db, "notes", noteData.id), {
            ...data,
            updatedAt: serverTimestamp(),
          });
          await markNoteAsSynced(noteData.id);
        } else {
          // Create new note
          const docRef = await addDoc(collection(db, "notes"), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          await deleteNoteFromIndexedDB(noteId);
          await saveNoteToIndexedDB({ ...data, id: docRef.id, synced: true });
        }
      }

      toast.success(
        isOnline ? "Note saved successfully!" : "Note saved offline"
      );
      return true;
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await deleteNoteFromIndexedDB(noteId);
      if (isOnline && !noteId.startsWith("temp-")) {
        await deleteDoc(doc(db, "notes", noteId));
      }
      toast.success("Note deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
      return false;
    }
  };

  const createFolder = async (folderData) => {
    try {
      const folderId = `temp-${Date.now()}`;
      const data = {
        ...folderData,
        id: folderId,
        userId: user.id,
        createdAt: new Date(),
      };

      await saveFolderToIndexedDB(data);

      if (isOnline) {
        const docRef = await addDoc(collection(db, "folders"), {
          ...data,
          createdAt: serverTimestamp(),
        });
        await deleteFolderFromIndexedDB(folderId);
        await saveFolderToIndexedDB({ ...data, id: docRef.id, synced: true });
      }

      toast.success("Folder created successfully!");
      return true;
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder");
      return false;
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      await deleteFolderFromIndexedDB(folderId);
      if (isOnline && !folderId.startsWith("temp-")) {
        await deleteDoc(doc(db, "folders", folderId));
      }
      toast.success("Folder deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Failed to delete folder");
      return false;
    }
  };

  const saveVersion = async (noteId, content, title) => {
    try {
      const version = {
        noteId,
        content,
        title,
        createdAt: new Date(),
      };
      await saveVersionToIndexedDB(version);
      return true;
    } catch (error) {
      console.error("Error saving version:", error);
      return false;
    }
  };

  const getVersionHistory = async (noteId) => {
    try {
      return await getVersionsForNote(noteId);
    } catch (error) {
      console.error("Error getting version history:", error);
      return [];
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        folders,
        loading,
        isOnline,
        saveNote,
        deleteNote,
        createFolder,
        deleteFolder,
        saveVersion,
        getVersionHistory,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
