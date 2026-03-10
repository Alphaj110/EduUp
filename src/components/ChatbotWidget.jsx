import { useState } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';

const ChatbotWidget = ({ isOpen, onClose, dailyLimit = 10 }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your EduConnect AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [usageCount, setUsageCount] = useState(2);

  const handleSend = () => {
    if (!input.trim() || usageCount >= dailyLimit) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setUsageCount(prev => prev + 1);
    }, 1000);

    setInput('');
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('teacher') || input.includes('find')) {
      return 'You can find qualified teachers by visiting our "Find Teachers" page. You can filter by subject, availability, and location.';
    } else if (input.includes('book') || input.includes('lesson')) {
      return 'To book a lesson, select a teacher, view their profile, and choose an available time slot. Payment is processed securely through our platform.';
    } else if (input.includes('price') || input.includes('cost')) {
      return 'Teacher rates vary based on their experience and subjects. You can see the hourly rate on each teacher\'s profile.';
    } else {
      return 'I\'m here to help! You can ask me about finding teachers, booking lessons, payment methods, or how to get started on EduConnect.';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col max-h-[600px]">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle size={20} />
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs text-primary-100">Usually responds instantly</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-primary-700 p-1 rounded">
          <X size={20} />
        </button>
      </div>

      {/* Usage Indicator */}
      <div className="px-4 py-2 bg-gray-50 border-b text-sm text-gray-600">
        Daily usage: {usageCount}/{dailyLimit} questions
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        {usageCount >= dailyLimit ? (
          <p className="text-sm text-red-600 text-center">Daily limit reached. Try again tomorrow!</p>
        ) : (
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="input flex-grow"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="btn btn-primary"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotWidget;
