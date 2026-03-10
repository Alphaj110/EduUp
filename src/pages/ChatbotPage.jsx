import { useState } from 'react';
import ChatbotWidget from '../components/ChatbotWidget';
import { MessageCircle, Send, TrendingUp, BookOpen, DollarSign, Clock } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your EduConnect AI assistant. I can help you with:\n\n• Finding teachers\n• Booking lessons\n• Payment questions\n• Platform usage\n• General inquiries\n\nWhat would you like to know?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [dailyLimit] = useState(10);

  const quickQuestions = [
    { icon: BookOpen, text: 'How do I book a lesson?', category: 'Booking' },
    { icon: DollarSign, text: 'What are the payment options?', category: 'Payment' },
    { icon: TrendingUp, text: 'How do I become a teacher?', category: 'Teaching' },
    { icon: Clock, text: 'Can I cancel a lesson?', category: 'Cancellation' },
  ];

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('book') || input.includes('lesson')) {
      return 'To book a lesson:\n\n1. Browse teachers on the "Find Teachers" page\n2. View a teacher\'s profile\n3. Select an available time slot\n4. Complete the payment\n\nYou\'ll receive instant confirmation and can access the lesson from your dashboard.';
    } else if (input.includes('payment') || input.includes('pay') || input.includes('cost')) {
      return 'We accept:\n\n• Credit/Debit Cards (Visa, Mastercard, Amex)\n• PayPal\n• Apple Pay\n• Google Pay\n\nAll payments are secure and encrypted. Teacher rates vary from $20-$100/hour depending on subject and experience.';
    } else if (input.includes('teacher') && (input.includes('become') || input.includes('teach'))) {
      return 'To become a teacher:\n\n1. Sign up and select "Teacher" role\n2. Complete your profile with qualifications\n3. Set your availability and rates\n4. Wait for verification (24-48 hours)\n5. Start teaching!\n\nWe take a 15% platform fee from each lesson.';
    } else if (input.includes('cancel')) {
      return 'Cancellation policy:\n\n• Free cancellation up to 24 hours before the lesson\n• 50% refund if cancelled 12-24 hours before\n• No refund if cancelled less than 12 hours before\n\nYou can cancel from your dashboard under "Upcoming Lessons".';
    } else if (input.includes('rating') || input.includes('review')) {
      return 'After each lesson, you can rate your teacher (1-5 stars) and leave a review. This helps other students find great teachers and helps teachers improve their service.';
    } else if (input.includes('video') || input.includes('technical')) {
      return 'Technical requirements:\n\n• Stable internet connection (minimum 5 Mbps)\n• Webcam and microphone\n• Modern browser (Chrome, Firefox, Safari, Edge)\n• No software download required\n\nWe recommend testing your connection before your first lesson.';
    } else {
      return 'I\'m here to help! You can ask me about:\n\n• Finding and booking teachers\n• Payment methods and pricing\n• Becoming a teacher\n• Cancellation policies\n• Technical requirements\n• General platform questions\n\nWhat would you like to know?';
    }
  };

  const handleSend = (message = input) => {
    const questionText = message || input;
    if (!questionText.trim() || usageCount >= dailyLimit) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: questionText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(questionText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setUsageCount(prev => prev + 1);
    }, 1000);

    setInput('');
  };

  const handleQuickQuestion = (question) => {
    handleSend(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Assistant</h1>
          <p className="text-gray-600">Get instant answers to your questions</p>
        </div>

        {/* Usage Indicator */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Daily Usage</p>
              <p className="text-2xl font-bold text-gray-900">{usageCount} / {dailyLimit}</p>
            </div>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 transition-all duration-300"
                style={{ width: `${(usageCount / dailyLimit) * 100}%` }}
              />
            </div>
          </div>
          {usageCount >= dailyLimit && (
            <p className="text-sm text-red-600 mt-2">Daily limit reached. Resets in 24 hours.</p>
          )}
        </div>

        {/* Quick Questions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(q.text)}
                disabled={usageCount >= dailyLimit}
                className="card text-left hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <q.icon className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{q.category}</p>
                    <p className="font-medium text-gray-900">{q.text}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="card">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t pt-4">
            {usageCount >= dailyLimit ? (
              <div className="text-center py-6 text-gray-500">
                <p className="font-medium mb-2">Daily limit reached</p>
                <p className="text-sm">You've used all {dailyLimit} questions for today. Come back tomorrow!</p>
              </div>
            ) : (
              <div className="flex space-x-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question... (Press Enter to send)"
                  className="input flex-grow resize-none"
                  rows="2"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="btn btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
