// one of the best
import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import {
  FaVolumeUp, FaSyncAlt, FaThumbsUp, FaThumbsDown, FaStar, FaPaperclip,
  FaPaperPlane, FaChevronDown, FaTimes, FaExpand, FaCompress
} from 'react-icons/fa';
import axios from 'axios';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import TypingIndicator from '@/Utils/TypingIndicator'; // Ensure this is correctly imported
// import ProgressBar from '@/Utils/ProgressBar'; // Ensure this is correctly imported
import TypingEffect from '@/Utils/TypingEffect'; // Ensure this is correctly imported
import { incrementChatQueries } from '@/auth/firebaseFunctions'
// Set the workerSrc for PDF.js
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const customScrollBar = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  .custom-input-bar {
    position: relative;
    padding-bottom: 100px;
  }
`;
export default function ChatDocs() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = customScrollBar;
    document.head.append(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 400);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const onDrop = async (acceptedFiles) => {
    const filteredFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    if (filteredFiles.length > 0) {
      setLoading(true);
      const formData = new FormData();
      filteredFiles.forEach(file => {
        formData.append('files', file);
      });

      try {
        const response = await axios.post('https://www.dsfsmartdoc.com/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });

        if (response.status === 200) {
          setPdfFiles([...pdfFiles, ...filteredFiles]);
          setSelectedPdf(URL.createObjectURL(filteredFiles[0]));
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
        setUploadProgress(0);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessage = { text: inputValue, user: 'me' };
    setMessages([...messages, newMessage]);
    setInputValue('');
    setLoading(true);

    try {
      await incrementChatQueries(); // Increment the chat queries count

      const response = await axios.get(`https://www.dsfsmartdoc.com/hybrid-chat/?query=${inputValue}`);
      if (response.status === 200) {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: '', user: 'bot', isTyping: true, fullText: response.data.response || '' }
        ]);

        const botMessageIndex = messages.length;

        const typingInterval = setInterval(() => {
          setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            const botMessage = updatedMessages[botMessageIndex];
            if (botMessage && botMessage.fullText && botMessage.text.length < botMessage.fullText.length) {
              botMessage.text = botMessage.fullText.slice(0, botMessage.text.length + 1);
            } else {
              if (botMessage) botMessage.isTyping = false;
              clearInterval(typingInterval);
            }
            return updatedMessages;
          });
        }, 50);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Error: Unable to fetch response from the server.', user: 'bot' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Left Panel for PDF Viewer */}
      {pdfFiles.length > 0 && (
        <div className={`transition-all duration-300 ${expanded ? 'w-2/3' : 'w-2/4'} border-r border-gray-800`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center justify-between p-2 border-b border-gray-300 bg-grey text-gray-800 shadow-sm">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm pl-5">ChatGPT</span>
                <FaChevronDown />
              </div>
            </div>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => {
                setPdfFiles([]);
                setSelectedPdf(null);
              }}
            >
              <FaTimes />
            </button>
            <button
              className="bg-grey-500 text-white p-2 rounded"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            {selectedPdf && (
              <Viewer
                fileUrl={selectedPdf}
                plugins={[defaultLayoutPluginInstance]}
              />
            )}
          </div>
        </div>
      )}

      {/* Right Panel for Chat */}
      <div className={`flex flex-col ${pdfFiles.length > 0 ? 'w-2/3' : 'w-full h-full'}`}>
        {/* Chat Content */}
        <div className="flex-1 p-14 space-y-4 overflow-y-auto custom-scrollbar">
          {pdfFiles.length === 0 ? (
            <div
              {...getRootProps()}
              className={`border-dashed border-4 p-8 w-full h-full text-center flex items-center justify-center ${isDragActive ? 'border-grey-500' : 'border-gray-800'}`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.user === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-lg shadow-md max-w-xs ${msg.user === 'me' ? 'bg-gray-100 text-blue-800' : 'bg-white text-gray-800'}`}>
                    <p className="text-lg">
                      {msg.isTyping ? <TypingEffect text={msg.fullText || ''} /> : msg.text}
                    </p>
                    {msg.user === 'bot' && !msg.isTyping && (
                      <div className="flex space-x-2 mt-2 text-gray-500">
                        <FaVolumeUp />
                        <FaSyncAlt />
                        <FaThumbsUp />
                        <FaThumbsDown />
                        <FaStar />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="p-5 rounded-lg shadow-xl max-w-xs bg-grey text-gray-800">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {/* Input Field */}
        {/* <div className="border-t border-gray-300 p-2 bg-white text-gray-800 shadow-sm fixed bottom-0 w-full custom-input-bar"> */}
        <div className="flex items-center space-x-2 bg-gray-200 p-2 rounded-full">
          <FaPaperclip className="text-gray-600" />
          <input
            type="text"
            placeholder="Chat away with your document"
            className="flex-1 bg-transparent outline-none text-lg"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <FaPaperPlane className="text-gray-600 cursor-pointer" onClick={handleSendMessage} />
        </div>
        <p className="text-sm text-gray-500 mt-5">DSF-ChatDoc can make mistakes. Please check our FAQ and Terms and Services.</p>
        {/* </div> */}
      </div>

      {/* Progress Bar */}
      {/* {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <ProgressBar progress={uploadProgress} />
        </div>
      )} */}

      {/* Popup */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg text-gray-800">Chat away with your uploaded document!</p>
          </div>
        </div>
      )}
    </div>
  );
}









