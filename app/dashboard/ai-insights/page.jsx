"use client";
import React, { useState } from "react";
import { useAIInsights } from "@/contexts/AIInsightsContext";
import toast from "react-hot-toast";
import { Save, Plus, Brain, Lightbulb } from "lucide-react";

const AIInsightsPage = () => {
  const { insights, loading, saveInsight } = useAIInsights();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSaveInsight = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in title and content");
      return;
    }

    const success = await saveInsight({
      title: title.trim(),
      content: content.trim(),
      category: category.trim() || "General",
    });

    if (success) {
      setTitle("");
      setContent("");
      setCategory("");
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI Insights
            </h1>
            <p className="text-gray-600">AI-powered suggestions and insights</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            New Insight
          </button>
        </div>

        {isCreating && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Add AI Insight
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
                  placeholder="Enter insight title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., Productivity, Health, Learning..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter the AI insight..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSaveInsight}
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={20} />
                  {loading ? "Saving..." : "Save Insight"}
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
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <Brain className="text-pink-600" size={24} />
                <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                  {insight.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {insight.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{insight.content}</p>
              <div className="text-xs text-gray-500">
                {new Date(
                  insight.createdAt.seconds * 1000
                ).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {insights.length === 0 && !isCreating && (
          <div className="text-center py-12">
            <Lightbulb className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No insights yet
            </h3>
            <p className="text-gray-600 mb-6">
              AI suggestions will appear here
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Your First Insight
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPage;
