import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, BookOpen, Award, Clock, DollarSign, Calendar, ChevronLeft } from 'lucide-react';
import RatingStars from '../components/RatingStars';
import { teachers } from '../data/mockData';

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const teacher = teachers.find((t) => t.id === parseInt(id));

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Teacher not found</h2>
          <button onClick={() => navigate('/teachers')} className="btn btn-primary">
            Back to Teachers
          </button>
        </div>
      </div>
    );
  }

  const reviews = [
    { id: 1, student: 'John Doe', rating: 5, comment: 'Excellent teacher! Very patient and knowledgeable.', date: '2026-02-15' },
    { id: 2, student: 'Jane Smith', rating: 5, comment: 'Great explanations and very helpful.', date: '2026-02-10' },
    { id: 3, student: 'Bob Wilson', rating: 4, comment: 'Good teacher, would recommend.', date: '2026-02-05' },
  ];

  const availableSlots = [
    { date: '2026-03-08', time: '10:00 AM' },
    { date: '2026-03-08', time: '2:00 PM' },
    { date: '2026-03-09', time: '11:00 AM' },
    { date: '2026-03-09', time: '3:00 PM' },
    { date: '2026-03-10', time: '9:00 AM' },
    { date: '2026-03-10', time: '4:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/teachers')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back to Teachers</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Profile Card */}
            <div className="card">
              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <img
                  src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.name}&size=150`}
                  alt={teacher.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{teacher.name}</h1>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={18} />
                      <span>{teacher.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock size={18} />
                      <span>{teacher.experience} years experience</span>
                    </div>
                  </div>

                  <RatingStars rating={teacher.rating} size={24} />

                  <div className="flex items-center space-x-2 mt-4">
                    <DollarSign className="text-primary-600" size={24} />
                    <span className="text-2xl font-bold text-primary-600">${teacher.hourlyRate}/hour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
            </div>

            {/* Subjects */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <BookOpen size={24} />
                <span>Subjects</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Award size={24} />
                <span>Qualifications</span>
              </h2>
              <ul className="space-y-2">
                {teacher.qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <span className="text-gray-700">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Student Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{review.student}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <RatingStars rating={review.rating} />
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="card sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Book a Lesson</h2>
              
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Available Slots</p>
                <div className="space-y-2">
                  {availableSlots.slice(0, 4).map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-sm">{slot.date}</span>
                      </div>
                      <span className="text-sm font-medium">{slot.time}</span>
                    </div>
                  ))}
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-700 mt-2">
                  View all slots
                </button>
              </div>

              <button
                onClick={() => navigate(`/book/${teacher.id}`)}
                className="btn btn-primary w-full"
              >
                Book a Lesson
              </button>

              <button className="btn btn-outline w-full mt-3">
                Send Message
              </button>

              <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                <div className="flex justify-between mb-2">
                  <span>Hourly Rate:</span>
                  <span className="font-semibold">${teacher.hourlyRate}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Response Time:</span>
                  <span className="font-semibold">Within 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Lesson Types:</span>
                  <span className="font-semibold">Video Call</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
