"use client";
import React, { useState } from "react";
import { useMemoryGraph } from "@/contexts/MemoryGraphContext";
import toast from "react-hot-toast";
import { Save, Plus, Network, Link } from "lucide-react";

const MemoryGraphPage = () => {
  const { graphData, loading, saveGraphNode } = useMemoryGraph();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [connections, setConnections] = useState("");

  const handleSaveNode = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in title and content");
      return;
    }

    const success = await saveGraphNode({
      title: title.trim(),
      content: content.trim(),
      connections: connections
        .split(",")
        .map((conn) => conn.trim())
        .filter((conn) => conn),
    });

    if (success) {
      setTitle("");
      setContent("");
      setConnections("");
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Memory Graph
            </h1>
            <p className="text-gray-600">
              Visualize connections between your thoughts
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            New Node
          </button>
        </div>

        {isCreating && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Add Graph Node
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
                  placeholder="Enter node title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter node content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Connections (comma-separated)
                </label>
                <input
                  type="text"
                  value={connections}
                  onChange={(e) => setConnections(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Related concepts, ideas..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSaveNode}
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={20} />
                  {loading ? "Saving..." : "Save Node"}
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {graphData.map((node) => (
            <div
              key={node.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <Network className="text-pink-600" size={24} />
                <div className="flex flex-wrap gap-1">
                  {node.connections?.slice(0, 2).map((conn, index) => (
                    <span
                      key={index}
                      className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      <Link size={10} />
                      {conn}
                    </span>
                  ))}
                  {node.connections?.length > 2 && (
                    <span className="text-gray-500 text-xs">
                      +{node.connections.length - 2}
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {node.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{node.content}</p>
              <div className="text-xs text-gray-500">
                {new Date(node.createdAt.seconds * 1000).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {graphData.length === 0 && !isCreating && (
          <div className="text-center py-12">
            <Network className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No nodes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start building your knowledge graph
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Create Your First Node
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGraphPage;
