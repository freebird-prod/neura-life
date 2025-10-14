"use client";
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Brain,
  Settings,
  LogOut,
  StickyNote,
  Network,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { NotesProvider } from "@/contexts/NotesContext";
import { GoalsProvider } from "@/contexts/GoalsContext";
import { AIInsightsProvider } from "@/contexts/AIInsightsContext";
import { MemoryGraphProvider } from "@/contexts/MemoryGraphContext";
import { SettingsProvider } from "@/contexts/SettingsContext";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Notes", icon: StickyNote, href: "/dashboard/notes" },
    { name: "Memory Graph", icon: Network, href: "/dashboard/memory-graph" },
    { name: "AI Insights", icon: Brain, href: "/dashboard/ai-insights" },
    { name: "Goals & Tasks", icon: FileText, href: "/dashboard/goals-tasks" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const getActiveItem = () => {
    return menuItems.find((item) => item.href === pathname)?.name || "";
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [router, user]);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col justify-between fixed h-screen z-10">
        <div>
          <Link href="/dashboard">
            <div className="flex items-center justify-center py-6 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
              <h1 className="text-2xl font-bold text-pink-600">NeuraLife</h1>
            </div>
          </Link>
          <nav className="mt-6 space-y-1 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-pink-100 text-pink-600 font-semibold border-l-4 border-pink-600 shadow-sm"
                      : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 bg-pink-100 text-pink-600 font-semibold border-l-4 border-r-4 border-pink-600 shadow-md rounded-xl cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {getActiveItem()}
        </h1>
        <NotesProvider>
          <GoalsProvider>
            <AIInsightsProvider>
              <MemoryGraphProvider>
                <SettingsProvider>{children}</SettingsProvider>
              </MemoryGraphProvider>
            </AIInsightsProvider>
          </GoalsProvider>
        </NotesProvider>
      </main>
    </div>
  );
}
