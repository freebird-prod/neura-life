"use client";
import React, { useState, useEffect } from "react";
import { Clock, RotateCcw, X } from "lucide-react";
import { diffLines } from "diff";

const VersionHistory = ({ noteId, getVersionHistory, onRestore, onClose }) => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [currentContent, setCurrentContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVersions();
  }, [noteId]);

  const loadVersions = async () => {
    setLoading(true);
    try {
      const versionData = await getVersionHistory(noteId);
      setVersions(versionData);
    } catch (error) {
      console.error("Error loading versions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = (version) => {
    if (
      confirm(
        "Are you sure you want to restore this version? Your current content will be saved as a new version."
      )
    ) {
      onRestore(version);
    }
  };

  const renderDiff = (oldContent, newContent) => {
    const diff = diffLines(oldContent || "", newContent || "");

    return (
      <div className="font-mono text-sm bg-gray-50 p-4 rounded-lg overflow-x-auto">
        {diff.map((part, index) => {
          const bgColor = part.added
            ? "bg-green-100 text-green-800"
            : part.removed
            ? "bg-red-100 text-red-800"
            : "";

          return (
            <div key={index} className={bgColor}>
              {part.value.split("\n").map((line, lineIndex) => (
                <div key={lineIndex} className="whitespace-pre-wrap">
                  {part.added && "+ "}
                  {part.removed && "- "}
                  {!part.added && !part.removed && "  "}
                  {line}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Clock className="text-pink-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">
              Version History
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          <div className="w-1/3 border-r overflow-y-auto p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Versions</h3>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : versions.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No version history yet
              </div>
            ) : (
              <div className="space-y-2">
                {versions.map((version, index) => (
                  <div
                    key={version.id}
                    onClick={() => setSelectedVersion(version)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedVersion?.id === version.id
                        ? "bg-pink-100 border-2 border-pink-300"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-pink-600">
                        Version {versions.length - index}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestore(version);
                        }}
                        className="p-1 hover:bg-pink-200 rounded transition-colors cursor-pointer"
                        title="Restore this version"
                      >
                        <RotateCcw size={14} className="text-pink-600" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-600">
                      {new Date(version.createdAt).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-900 mt-1 truncate">
                      {version.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {selectedVersion ? (
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedVersion.title}
                  </h3>
                  <div className="text-sm text-gray-600">
                    Created:{" "}
                    {new Date(selectedVersion.createdAt).toLocaleString()}
                  </div>
                </div>

                {currentContent && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Changes from current version:
                    </h4>
                    {renderDiff(selectedVersion.content, currentContent)}
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Content:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                    {selectedVersion.content}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a version to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;
