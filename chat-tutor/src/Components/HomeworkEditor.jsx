import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { Timer, PlayCircle, CheckCircle2, ArrowLeftCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const HomeworkEditor = () => {
  const location = useLocation();
  const question = location.state?.question || "No homework assigned.";
  const [code, setCode] = useState('print("Hello, World!")');
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer handling using useEffect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isTimerRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, time]); // Depend on both isTimerRunning and time

  const runCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: "python",
          version: "3.10.0",
          files: [{ content: code }],
        }
      );

      setOutput(response.data.run.stdout || response.data.run.stderr);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  const navigate = useNavigate();

  const handlereturn = () => {
    navigate("/");
  };

  // Start or stop timer
  const handleTimerToggle = () => {
    setIsTimerRunning((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - Question */}
      <div className="w-1/3 p-6 bg-white shadow-lg">
        <button
          onClick={handlereturn}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeftCircle className="mr-2" /> Back to Questions
        </button>

        <div className="bg-purple-50 rounded-lg p-6">
          <p className="text-gray-700 mb-6">Question</p>
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            {question}
          </h2>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-700 mb-2">
              Helpful Hints! 💡
            </h3>
          </div>
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="flex-1 flex flex-col">
        {/* Timer Bar */}
        <div className="bg-white p-4 shadow-md flex items-center justify-between">
          <div className="flex items-center text-gray-700 space-x-4">
            <Timer className="mr-2 text-gray-600" />
            <span className="text-xl font-mono">{formatTime(time)}</span>

            <div onClick={handleTimerToggle}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                {isTimerRunning ? "Stop Time" : "Start Time"}
              </button>
            </div>
          </div>

          <button
            onClick={runCode}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <CheckCircle2 className="mr-2" /> Checking...
              </span>
            ) : (
              <span className="flex items-center">
                <PlayCircle className="mr-2" /> Run Code
              </span>
            )}
          </button>
        </div>

        {/* Code Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            language="python"
            value={code}
            onChange={(value) => setCode(value)}
            theme="vs-dark"
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              padding: { top: 20 },
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="bg-gray-900 text-white p-4 h-32 overflow-auto">
          <h3 className="text-gray-400 mb-2">Output:</h3>
          <pre className="font-mono">
            {output || "Your code output will appear here!"}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomeworkEditor;
