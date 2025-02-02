import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Code,
  ListOrdered,
  Sparkles,
  Copy,
  ThumbsUp,
} from "lucide-react";

// Keeping the same useChatStorage hook implementation
const useChatStorage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chat_messages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error(error);
        setMessages([]);
      }
    } else {
      const initialMessage = {
        type: "bot",
        content:
          "Hi there! 👋 I'm Professor Py! I can help you:\n• Learn Python basics\n• Understand code examples\n• Solve coding problems\n\nWhat would you like to learn today? 🐍",
      };
      setMessages([initialMessage]);
      localStorage.setItem("chat_messages", JSON.stringify([initialMessage]));
    }
  }, []);

  const updateMessages = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem("chat_messages", JSON.stringify(newMessages));
  };

  const clearChat = () => {
    const initialMessage = {
      type: "bot",
      content:
        "Hi there! 👋 I'm Professor Py! Ready to start fresh! What would you like to learn? 🐍",
    };
    updateMessages([initialMessage]);
  };

  return { messages, updateMessages, clearChat };
};

// Message formatting component
const FormattedMessage = ({ content }) => {
  const sections = content.split("```");

  return sections.map((section, index) => {
    if (index % 2 === 1) {
      return (
        <div
          key={index}
          className="my-4 bg-gray-900 rounded-lg p-4 font-mono text-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Code size={16} className="text-gray-400" />
              <span className="text-gray-400">Python Code</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(section)}
              className="flex items-center gap-1 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
            >
              <Copy size={12} />
              Copy
            </button>
          </div>
          <pre className="text-green-400 overflow-x-auto whitespace-pre-wrap">
            {section}
          </pre>
        </div>
      );
    } else {
      const lines = section.split("\n");
      return (
        <div key={index}>
          {lines.map((line, lineIndex) => {
            if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
              return (
                <div key={lineIndex} className="flex items-start gap-2 my-2">
                  <ListOrdered className="text-blue-600 mt-1" size={16} />
                  <p>{line.trim().substring(1).trim()}</p>
                </div>
              );
            }
            return (
              <p key={lineIndex} className="my-2">
                {line}
              </p>
            );
          })}
        </div>
      );
    }
  });
};

const ChatInterface = () => {
  const { messages, updateMessages, clearChat } = useChatStorage();
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Keeping the same useEffect and handler functions
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { type: "user", content: inputMessage };
    updateMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const api_key = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_key}`,
          },
          body: JSON.stringify({
            model: "mistralai/mistral-small-24b-instruct-2501",
            messages: [{ role: "user", content: inputMessage }],
            parameters: {
              temperature: 0.7,
              max_tokens: 150,
            },
          }),
        }
      );

      const data = await response.json();

      if (data && data.choices && data.choices.length > 0) {
        const botmessages = {
          type: "bot",
          content: data.choices[0].message.content,
        };
        updateMessages((prev) => {
          const updatedbot = [...prev, botmessages];
          localStorage.setItem("chat_messages", JSON.stringify(updatedbot));
          return updatedbot;
        });
      } else {
        updateMessages((prev) => [
          ...prev,
          { type: "bot", content: "Sorry, I couldn't get a valid response." },
        ]);
      }
    } catch (error) {
      updateMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "Oops! Something went wrong. Let's try again! 🎮",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Chat Header */}
      <div className="bg-white shadow-md p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Bot className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-600">Professor Py</h2>
              <p className="text-sm text-gray-600">
                Your Python Learning Buddy
              </p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-sm text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none"
                    : "bg-white shadow-md rounded-bl-none"
                }`}
              >
                {message.type === "bot" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Bot size={20} className="text-blue-600" />
                    <span className="font-bold text-blue-600">
                      Professor Py
                    </span>
                  </div>
                )}
                <div
                  className={
                    message.type === "user" ? "text-white" : "text-gray-700"
                  }
                >
                  <FormattedMessage content={message.content} />
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-4 shadow-md rounded-bl-none">
                <div className="flex items-center gap-2">
                  <Bot size={20} className="text-blue-600" />
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white shadow-lg p-4">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex gap-4 items-end"
        >
          <div className="flex-1 bg-gray-50 rounded-2xl p-4 shadow-inner">
            <label className="block text-sm text-gray-600 mb-1">
              Ask me anything about Python! 🐍
            </label>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Example: How do I make a list in Python?"
              className="w-full bg-transparent resize-none focus:outline-none min-h-[40px] max-h-[120px]"
              rows="1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className={`p-4 rounded-full ${
              isLoading || !inputMessage.trim()
                ? "bg-gray-100 text-gray-400"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
            } transition-all`}
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {/* Encouragement Toast */}
      {messages.length > 2 && Math.random() > 0.7 && (
        <div className="fixed bottom-24 right-4 bg-white rounded-full shadow-lg p-3 flex items-center gap-2 animate-bounce">
          <Sparkles className="text-blue-500" size={20} />
          <span className="text-gray-700 font-medium">Great question!</span>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
