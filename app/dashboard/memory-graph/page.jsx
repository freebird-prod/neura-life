"use client";
import React, { useState } from "react";
import { useMemoryGraph } from "@/contexts/MemoryGraphContext";
import toast from "react-hot-toast";
import {
  Save,
  Plus,
  Network,
  Link,
  List,
  Eye,
  Edit,
  Trash2,
  Info,
  Lightbulb,
  X,
} from "lucide-react";
import GraphVisualization from "@/components/GraphVisualization";

const MemoryGraphPage = () => {
  const {
    graphData,
    loading,
    saveGraphNode,
    updateGraphNode,
    deleteGraphNode,
  } = useMemoryGraph();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [connections, setConnections] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" or "graph"
  const [editingNode, setEditingNode] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

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

  const handleEditNode = (node) => {
    setEditingNode(node);
    setTitle(node.title);
    setContent(node.content);
    setConnections(node.connections?.join(", ") || "");
    setIsCreating(true);
  };

  const handleUpdateNode = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in title and content");
      return;
    }

    const success = await updateGraphNode(editingNode.id, {
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
      setEditingNode(null);
    }
  };

  const handleDeleteNode = async (nodeId) => {
    if (window.confirm("Are you sure you want to delete this node?")) {
      await deleteGraphNode(nodeId);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingNode(null);
    setTitle("");
    setContent("");
    setConnections("");
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
              Visualize connections between your thoughts and ideas
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
              title="Toggle usage guide"
            >
              <Info size={18} />
              Guide
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List size={16} />
                List
              </button>
              <button
                onClick={() => setViewMode("graph")}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors cursor-pointer ${
                  viewMode === "graph"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Network size={16} />
                Graph
              </button>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus size={20} />
              New Node
            </button>
          </div>
        </div>

        {/* User Guide Section */}
        {showGuide && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="text-blue-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  How to Use Memory Graph
                </h2>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Create Nodes</p>
                  <p className="text-sm text-gray-600">
                    Click "New Node" to add thoughts, ideas, or concepts. Each
                    node represents a piece of knowledge.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Add Connections</p>
                  <p className="text-sm text-gray-600">
                    Use keywords or tags in the "Connections" field to link
                    related nodes. Separate multiple connections with commas
                    (e.g., "AI, machine learning, productivity").
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">View as List or Graph</p>
                  <p className="text-sm text-gray-600">
                    Switch between List view (cards) and Graph view (network
                    visualization) to see your knowledge structure. In Graph
                    view, nodes with matching connections will be linked
                    automatically.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium">Interact with the Graph</p>
                  <p className="text-sm text-gray-600">
                    In Graph view, click on nodes to see details, drag them to
                    rearrange, and zoom in/out to explore your memory network.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800 flex items-start gap-2">
                  <Info size={16} className="flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Pro Tip:</strong> Use consistent connection keywords
                    across multiple nodes to build a rich, interconnected
                    knowledge graph. The more connections you add, the more
                    powerful your graph becomes!
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {isCreating && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              {editingNode ? "Edit Graph Node" : "Add Graph Node"}
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
                  Connections (comma-separated keywords/tags)
                </label>
                <input
                  type="text"
                  value={connections}
                  onChange={(e) => setConnections(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., productivity, AI, learning, health"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Add keywords that describe this node. Nodes with matching
                  keywords will be connected in the graph view.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={editingNode ? handleUpdateNode : handleSaveNode}
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save size={20} />
                  {loading
                    ? "Saving..."
                    : editingNode
                    ? "Update Node"
                    : "Save Node"}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {viewMode === "graph" ? (
          <div className="mb-8">
            {loading ? (
              <div className="bg-white rounded-xl shadow-lg p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading graph...</p>
                </div>
              </div>
            ) : graphData.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Network className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No nodes in your graph yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first node to start building your memory graph
                </p>
              </div>
            ) : (
              <GraphVisualization
                graphData={graphData}
                onNodeClick={(node) => {
                  // Handle node click - could open a modal or navigate to detail view
                  console.log("Node clicked:", node);
                  toast.success(`Viewing: ${node.name}`);
                }}
              />
            )}
          </div>
        ) : (
          <>
            {graphData.length > 0 && (
              <div className="mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <Network className="text-pink-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {graphData.length}{" "}
                        {graphData.length === 1 ? "Node" : "Nodes"} in your
                        graph
                      </p>
                      <p className="text-xs text-gray-500">
                        {
                          graphData.filter((n) => n.connections?.length > 0)
                            .length
                        }{" "}
                        with connections
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewMode("graph")}
                    className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    View Graph →
                  </button>
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditNode(node)}
                        className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Edit node"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteNode(node.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete node"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {node.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{node.content}</p>
                  <div className="text-xs text-gray-500">
                    {new Date(
                      node.createdAt.seconds * 1000
                    ).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

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
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer"
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
