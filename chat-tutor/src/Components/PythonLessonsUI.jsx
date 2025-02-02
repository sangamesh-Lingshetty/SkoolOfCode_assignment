import React, { useState } from "react";
import {
  BookOpen,
  Check,
  Star,
  Trophy,
  ChevronRight,
  ChevronDown,
  Play,
  Video,
  Bot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lessons } from "../database";

const PythonLessonsUI = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [expandedLessons, setExpandedLessons] = useState({});
  const [play, setPlay] = useState(false);
  const navigate = useNavigate();


  const toggleLesson = (lesson) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lesson.id]: !prev[lesson.id],
    }));
    setSelectedLesson((prev) => (prev?.id === lesson.id ? null : lesson));
  };

  const handlePlayBtn = () => {
    setPlay(true);
  };

  const handleHomeWork = (question) => {
    navigate("/codeEditor", { state: { question } });
  };

  const renderVideoSection = () => {
    if (!selectedLesson) return null;

    const embedUrl = selectedLesson.videoUrl.replace(
      "https://www.youtube.com/watch?v=",
      "https://www.youtube.com/embed/"
    );
    const videoSrc = play ? `${embedUrl}?autoplay=1` : embedUrl;

    return (
      <div className="bg-white rounded-xl shadow-lg sticky top-4">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-blue-800">
              {selectedLesson.videoTitle}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              width="100%"
              height="100%"
              src={videoSrc}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
            {!play && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <button
                  onClick={handlePlayBtn}
                  className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Play className="w-8 h-8 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Bot className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-800">
            Python Adventure for Kids! 🐍
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleLesson(lesson)}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <h2 className="font-bold text-gray-800">
                        {lesson.title}
                      </h2>
                      {lesson.completed && (
                        <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Complete
                        </span>
                      )}
                    </div>
                    {expandedLessons[lesson.id] ? (
                      <ChevronDown className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-blue-600" />
                    )}
                  </div>

                  {expandedLessons[lesson.id] && (
                    <>
                      <div className="mt-4 ml-6 space-y-4">
                        {lesson.sections.map((section, sIndex) => (
                          <div
                            key={sIndex}
                            className="border-l-2 border-blue-200 pl-4"
                          >
                            <h3 className="font-medium text-blue-800 mb-2">
                              {section.title}
                            </h3>
                            <div className="space-y-2">
                              {section.content.map((item, iIndex) => (
                                <div
                                  key={iIndex}
                                  className="flex items-center gap-2"
                                >
                                  <Play className="w-4 h-4 text-blue-600" />
                                  <span className="text-gray-700">
                                    {item.title}
                                  </span>
                                  {item.completed && (
                                    <Check className="w-4 h-4 text-green-500" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div
                          onClick={() => handleHomeWork(lesson.homework.title)}
                          className="border-l-2 border-blue-200 pl-4 cursor-pointer"
                        >
                          <h3 className="font-medium text-blue-800 mb-2">
                            Home Work
                          </h3>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className={`transition-all duration-300 ${
              selectedLesson ? "opacity-100" : "opacity-0"
            }`}
          >
            {renderVideoSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonLessonsUI;
