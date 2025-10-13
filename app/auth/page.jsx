"use client";
import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        setMessage("✅ Login successful!");
      } else {
        setMessage("❌ Invalid email or password");
      }
    } else {
      if (!email || !password || !name) {
        setMessage("⚠️ Please fill all fields");
        return;
      }
      if (password !== confirmPassword) {
        setMessage("⚠️ Passwords do not match");
        return;
      }
      const userData = { name, email, password };
      localStorage.setItem("user", JSON.stringify(userData));
      setMessage("✅ Signup successful! You can now log in.");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-white to-pink-200">
      <div className="flex w-[90%] max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-1/2 hidden md:flex flex-col items-center justify-center bg-pink-600 text-white p-12">
          <h2 className="text-4xl font-bold mb-4">NeuraLife</h2>
          <p className="text-lg mb-6 text-pink-100 text-center">
            Your AI-powered life organizer — built to learn how you think.
          </p>
          <ul className="text-pink-100 space-y-3 text-left">
            <li>🧠 Smart memory recall</li>
            <li>📝 Markdown-based notes</li>
            <li>⚡ Cross-device sync</li>
            <li>🤖 AI-driven recommendations</li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
            {isLogin ? "Welcome Back 👋" : "Create Account 🧠"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
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

          {message && (
            <p className="text-center text-sm font-medium mt-4 text-gray-700">
              {message}
            </p>
          )}

          <p className="text-center text-gray-600 mt-6">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
              className="text-pink-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
