export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-5 shadow-md bg-white flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-pink-600">NeuraLife</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#features" className="hover:text-pink-600 font-medium">Features</a>
          <a href="#about" className="hover:text-pink-600 font-medium">About</a>
          <a href="#download" className="hover:text-pink-600 font-medium">Download</a>
        </nav>
        <button className="bg-pink-600 hover:bg-pink-700 transition text-white px-5 py-2 rounded-lg font-semibold">
          Get Started
        </button>
      </header>

      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl font-extrabold leading-tight">
            Your Second Brain That <span className="text-pink-600">Learns How You Think.</span>
          </h2>
          <p className="text-lg text-gray-600">
            Organize your thoughts, goals, and tasks seamlessly with NeuraLife — an AI-powered life manager that evolves with you.
          </p>
          <div className="flex space-x-4">
            <button className="bg-pink-600 hover:bg-pink-700 transition text-white px-6 py-3 rounded-lg font-semibold">
              Try for Free
            </button>
            <button className="border border-pink-600 text-pink-600 px-6 py-3 rounded-lg hover:bg-pink-50 font-semibold">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src="https://cdn.dribbble.com/userupload/13171537/file/original-bb31ef7b2a3b6d23f7b7b5288cde2f13.png?compress=1&resize=1200x900"
            alt="AI Brain Illustration"
            className="rounded-2xl shadow-xl w-96 md:w-[500px]"
          />
        </div>
      </section>

      <section id="features" className="bg-white py-20 px-8 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="p-8 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">Smart Note-Taking</h3>
            <p className="text-gray-600">
              Write in Markdown with tagging and a visual graph view to link your ideas like Obsidian.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">AI Memory Recall</h3>
            <p className="text-gray-600">
              Instantly find ideas and connections with semantic search and natural language queries.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">Goal & Task Sync</h3>
            <p className="text-gray-600">
              Sync your to-dos and goals across devices via Firebase or WebSockets in real time.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">AI Suggestions</h3>
            <p className="text-gray-600">
              Get personalized summaries, recommendations, and insights tailored to your workflow.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">Cross-Device Sync</h3>
            <p className="text-gray-600">
              Access your thoughts anywhere. Your data stays in sync securely across all devices.
            </p>
          </div>
          <div className="p-8 rounded-2xl shadow-lg bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-pink-600 mb-4">Offline Ready</h3>
            <p className="text-gray-600">
              NeuraLife works even without the internet — fully PWA-enabled for seamless experience.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-8 md:px-20 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Why NeuraLife?</h2>
          <p className="text-lg text-gray-600">
            Traditional note apps only store your ideas. NeuraLife helps you grow them. By learning how you write, think, and plan, it becomes your digital companion — organizing your life intelligently and evolving with your thought process.
          </p>
          <p className="text-lg text-gray-600">
            Whether you’re brainstorming, journaling, or managing projects, NeuraLife keeps your knowledge connected, searchable, and alive.
          </p>
        </div>
      </section>

      <section id="download" className="py-20 bg-gradient-to-r from-pink-600 to-pink-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Supercharge Your Mind?</h2>
        <p className="mb-8 text-lg text-pink-100">Start your journey with NeuraLife today — your AI-powered digital brain awaits.</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-pink-700 font-semibold px-6 py-3 rounded-lg hover:bg-pink-50 transition">
            Download App
          </button>
          <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-pink-700 transition font-semibold">
            Join Beta
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <p>© {new Date().getFullYear()} NeuraLife. All rights reserved.</p>
      </footer>
    </div>
  )
}
