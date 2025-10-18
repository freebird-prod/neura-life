"use client";
import React, { useState } from "react";
import { useGoals } from "@/contexts/GoalsContext";
import toast from "react-hot-toast";
import {
  Save,
  Plus,
  Target,
  CheckCircle,
  Circle,
  Edit,
  Trash2,
  Calendar,
  Info,
  Lightbulb,
  X,
  Clock,
  TrendingUp,
} from "lucide-react";

const GoalsTasksPage = () => {
  const {
    goals,
    loading,
    saveGoal,
    updateGoal,
    deleteGoal,
    toggleGoalCompletion,
  } = useGoals();
  const [isCreating, setIsCreating] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [filterView, setFilterView] = useState("all"); // "all", "active", "completed"

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
      resetForm();
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setTitle(goal.title);
    setDescription(goal.description || "");
    setDeadline(
      goal.deadline
        ? new Date(goal.deadline.seconds * 1000).toISOString().split("T")[0]
        : ""
    );
    setIsCreating(true);
  };

  const handleUpdateGoal = async () => {
    if (!title.trim()) {
      toast.error("Please fill in title");
      return;
    }

    const success = await updateGoal(editingGoal.id, {
      title: title.trim(),
      description: description.trim(),
      deadline: deadline ? new Date(deadline) : null,
    });

    if (success) {
      resetForm();
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      await deleteGoal(goalId);
    }
  };

  const handleToggleCompletion = async (goal) => {
    await toggleGoalCompletion(goal.id, goal.completed);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setIsCreating(false);
    setEditingGoal(null);
  };

  const filteredGoals = goals.filter((goal) => {
    if (filterView === "active") return !goal.completed;
    if (filterView === "completed") return goal.completed;
    return true;
  });

  const stats = {
    total: goals.length,
    completed: goals.filter((g) => g.completed).length,
    active: goals.filter((g) => !g.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Goals & Tasks
            </h1>
            <p className="text-gray-600">
              Set, track, and achieve your objectives
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
            <button
              onClick={() => setIsCreating(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus size={20} />
              New Goal
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
                  How to Use Goals & Tasks
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
                  <p className="font-medium">Create Goals</p>
                  <p className="text-sm text-gray-600">
                    Click "New Goal" to add your objectives. Give each goal a
                    clear title and description to keep track of what you want
                    to achieve.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Set Deadlines (Optional)</p>
                  <p className="text-sm text-gray-600">
                    Add deadlines to your goals to stay accountable. You'll see
                    a visual indicator of how much time you have left.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Track Progress</p>
                  <p className="text-sm text-gray-600">
                    Click the circle icon to mark goals as complete. Filter by
                    "Active", "Completed", or "All" to organize your view.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium">Edit or Delete</p>
                  <p className="text-sm text-gray-600">
                    Use the edit icon to update goals or the trash icon to
                    delete them. Keep your list organized and up-to-date.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800 flex items-start gap-2">
                  <TrendingUp size={16} className="flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Pro Tip:</strong> Break large goals into smaller,
                    manageable objectives. This makes them less overwhelming and
                    easier to accomplish. Celebrate small wins! 🎉
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Section */}
        {goals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Goals</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Target className="text-pink-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Goals</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.active}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.completed}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        {goals.length > 0 && (
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6 w-fit">
            <button
              onClick={() => setFilterView("all")}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                filterView === "all"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilterView("active")}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                filterView === "active"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setFilterView("completed")}
              className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
                filterView === "completed"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>
        )}

        {isCreating && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              {editingGoal ? "Edit Goal" : "Create New Goal"}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., Learn React, Finish project, Exercise daily"
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
                  placeholder="Add more details about your goal and what success looks like..."
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
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Setting a deadline helps keep you accountable
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={editingGoal ? handleUpdateGoal : handleSaveGoal}
                  disabled={loading}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save size={20} />
                  {loading
                    ? "Saving..."
                    : editingGoal
                    ? "Update Goal"
                    : "Save Goal"}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => {
            const isOverdue =
              goal.deadline &&
              !goal.completed &&
              new Date(goal.deadline.seconds * 1000) < new Date();

            return (
              <div
                key={goal.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 ${
                  goal.completed ? "opacity-75" : ""
                } ${isOverdue ? "border-2 border-red-300" : ""}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleCompletion(goal)}
                      className="cursor-pointer transition-transform hover:scale-110"
                      title={
                        goal.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"
                      }
                    >
                      {goal.completed ? (
                        <CheckCircle className="text-green-600" size={28} />
                      ) : (
                        <Circle
                          className="text-gray-400 hover:text-pink-600"
                          size={28}
                        />
                      )}
                    </button>
                    <Target
                      className={
                        goal.completed ? "text-green-600" : "text-pink-600"
                      }
                      size={24}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditGoal(goal)}
                      className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                      title="Edit goal"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete goal"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3
                  className={`text-lg font-semibold mb-2 ${
                    goal.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {goal.title}
                </h3>

                {goal.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {goal.description}
                  </p>
                )}

                {goal.deadline && (
                  <div
                    className={`flex items-center gap-2 text-xs mt-4 px-3 py-2 rounded-lg ${
                      isOverdue
                        ? "bg-red-50 text-red-700"
                        : goal.completed
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    <Calendar size={14} />
                    <span>
                      {isOverdue && !goal.completed && "Overdue: "}
                      {goal.completed && "Completed: "}
                      {!goal.completed && !isOverdue && "Due: "}
                      {new Date(
                        goal.deadline.seconds * 1000
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {goal.completed && goal.completedAt && (
                  <div className="flex items-center gap-2 text-xs text-green-600 mt-2">
                    <CheckCircle size={14} />
                    <span>
                      Completed on{" "}
                      {new Date(
                        goal.completedAt.seconds * 1000
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
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
