import { useState } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  PhoneOff, 
  MessageSquare,
  Users,
  Clock,
  Maximize
} from 'lucide-react';

const OnlineLesson = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Teacher', text: 'Hello! Ready to start?', time: '10:00 AM' },
    { id: 2, sender: 'You', text: 'Yes, let\'s begin!', time: '10:01 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Mock lesson data
  const lesson = {
    teacher: 'Dr. Sarah Smith',
    subject: 'Mathematics',
    topic: 'Calculus - Derivatives',
    startTime: '10:00 AM',
    duration: '60 min',
    remainingTime: '45 min',
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{lesson.subject}</h1>
          <p className="text-sm text-gray-400">{lesson.topic} • {lesson.teacher}</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{lesson.remainingTime} remaining</span>
          </div>
          <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
          <span>Recording</span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-72px)]">
        {/* Main Video Area */}
        <div className="flex-grow flex flex-col">
          {/* Teacher Video (Large) */}
          <div className="flex-grow bg-gray-800 relative p-4">
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold">SS</span>
                  </div>
                  <p className="text-xl font-semibold">{lesson.teacher}</p>
                  <p className="text-gray-400">Teacher</p>
                </div>
              </div>

              {/* Screen Share Indicator */}
              <div className="absolute top-4 left-4 bg-green-500 px-3 py-1 rounded text-sm flex items-center space-x-2">
                <Monitor size={16} />
                <span>Screen Sharing</span>
              </div>

              {/* Fullscreen Button */}
              <button className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition">
                <Maximize size={20} />
              </button>
            </div>

            {/* Student Video (Small - Picture in Picture) */}
            <div className="absolute bottom-8 right-8 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
              <div className="w-full h-full flex items-center justify-center">
                {isVideoOn ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold">YOU</span>
                    </div>
                  </div>
                ) : (
                  <VideoOff size={32} className="text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 px-6 py-4 flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition ${
                isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition ${
                !isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>

            <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition">
              <Monitor size={24} />
            </button>

            <button
              onClick={() => setShowChat(!showChat)}
              className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <MessageSquare size={24} />
            </button>

            <button className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition">
              <PhoneOff size={24} />
            </button>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-gray-800 flex flex-col">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-gray-700">
              <h3 className="font-semibold flex items-center space-x-2">
                <MessageSquare size={20} />
                <span>Lesson Chat</span>
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    message.sender === 'You' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'You'
                        ? 'bg-primary-600'
                        : 'bg-gray-700'
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">{message.sender}</p>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineLesson;
