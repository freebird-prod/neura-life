"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Add smooth scrolling behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>

          <h1
            className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => window.location.reload()}
          >
            NeuraLife
          </h1>
        </div>
        <nav className="space-x-8 hidden md:flex">
          <a
            href="#features"
            className="hover:text-pink-600 font-medium transition"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-pink-600 font-medium transition"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="hover:text-pink-600 font-medium transition"
          >
            Pricing
          </a>
        </nav>
        <button
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-pink-500/30 cursor-pointer"
          onClick={() => router.push("/auth")}
        >
          Get Started
        </button>
      </header>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 md:px-20 py-24 md:py-32 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-8 z-10">
              <div className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4">
                🚀 AI-Powered Personal Intelligence
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Your Second Brain That{" "}
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Thinks With You
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform chaos into clarity. NeuraLife is your AI-powered life
                manager that learns your thinking patterns, connects your ideas,
                and helps you achieve more — effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition text-white px-8 w-lg py-4 rounded-full font-semibold text-lg shadow-xl shadow-pink-500/30 cursor-pointer"
                  onClick={() => router.push("/auth")}
                >
                  Start Free Trial
                </button>
              </div>
              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">
                    10,000+ users
                  </div>
                  <div className="text-gray-500">
                    trusted by creators worldwide
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://engineering.berkeley.edu/wp-content/uploads/2025/05/iStock-1933557318-1920x1080.jpg"
                alt="AI Brain Illustration"
                className="rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-gray-600 mt-2">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                1M+
              </div>
              <div className="text-gray-600 mt-2">Notes Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-gray-600 mt-2">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                4.9★
              </div>
              <div className="text-gray-600 mt-2">User Rating</div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="py-24 px-6 md:px-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              Powerful Features for Your Mind
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to capture, organize, and amplify your
              thoughts — all powered by cutting-edge AI
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-pink-200 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-white text-2xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Smart Note-Taking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Write in Markdown with intelligent tagging, bidirectional links,
                and a visual knowledge graph that connects your ideas like a
                second brain.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-white text-2xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI Memory Recall
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Instantly retrieve any thought with semantic search. Ask
                questions in natural language and let AI find exactly what you
                need.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Goal & Task Sync
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Seamlessly sync your to-dos and goals across all devices in
                real-time. Never lose track of what matters most.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-pink-200 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI Suggestions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized insights, summaries, and recommendations that
                evolve with your workflow and thinking patterns.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-white text-2xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Cross-Device Sync
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access your thoughts anywhere, anytime. Your data stays
                encrypted and synchronized securely across all your devices.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Offline Ready
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Work seamlessly without internet. Fully PWA-enabled for native
                app experience on any device, online or offline.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">How NeuraLife Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform the way you think, work, and
              create
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-xl shadow-pink-500/30">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Capture Everything</h3>
              <p className="text-gray-600 leading-relaxed">
                Dump your thoughts, ideas, and tasks into NeuraLife. Write
                freely in Markdown, add tags, and create connections.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-xl shadow-purple-500/30">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Let AI Organize</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI learns your patterns, automatically links related ideas,
                and surfaces insights you might have missed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-xl shadow-blue-500/30">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Amplify Your Output</h3>
              <p className="text-gray-600 leading-relaxed">
                Retrieve any thought instantly, get AI-powered suggestions, and
                watch your productivity soar to new heights.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 rounded-3xl border-2 border-gray-200 bg-white hover:border-pink-300 transition">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-5xl font-bold mb-6">
                $0<span className="text-xl text-gray-500">/mo</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-600">Up to 100 notes</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-600">Basic AI search</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-600">Single device sync</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-600">Markdown support</span>
                </div>
              </div>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition cursor-pointer">
                Get Started
              </button>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-600 to-purple-600 text-white shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-5xl font-bold mb-6">
                $12<span className="text-xl opacity-80">/mo</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="font-bold">✓</span>
                  <span>Unlimited notes</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold">✓</span>
                  <span>Advanced AI features</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold">✓</span>
                  <span>Unlimited device sync</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold">✓</span>
                  <span>Knowledge graph view</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold">✓</span>
                  <span>Priority support</span>
                </div>
              </div>
              <button className="w-full bg-white text-pink-600 py-3 rounded-full font-semibold hover:bg-gray-50 transition shadow-lg cursor-pointer">
                Start Free Trial
              </button>
            </div>
            <div className="p-8 rounded-3xl border-2 border-gray-200 bg-white hover:border-purple-300 transition">
              <h3 className="text-2xl font-bold mb-2">Team</h3>
              <div className="text-5xl font-bold mb-6">
                $39<span className="text-xl text-gray-500">/mo</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-600">Everything in Pro</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-600">Up to 10 team members</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-600">Shared workspaces</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-600">Admin controls</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-600">Dedicated support</span>
                </div>
              </div>
              <button className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-full font-semibold hover:bg-purple-50 transition cursor-pointer">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Supercharge Your Mind?
          </h2>
          <p className="mb-12 text-xl text-white/90 leading-relaxed">
            Join thousands of creators, researchers, and thinkers who've
            transformed their workflow with NeuraLife. Start your journey today
            — your AI-powered digital brain awaits.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-full hover:border-pink-400 hover:scale-105 transition-all shadow-2xl text-lg cursor-pointer">
              Start Free Trial
            </button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>{" "}
    </div>
  );
}
