import { Calendar, Clock, BookOpen, TrendingUp, Star, DollarSign } from 'lucide-react';

const Dashboard = ({ user }) => {
  const isTeacher = user?.role === 'teacher';

  // Mock data
  const upcomingLessons = [
    { id: 1, subject: 'Mathematics', teacher: 'Dr. Sarah Smith', student: 'John Doe', date: '2026-03-08', time: '10:00 AM' },
    { id: 2, subject: 'Physics', teacher: 'Prof. Michael Johnson', student: 'Jane Wilson', date: '2026-03-09', time: '2:00 PM' },
    { id: 3, subject: 'Chemistry', teacher: 'Dr. Emily Brown', student: 'Bob Anderson', date: '2026-03-10', time: '4:00 PM' },
  ];

  const stats = isTeacher
    ? [
        { label: 'Total Earnings', value: '$2,450', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Lessons This Month', value: '32', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { label: 'Active Students', value: '18', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
      ]
    : [
        { label: 'Upcoming Lessons', value: '3', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Completed Lessons', value: '12', icon: BookOpen, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Hours Learned', value: '24', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Subjects', value: '5', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">
          {isTeacher
            ? 'Here\'s an overview of your teaching activity'
            : 'Ready to continue your learning journey?'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={stat.color} size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Lessons */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Lessons</h2>
          <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </a>
        </div>

        <div className="space-y-4">
          {upcomingLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-primary-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{lesson.subject}</h3>
                  <p className="text-sm text-gray-600">
                    {isTeacher ? `with ${lesson.student}` : `with ${lesson.teacher}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{lesson.date}</p>
                <p className="text-sm text-gray-600">{lesson.time}</p>
              </div>
            </div>
          ))}
        </div>

        {upcomingLessons.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No upcoming lessons</p>
            {!isTeacher && (
              <button className="btn btn-primary mt-4">Find a Teacher</button>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {!isTeacher && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Find a Teacher</h3>
            <p className="mb-4 text-primary-100">Browse qualified teachers and book your next lesson</p>
            <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Browse Teachers
            </button>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">AI Assistant</h3>
            <p className="mb-4 text-purple-100">Get instant help with your questions</p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Ask a Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
