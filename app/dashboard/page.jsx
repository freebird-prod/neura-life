"use client";
import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-pink-600 mb-2">Total Notes</h2>
          <p className="text-gray-600 text-3xl font-bold">128</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-pink-600 mb-2">Goals Completed</h2>
          <p className="text-gray-600 text-3xl font-bold">42</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-pink-600 mb-2">AI Suggestions</h2>
          <p className="text-gray-600 text-3xl font-bold">17</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-pink-600 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
            <p className="text-gray-700">Created new note: <span className="font-medium">Project Ideas</span></p>
            <span className="text-sm text-gray-500 ml-auto">2h ago</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <p className="text-gray-700">Completed goal: <span className="font-medium">Morning Routine</span></p>
            <span className="text-sm text-gray-500 ml-auto">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
