import React, { useState, useEffect } from "react";
import {
  Timer,
  ArrowRight,
  ArrowLeft,
  Gift,
  Award,
  Check,
  X,
  PlayCircle,
} from "lucide-react";

const PythonKidsQuiz = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What do we use to write comments in Python?",
      options: ["// Comment", "# Comment", "/* Comment */", "-- Comment"],
      correctAnswer: "# Comment",
      explanation: "In Python, we use the # symbol to write comments!",
    },
    {
      id: 2,
      question: "Which animal represents Python programming?",
      options: ["Cat 🐱", "Snake 🐍", "Dog 🐕", "Bird 🦜"],
      correctAnswer: "Snake 🐍",
      explanation:
        "Python is named after the snake! That's why we use 🐍 as its symbol.",
    },
    {
      id: 3,
      question: "What will print('Hello' + 'World') show?",
      options: ["Hello World", "HelloWorld", "Error", "Nothing"],
      correctAnswer: "HelloWorld",
      explanation: "In Python, + joins strings together without adding spaces!",
    },
    {
      id: 4,
      question: "Which is a correct variable name in Python?",
      options: ["1name", "my-name", "my_name", "@name"],
      correctAnswer: "my_name",
      explanation:
        "Variable names can use letters, numbers, and underscores, but can't start with a number!",
    },
  ];

  useEffect(() => {
    if (isStarted && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStarted, timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswer = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((curr) => curr + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((curr) => curr - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setIsCompleted(true);
  };

  const handleclose = () => {
    setShowResults(false);
    setIsCompleted(false);
    setIsStarted(false);
    setCurrentQuestion(0);
    setUserAnswers({});
  };

  const calculateScore = () => {
    return questions.reduce((score, q, index) => {
      return score + (userAnswers[index] === q.correctAnswer ? 1 : 0);
    }, 0);
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">
            Python Quiz Adventure! 🐍
          </h1>
          <p className="text-gray-600 mb-8">
            Ready to test your Python knowledge? You'll have 5 minutes to answer
            all questions!
          </p>
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 w-full"
          >
            <PlayCircle className="w-6 h-6" />
            Start Quiz!
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="text-center mb-8">
              <Gift className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-xl text-gray-700 mb-2">
                You scored {score} out of {questions.length}!
              </p>
              <div className="flex justify-center gap-2">
                {[...Array(score)].map((_, i) => (
                  <Award key={i} className="w-8 h-8 text-yellow-500" />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-6">
              Let's Review Your Answers:
            </h3>
            <div className="space-y-6">
              {questions.map((q, index) => (
                <div key={q.id} className="border-b pb-6">
                  <div className="flex items-start gap-3">
                    {userAnswers[index] === q.correctAnswer ? (
                      <Check className="w-6 h-6 text-green-500 mt-1" />
                    ) : (
                      <X className="w-6 h-6 text-red-500 mt-1" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800 mb-2">
                        Question {index + 1}: {q.question}
                      </p>
                      <p className="text-gray-600 mb-2">
                        Your answer: {userAnswers[index] || "Not answered"}
                      </p>
                      <p className="text-green-600 font-medium mb-2">
                        Correct answer: {q.correctAnswer}
                      </p>
                      <p className="text-blue-600 text-sm">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleclose}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Close
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2 text-lg font-medium text-red-500">
              <Timer className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-xl transition-all ${
                    userAnswers[currentQuestion] === option
                      ? "bg-blue-100 border-2 border-blue-400"
                      : "bg-gray-50 border-2 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl ${
                currentQuestion === 0
                  ? "bg-gray-100 text-gray-400"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonKidsQuiz;
