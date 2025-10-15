"use client";
import React, { useState } from "react";
import {
  Folder,
  FolderPlus,
  ChevronRight,
  ChevronDown,
  Edit2,
  Trash2,
  FolderOpen,
} from "lucide-react";

const FolderTree = ({
  folders,
  selectedFolder,
  onSelectFolder,
  onCreateFolder,
  onDeleteFolder,
}) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [newFolderName, setNewFolderName] = useState("");
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [parentFolder, setParentFolder] = useState(null);

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;

    await onCreateFolder({
      name: newFolderName.trim(),
      parentId: parentFolder,
    });

    setNewFolderName("");
    setShowNewFolder(false);
    setParentFolder(null);
  };

  const buildFolderTree = (parentId = null) => {
    return folders
      .filter((folder) => folder.parentId === parentId)
      .map((folder) => ({
        ...folder,
        children: buildFolderTree(folder.id),
      }));
  };

  const renderFolder = (folder, level = 0) => {
    const isExpanded = expandedFolders.has(folder.id);
    const isSelected = selectedFolder === folder.id;
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
            isSelected
              ? "bg-pink-100 text-pink-700"
              : "hover:bg-gray-100 text-gray-700"
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          <button
            onClick={() => hasChildren && toggleFolder(folder.id)}
            className="p-0.5 cursor-pointer"
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )
            ) : (
              <span className="w-4" />
            )}
          </button>
          <div
            onClick={() => onSelectFolder(folder.id)}
            className="flex items-center gap-2 flex-1"
          >
            {isExpanded ? <FolderOpen size={18} /> : <Folder size={18} />}
            <span className="text-sm font-medium">{folder.name}</span>
          </div>
          <button
            onClick={() => onDeleteFolder(folder.id)}
            className="p-1 hover:bg-red-100 rounded transition-colors cursor-pointer"
          >
            <Trash2 size={14} className="text-red-600" />
          </button>
        </div>
        {isExpanded && hasChildren && (
          <div>
            {folder.children.map((child) => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const folderTree = buildFolderTree();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Folder className="text-pink-600" size={20} />
          Folders
        </h3>
        <button
          onClick={() => setShowNewFolder(true)}
          className="p-1.5 hover:bg-pink-100 rounded-lg transition-colors cursor-pointer"
        >
          <FolderPlus size={18} className="text-pink-600" />
        </button>
      </div>

      <div
        onClick={() => onSelectFolder(null)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer mb-2 transition-colors ${
          selectedFolder === null
            ? "bg-pink-100 text-pink-700"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <FolderOpen size={18} />
        <span className="text-sm font-medium">All Notes</span>
      </div>

      {showNewFolder && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New folder name..."
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && handleCreateFolder()}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreateFolder}
              className="flex-1 bg-pink-600 text-white px-3 py-1.5 rounded text-sm hover:bg-pink-700 transition-colors cursor-pointer"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowNewFolder(false);
                setNewFolderName("");
              }}
              className="flex-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-1 max-h-96 overflow-y-auto">
        {folderTree.map((folder) => renderFolder(folder))}
      </div>

      {folderTree.length === 0 && !showNewFolder && (
        <div className="text-center py-8 text-gray-500 text-sm">
          No folders yet. Create one to organize your notes.
        </div>
      )}
    </div>
  );
};

export default FolderTree;
