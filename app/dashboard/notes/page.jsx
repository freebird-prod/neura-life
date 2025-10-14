"use client";
import React, { useState } from "react";
import { useNotes } from "@/contexts/NotesContext";
import toast from "react-hot-toast";
import { Save, Plus, Tag, FileText } from "lucide-react";

const NotesPage = () => {
  const { notes, loading, saveNote } = useNotes();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSaveNote = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in title and content");
      return;
    }

    const success = await saveNote({
      title: title.trim(),
      content: content.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    });

    if (success) {
      setTitle("");
      setContent("");
      setTags("");
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Notes</h1>
            <p className="text-gray-600">
              Capture your thoughts, ideas, and insights
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={20} />
            New Note
          </button>
        </div>

        {isCreating && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Create New Note
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
                  Tags (comma-separated)
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="work, ideas, personal..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content (Markdown supported)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono text-sm"
                  placeholder="Write your note here... Use Markdown for formatting"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSaveNote}
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save size={20} />
                  {loading ? "Saving..." : "Save Note"}
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <FileText className="text-pink-600" size={24} />
                <div className="flex flex-wrap gap-1">
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
                      +{note.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {note.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {note.content}
              </p>
              <div className="text-xs text-gray-500">
                {new Date(note.createdAt.seconds * 1000).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && !isCreating && (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No notes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start capturing your thoughts and ideas
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus size={20} />
              Create Your First Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
