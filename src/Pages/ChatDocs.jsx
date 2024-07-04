import React from 'react';
import { FaVolumeUp, FaSyncAlt, FaThumbsUp, FaThumbsDown, FaStar, FaPaperclip, FaPaperPlane, FaRobot, FaChevronDown } from 'react-icons/fa';

export default function ChatDocs() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white text-gray-800 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-xl">ChatGPT</span>
          <FaChevronDown />
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-gray-100 text-blue-800 p-2 rounded-lg max-w-xs shadow-md">
            <p className="text-lg">Hello, how are you?</p>
          </div>
        </div>

        {/* ChatGPT Response */}
        <div className="flex items-start space-x-2">
          <img
            src="/Logo.png"
            className={`w-10 h-10 `}
          />
          <div className="bg-white text-gray-800 p-4 rounded-lg max-w-md shadow-md">
            <p className="text-lg">Hello! I'm doing well, thank you. How are you?</p>
            <div className="flex space-x-2 mt-2 text-gray-500">
              <FaVolumeUp />
              <FaSyncAlt />
              <FaThumbsUp />
              <FaThumbsDown />
              <FaStar />
            </div>
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="border-t border-gray-300 p-4 bg-white text-gray-800 shadow-sm">
        <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full">
          <FaPaperclip className="text-gray-600" />
          <input type="text" placeholder="Message ChatGPT" className="flex-1 bg-transparent outline-none text-lg" />
          <FaPaperPlane className="text-gray-600" />
        </div>
        <p className="text-sm text-gray-500 mt-2">DSF-ChatDoc can make mistakes. Please check our FAQ and Terms and Services.</p>
      </div>
    </div>
  );
}









