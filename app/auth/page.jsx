"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import bcrypt from "bcryptjs";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, login } = useAuth();
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = "NeuraLife | Authentication";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Sign in or create an account to access your AI-powered life organizer"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Sign in or create an account to access your AI-powered life organizer";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }

    // Check if user is already logged in
    if (user) {
      router.push("/dashboard");
    }
  }, [router, user]);

  // Clear form fields when switching between login/signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    if (!isLogin) setName("");
    setProfilePhoto(null);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Resize image to max 300x300 to reduce file size
          const maxSize = 300;
          let { width, height } = img;

          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 with reduced quality
          const base64Data = canvas.toDataURL("image/jpeg", 0.7);
          setProfilePhoto(base64Data);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login user
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          toast.error("User not found");
          setLoading(false);
          return;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        const isPasswordValid = await bcrypt.compare(
          password,
          userData.password
        );
        if (!isPasswordValid) {
          toast.error("Invalid password");
          setLoading(false);
          return;
        }

        // Store user data in localStorage
        login({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        });

        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        // Register user
        if (!email || !password || !name) {
          toast.error("Please fill all fields");
          setLoading(false);
          return;
        }

        // Check if user already exists
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          toast.error(
            "This email is already registered. Please log in instead."
          );
          setIsLogin(true);
          setPassword("");
          setLoading(false);
          return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate user ID
        const userId = crypto.randomUUID();

        // Create user document in Firestore
        try {
          await setDoc(doc(db, "users", userId), {
            id: userId,
            name,
            email,
            password: hashedPassword,
            profilePhoto,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          // Store user data in localStorage
          login({
            id: userId,
            name,
            email,
          });

          toast.success("Account created successfully!");
          setIsLogin(true);
          setEmail("");
          setPassword("");
          setName("");
          setProfilePhoto(null);
        } catch (firestoreError) {
          console.error("Firestore error:", firestoreError);
          toast.error(
            "Account created but failed to save details. Please contact support."
          );
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-white to-pink-200">
      <div className="flex w-[90%] max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-1/2 hidden md:flex items-center justify-center p-0">
          <img
            src="/auth.jpg"
            alt="NeuraLife Authentication"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
            {isLogin ? "Welcome Back 👋" : "Create Account 🧠"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Profile Photo (Optional)
                </label>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors"
                      onClick={() => fileInputRef.current.click()}
                    >
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={32} className="text-gray-400" />
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition ${
                loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {isLogin ? "Logging in..." : "Creating account..."}
                </span>
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleAuthMode}
              className="text-pink-600 font-semibold hover:underline cursor-pointer"
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
