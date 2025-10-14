"use client";
import React, { useState } from "react";
import { useGoals } from "@/contexts/GoalsContext";
import toast from "react-hot-toast";
import { Save, Plus, Target, CheckCircle } from "lucide-react";

const GoalsTasksPage = () => {
  const { goals, loading, saveGoal } = useGoals();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSaveGoal = async () => {
    if (!title.trim()) {
      toast.error("Please fill in title");
      return;
    }

    const success = await saveGoal({
      title: title.trim(),
      description: description.trim(),
      deadline: deadline ? new Date(deadline) : null,
      completed: false,
    });

    if (success) {
      setTitle("");
      setDescription("");
      setDeadline("");
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Goals & Tasks
            </h1>
            <p className="text-gray-600">Set and track your objectives</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={20} />
            New Goal
          </button>
        </div>

        {isCreating && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Create New Goal
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
                  placeholder="Enter goal title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Describe your goal..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline (optional)
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSaveGoal}
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save size={20} />
                  {loading ? "Saving..." : "Save Goal"}
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
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <Target className="text-pink-600" size={24} />
                {goal.completed && (
                  <CheckCircle className="text-green-600" size={24} />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {goal.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
              {goal.deadline && (
                <div className="text-xs text-gray-500">
                  Deadline:{" "}
                  {new Date(goal.deadline.seconds * 1000).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>

        {goals.length === 0 && !isCreating && (
          <div className="text-center py-12">
            <Target className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No goals yet
            </h3>
            <p className="text-gray-600 mb-6">Start setting your objectives</p>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus size={20} />
              Create Your First Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsTasksPage;
