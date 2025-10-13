'use client'
import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
          {isLogin ? "Welcome Back 👋" : "Create Account 🧠"}
        </h1>

        <form className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <div className="mt-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-px w-1/4 bg-gray-300" />
            <span className="text-gray-500">or continue with</span>
            <div className="h-px w-1/4 bg-gray-300" />
          </div>
          <div className="flex justify-center mt-5 space-x-4">
            <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">Google</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                alt="GitHub"
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
