"use client";
import React, { useState, useEffect, useRef } from "react";
import { useNotes } from "@/contexts/NotesContext";
import toast from "react-hot-toast";
import {
  Save,
  Plus,
  FileText,
  Trash2,
  Edit3,
  Clock,
  Wifi,
  WifiOff,
  Search,
  X,
  Filter,
} from "lucide-react";
import MarkdownEditor from "@/components/MarkdownEditor";
import FolderTree from "@/components/FolderTree";
import TagSelector from "@/components/TagSelector";
import VersionHistory from "@/components/VersionHistory";

const NotesPage = () => {
  const {
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
  } = useNotes();

  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilterTag, setSelectedFilterTag] = useState(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versionHistoryNoteId, setVersionHistoryNoteId] = useState(null);

  const autoSaveTimeoutRef = useRef(null);
  const lastSavedContentRef = useRef("");

  // Auto-save functionality
  useEffect(() => {
    if (editingNote && (title || content)) {
      // Clear existing timeout
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      // Set new timeout for auto-save
      autoSaveTimeoutRef.current = setTimeout(() => {
        if (title.trim() && content.trim()) {
          // Only save if content has changed
          const currentContent = title + content;
          if (currentContent !== lastSavedContentRef.current) {
            handleSaveNote(true);
            lastSavedContentRef.current = currentContent;
          }
        }
      }, 3000); // Auto-save after 3 seconds of inactivity
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [title, content, editingNote]);

  // Get all unique tags
  const allTags = [...new Set(notes.flatMap((note) => note.tags || []))];

  const handleSaveNote = async (isAutoSave = false) => {
    if (!title.trim() || !content.trim()) {
      if (!isAutoSave) {
        toast.error("Please fill in title and content");
      }
      return;
    }

    // Save version history before updating
    if (editingNote) {
      await saveVersion(editingNote.id, editingNote.content, editingNote.title);
    }

    const success = await saveNote({
      id: editingNote?.id,
      title: title.trim(),
      content: content.trim(),
      tags: selectedTags,
      folderId: selectedFolder,
      createdAt: editingNote?.createdAt,
    });

    if (success && !isAutoSave) {
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedTags([]);
    setIsCreating(false);
    setEditingNote(null);
    lastSavedContentRef.current = "";
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setSelectedTags(note.tags || []);
    setSelectedFolder(note.folderId || null);
    setIsCreating(true);
    lastSavedContentRef.current = note.title + note.content;
  };

  const handleDeleteNote = async (noteId) => {
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteNote(noteId);
      if (editingNote?.id === noteId) {
        resetForm();
      }
    }
  };

  const handleCreateFolder = async (folderData) => {
    await createFolder(folderData);
  };

  const handleDeleteFolder = async (folderId) => {
    if (
      confirm(
        "Are you sure you want to delete this folder? Notes in this folder won't be deleted."
      )
    ) {
      await deleteFolder(folderId);
    }
  };

  const handleRestoreVersion = async (version) => {
    setTitle(version.title);
    setContent(version.content);
    setShowVersionHistory(false);
    toast.success("Version restored! Click Save to apply changes.");
  };

  const openVersionHistory = (noteId) => {
    setVersionHistoryNoteId(noteId);
    setShowVersionHistory(true);
  };

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFolder =
      selectedFolder === null || note.folderId === selectedFolder;

    const matchesTag =
      !selectedFilterTag || note.tags?.includes(selectedFilterTag);

    return matchesSearch && matchesFolder && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              My Notes
              {!isOnline && (
                <span className="flex items-center gap-2 text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  <WifiOff size={16} />
                  Offline Mode
                </span>
              )}
              {isOnline && (
                <span className="flex items-center gap-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <Wifi size={16} />
                  Online
                </span>
              )}
            </h1>
            <p className="text-gray-600">
              Capture your thoughts with markdown support & version history
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={20} />
            New Note
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <FolderTree
              folders={folders}
              selectedFolder={selectedFolder}
              onSelectFolder={setSelectedFolder}
              onCreateFolder={handleCreateFolder}
              onDeleteFolder={handleDeleteFolder}
            />

            {/* Tags Filter */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Filter className="text-pink-600" size={20} />
                Filter by Tag
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFilterTag(null)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                    selectedFilterTag === null
                      ? "bg-pink-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      setSelectedFilterTag(
                        tag === selectedFilterTag ? null : tag
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                      selectedFilterTag === tag
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes by title or content..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Note Editor */}
            {isCreating && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  {editingNote ? "Edit Note" : "Create New Note"}
                  {editingNote && (
                    <button
                      onClick={() => openVersionHistory(editingNote.id)}
                      className="ml-4 text-sm text-pink-600 hover:text-pink-700 inline-flex items-center gap-1"
                    >
                      <Clock size={16} />
                      View History
                    </button>
                  )}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter note title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <TagSelector
                      selectedTags={selectedTags}
                      onChange={setSelectedTags}
                      availableTags={allTags}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content (Markdown supported)
                    </label>
                    <div className="h-96">
                      <MarkdownEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Write your note here... Use Markdown for formatting"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSaveNote(false)}
                      disabled={loading}
                      className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Save size={20} />
                      {loading
                        ? "Saving..."
                        : editingNote
                        ? "Update Note"
                        : "Save Note"}
                    </button>
                    <button
                      onClick={resetForm}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 relative group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="text-pink-600" size={24} />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="p-2 hover:bg-pink-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <Edit3 size={16} className="text-pink-600" />
                      </button>
                      <button
                        onClick={() => openVersionHistory(note.id)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <Clock size={16} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {note.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {note.tags?.length > 3 && (
                      <span className="text-gray-500 text-xs">
                        +{note.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    Updated: {new Date(note.updatedAt).toLocaleDateString()} at{" "}
                    {new Date(note.updatedAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredNotes.length === 0 && !isCreating && (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {searchQuery || selectedFilterTag
                    ? "No notes found"
                    : "No notes yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || selectedFilterTag
                    ? "Try adjusting your search or filters"
                    : "Start capturing your thoughts and ideas"}
                </p>
                {!searchQuery && !selectedFilterTag && (
                  <button
                    onClick={() => setIsCreating(true)}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Plus size={20} />
                    Create Your First Note
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Version History Modal */}
        {showVersionHistory && (
          <VersionHistory
            noteId={versionHistoryNoteId}
            getVersionHistory={getVersionHistory}
            onRestore={handleRestoreVersion}
            onClose={() => setShowVersionHistory(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NotesPage;
