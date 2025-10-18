"use client";
import React, { useState } from "react";
import { useAIInsights } from "@/contexts/AIInsightsContext";
import toast from "react-hot-toast";
import { Save, Plus, Brain, Lightbulb, Sparkles, Trash2 } from "lucide-react";

const AIInsightsPage = () => {
  const { insights, loading, saveInsight, generateInsight, deleteInsight } =
    useAIInsights();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationPrompt, setGenerationPrompt] = useState("");
  const [generationCategory, setGenerationCategory] = useState("Productivity");

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

  const handleGenerateInsight = async () => {
    if (!generationPrompt.trim()) {
      toast.error("Please enter a prompt for AI generation");
      return;
    }

    setIsGenerating(true);
    const result = await generateInsight(
      generationPrompt.trim(),
      generationCategory
    );

    if (result) {
      setGenerationPrompt("");
      setGenerationCategory("Productivity");
      setIsGenerating(false);
    } else {
      setIsGenerating(false);
    }
  };

  const handleDeleteInsight = async (insightId) => {
    if (window.confirm("Are you sure you want to delete this insight?")) {
      await deleteInsight(insightId);
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
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={20} />
            New Insight
          </button>
        </div>

        {/* AI Generation Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-pink-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-900">
              Generate AI Insight
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like AI to help you with?
              </label>
              <input
                type="text"
                value={generationPrompt}
                onChange={(e) => setGenerationPrompt(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="e.g., How to improve my morning routine, Tips for better sleep..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={generationCategory}
                onChange={(e) => setGenerationCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="Productivity">Productivity</option>
                <option value="Health">Health</option>
                <option value="Learning">Learning</option>
                <option value="Mindfulness">Mindfulness</option>
                <option value="Relationships">Relationships</option>
                <option value="Career">Career</option>
                <option value="General">General</option>
              </select>
            </div>

            <button
              onClick={handleGenerateInsight}
              disabled={loading || isGenerating || !generationPrompt.trim()}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Sparkles size={20} />
              {isGenerating ? "Generating..." : "Generate AI Insight"}
            </button>
          </div>
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
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save size={20} />
                  {loading ? "Saving..." : "Save Insight"}
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
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 ${
                insight.generated ? "border-purple-500" : "border-pink-500"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {insight.generated ? (
                    <Sparkles className="text-purple-600" size={24} />
                  ) : (
                    <Brain className="text-pink-600" size={24} />
                  )}
                  {insight.generated && (
                    <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      AI Generated
                    </span>
                  )}
                </div>
                <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full font-medium">
                  {insight.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                {insight.title}
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed mb-4">
                {insight.content.split("\n").map((line, index) => (
                  <div key={index} className="mb-2">
                    {line.trim() &&
                      (line.match(/^[✨🎯💡⚠️🔑•]/) ? (
                        <div className="flex items-start gap-2">
                          <span className="text-base mt-0.5">
                            {line.charAt(0)}
                          </span>
                          <span className="flex-1">
                            {line.substring(1).trim()}
                          </span>
                        </div>
                      ) : (
                        <p>{line}</p>
                      ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  {new Date(
                    insight.createdAt.seconds * 1000
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  {insight.generated && (
                    <div className="text-xs text-purple-600 font-medium">
                      ✨ Powered by AI
                    </div>
                  )}
                  <button
                    onClick={() => handleDeleteInsight(insight.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                    title="Delete insight"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
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
              Use AI to generate personalized insights or add your own
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsCreating(true)}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus size={20} />
                Add Manual Insight
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPage;
