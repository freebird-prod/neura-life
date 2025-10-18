"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useNotes } from "@/contexts/NotesContext";
import { useGoals } from "@/contexts/GoalsContext";
import { useAIInsights } from "@/contexts/AIInsightsContext";
import { useMemoryGraph } from "@/contexts/MemoryGraphContext";
import {
  StickyNote,
  Target,
  Brain,
  Network,
  Search,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const router = useRouter();
  const { notes } = useNotes();
  const { goals } = useGoals();
  const { insights } = useAIInsights();
  const { graphData } = useMemoryGraph();

  const completedGoals = goals.filter(
    (goal) => goal.status === "completed"
  ).length;
  const recentItems = [
    ...notes
      .slice(0, 2)
      .map((note) => ({ ...note, type: "note", icon: StickyNote })),
    ...goals
      .slice(0, 2)
      .map((goal) => ({ ...goal, type: "goal", icon: Target })),
    ...insights
      .slice(0, 2)
      .map((insight) => ({ ...insight, type: "insight", icon: Brain })),
    ...graphData
      .slice(0, 2)
      .map((item) => ({ ...item, type: "graph", icon: Network })),
  ]
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    .slice(0, 4);

  const getTypeColor = (type) => {
    switch (type) {
      case "note":
        return "text-blue-500";
      case "goal":
        return "text-green-500";
      case "insight":
        return "text-purple-500";
      case "graph":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "note":
        return "Note";
      case "goal":
        return "Goal";
      case "insight":
        return "AI Insight";
      case "graph":
        return "Memory Graph";
      default:
        return "Item";
    }
  };

  const getNavigationPath = (type) => {
    switch (type) {
      case "note":
        return "/dashboard/notes";
      case "goal":
        return "/dashboard/goals-tasks";
      case "insight":
        return "/dashboard/ai-insights";
      case "graph":
        return "/dashboard/memory-graph";
      default:
        return "/dashboard";
    }
  };

  const handleItemClick = (item) => {
    const path = getNavigationPath(item.type);
    router.push(path);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl border border-pink-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to NeuraLife! 🧠
        </h2>
        <p className="text-gray-600 mb-4">
          Your AI-powered life organizer. Use the search feature to quickly find
          anything across your notes, goals, insights, and memory graph.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <StickyNote className="text-blue-500" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {notes.length}
              </h3>
              <p className="text-sm text-gray-600">Total Notes</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <Target className="text-green-500" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {completedGoals}/{goals.length}
              </h3>
              <p className="text-sm text-gray-600">Goals Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <Brain className="text-purple-500" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {insights.length}
              </h3>
              <p className="text-sm text-gray-600">AI Insights</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <Network className="text-orange-500" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {graphData.length}
              </h3>
              <p className="text-sm text-gray-600">Graph Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        {recentItems.length > 0 ? (
          <div className="space-y-3">
            {recentItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <Icon className={`w-5 h-5 ${getTypeColor(item.type)} mr-3`} />
                  <div className="flex-1">
                    <p className="text-gray-700">
                      {item.type === "goal"
                        ? `${
                            item.status === "completed"
                              ? "Completed"
                              : "Created"
                          } goal: `
                        : `Created ${getTypeLabel(item.type).toLowerCase()}: `}
                      <span className="font-medium">
                        {item.title || "Untitled"}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {new Date(
                        item.createdAt.seconds * 1000
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No recent activity. Start by creating your first note or goal!
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
