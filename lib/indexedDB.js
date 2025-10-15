import { openDB } from "idb";

const DB_NAME = "neura-life-notes";
const DB_VERSION = 1;
const NOTES_STORE = "notes";
const VERSIONS_STORE = "versions";
const FOLDERS_STORE = "folders";

// Initialize IndexedDB
export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Notes store
      if (!db.objectStoreNames.contains(NOTES_STORE)) {
        const notesStore = db.createObjectStore(NOTES_STORE, {
          keyPath: "id",
        });
        notesStore.createIndex("userId", "userId");
        notesStore.createIndex("folderId", "folderId");
        notesStore.createIndex("tags", "tags", { multiEntry: true });
        notesStore.createIndex("updatedAt", "updatedAt");
        notesStore.createIndex("synced", "synced");
      }

      // Versions store for version history
      if (!db.objectStoreNames.contains(VERSIONS_STORE)) {
        const versionsStore = db.createObjectStore(VERSIONS_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        versionsStore.createIndex("noteId", "noteId");
        versionsStore.createIndex("createdAt", "createdAt");
      }

      // Folders store
      if (!db.objectStoreNames.contains(FOLDERS_STORE)) {
        const foldersStore = db.createObjectStore(FOLDERS_STORE, {
          keyPath: "id",
        });
        foldersStore.createIndex("userId", "userId");
        foldersStore.createIndex("parentId", "parentId");
      }
    },
  });
};

// Notes operations
export const saveNoteToIndexedDB = async (note) => {
  const db = await initDB();
  const tx = db.transaction(NOTES_STORE, "readwrite");
  await tx.store.put({ ...note, synced: false });
  await tx.done;
};

export const getNotesFromIndexedDB = async (userId) => {
  const db = await initDB();
  const allNotes = await db.getAllFromIndex(NOTES_STORE, "userId", userId);
  return allNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

export const getNoteByIdFromIndexedDB = async (noteId) => {
  const db = await initDB();
  return await db.get(NOTES_STORE, noteId);
};

export const deleteNoteFromIndexedDB = async (noteId) => {
  const db = await initDB();
  await db.delete(NOTES_STORE, noteId);
};

export const getUnsyncedNotes = async () => {
  const db = await initDB();
  const allNotes = await db.getAll(NOTES_STORE);
  return allNotes.filter((note) => !note.synced);
};

export const markNoteAsSynced = async (noteId) => {
  const db = await initDB();
  const note = await db.get(NOTES_STORE, noteId);
  if (note) {
    note.synced = true;
    await db.put(NOTES_STORE, note);
  }
};

// Version history operations
export const saveVersionToIndexedDB = async (version) => {
  const db = await initDB();
  const tx = db.transaction(VERSIONS_STORE, "readwrite");
  await tx.store.add(version);
  await tx.done;
};

export const getVersionsForNote = async (noteId) => {
  const db = await initDB();
  const allVersions = await db.getAllFromIndex(
    VERSIONS_STORE,
    "noteId",
    noteId
  );
  return allVersions.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const deleteVersionsForNote = async (noteId) => {
  const db = await initDB();
  const versions = await db.getAllFromIndex(VERSIONS_STORE, "noteId", noteId);
  const tx = db.transaction(VERSIONS_STORE, "readwrite");
  for (const version of versions) {
    await tx.store.delete(version.id);
  }
  await tx.done;
};

// Folder operations
export const saveFolderToIndexedDB = async (folder) => {
  const db = await initDB();
  await db.put(FOLDERS_STORE, { ...folder, synced: false });
};

export const getFoldersFromIndexedDB = async (userId) => {
  const db = await initDB();
  return await db.getAllFromIndex(FOLDERS_STORE, "userId", userId);
};

export const deleteFolderFromIndexedDB = async (folderId) => {
  const db = await initDB();
  await db.delete(FOLDERS_STORE, folderId);
};

// Clear all data (useful for logout)
export const clearIndexedDB = async () => {
  const db = await initDB();
  await db.clear(NOTES_STORE);
  await db.clear(VERSIONS_STORE);
  await db.clear(FOLDERS_STORE);
};
