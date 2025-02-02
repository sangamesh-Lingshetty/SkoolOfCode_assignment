import React, { useState } from "react";
import {
  Bot,
  BookOpen,
  Star,
  Settings,
  MessageSquare,
  Key,
  Award,
  Code,
  BookOpenCheck,
  Brain,
  Lightbulb,
  Puzzle,
  Trophy,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const PythonTutor = () => {
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleApiSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("api_key", apiKey);
    setShowApiConfig(false);
  };

  const tutorCharacters = [
    {
      id: 1,
      name: "Professor Py",
      personality: "Patient & Encouraging",
      specialty: "Basics & Fundamentals",
      description: "Perfect for beginners starting their Python journey",
    },
    {
      id: 2,
      name: "Data Dragon",
      personality: "Energetic & Fun",
      specialty: "Problem Solving",
      description: "Makes complex problems simple and fun to solve",
    },
    {
      id: 3,
      name: "Code Wizard",
      personality: "Creative & Inspiring",
      specialty: "Projects & Games",
      description: "Turns ideas into exciting Python projects",
    },
  ];

  const learningPathways = [
    {
      title: "Beginner's Path",
      description: "Start your coding adventure here!",
      topics: ["Variables & Data Types", "Basic Operations", "Simple Games"],
    },
    {
      title: "Explorer's Path",
      description: "Dive deeper into Python!",
      topics: ["Functions", "Lists & Loops", "Mini Projects"],
    },
    {
      title: "Creator's Path",
      description: "Build your own programs!",
      topics: ["Game Development", "Data Analysis", "Web Apps"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-blue-600">PythonAI Tutor</h1>
          </div>
          <button
            onClick={() => setShowApiConfig(true)}
            className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200"
          >
            <Key size={20} />
            <span>Configure API</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced App Description */}
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">
            Your Magical Python Learning Adventure Starts Here! 🚀
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="text-left">
                <h3 className="text-xl font-bold text-blue-700 mb-3">
                  What is PythonPals?
                </h3>
                <p className="text-gray-700">
                  PythonPals is your personal AI-powered coding companion,
                  designed specifically for young learners aged 8-16. We make
                  learning Python fun, interactive, and magical! With
                  personalized guidance, instant feedback, and exciting rewards,
                  you'll master Python programming while having a blast!
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-blue-700 mb-3">
                  Why Choose PythonPals?
                </h3>
                <p className="text-gray-700">
                  Our unique blend of AI tutoring, interactive coding
                  challenges, and game-based learning creates an engaging
                  environment where you learn by doing. Whether you're crafting
                  your first program or building exciting projects, PythonPals
                  adapts to your pace and style!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="text-yellow-500" size={24} />
                </div>
                <p className="text-sm font-medium">Learn at Your Pace</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Brain className="text-purple-500" size={24} />
                </div>
                <p className="text-sm font-medium">AI-Powered Learning</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Rocket className="text-pink-500" size={24} />
                </div>
                <p className="text-sm font-medium">Fun Projects & Games</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Interactive Learning Features
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <FeatureCard
              icon={<BookOpenCheck className="text-blue-500" />}
              title="Step-by-Step Lessons"
              description="Interactive Python lessons with real-time feedback and coding exercises"
            />
            <FeatureCard
              icon={<MessageSquare className="text-purple-500" />}
              title="AI Chat Support"
              description="Get instant help from your AI tutor when you're stuck on a problem"
            />
            <FeatureCard
              icon={<Puzzle className="text-green-500" />}
              title="Coding Challenges"
              description="Fun puzzles and challenges to test your Python skills"
            />
            <FeatureCard
              icon={<Lightbulb className="text-yellow-500" />}
              title="Project Builder"
              description="Create your own Python games and applications with guidance"
            />
          </div>
        </section>

        {/* Learning Pathways */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Choose Your Learning Path
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {learningPathways.map((path, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-xl font-bold text-blue-700 mb-3">
                  {path.title}
                </h4>
                <p className="text-gray-600 mb-4">{path.description}</p>
                <ul className="space-y-2">
                  {path.topics.map((topic, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <Star className="text-yellow-400" size={16} />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Character Selection (existing code) */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Choose Your AI Teaching Buddy
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {tutorCharacters.map((char) => (
              <div
                key={char.id}
                className={`cursor-pointer transform transition-all
                  ${
                    selectedCharacter === char.id
                      ? "scale-105 ring-4 ring-blue-400"
                      : "hover:scale-105"
                  }
                `}
                onClick={() => setSelectedCharacter(char.id)}
              >
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex justify-center mb-4">
                    <Bot size={48} className="text-blue-500" />
                  </div>
                  <h4 className="text-xl font-bold text-center text-gray-800 mb-2">
                    {char.name}
                  </h4>
                  <p className="text-center text-blue-600 mb-2">
                    {char.personality}
                  </p>
                  <p className="text-center text-gray-600 mb-2">
                    {char.specialty}
                  </p>
                  <p className="text-center text-sm text-gray-500">
                    {char.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Start Learning Button */}

        <div className="text-center">
          <Link to={"/chatAI"}>
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold
            px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 handlechatAI transition-all"
            >
              Chat with Excellent AI
            </button>
          </Link>
        </div>
      </div>

      {/* API Configuration Modal (existing code) */}
      {showApiConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Configure Your API Key</h3>
            <form onSubmit={handleApiSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Enter your API Key:
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="sk-..."
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowApiConfig(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex justify-center mb-4">{icon}</div>
    <h4 className="text-xl font-bold text-center text-gray-800 mb-2">
      {title}
    </h4>
    <p className="text-center text-gray-600">{description}</p>
  </div>
);

export default PythonTutor;
