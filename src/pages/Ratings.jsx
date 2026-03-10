import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Send } from 'lucide-react';
import RatingStars from '../components/RatingStars';

const Ratings = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Mock lesson data
  const lesson = {
    id: 1,
    teacher: {
      id: 1,
      name: 'Dr. Sarah Smith',
      avatar: null,
      subject: 'Mathematics',
    },
    date: '2026-03-06',
    topic: 'Calculus - Derivatives',
  };

  const categories = [
    { label: 'Knowledge', rating: 0 },
    { label: 'Communication', rating: 0 },
    { label: 'Patience', rating: 0 },
    { label: 'Preparation', rating: 0 },
  ];

  const [categoryRatings, setCategoryRatings] = useState(categories);

  const handleCategoryRating = (index, newRating) => {
    const updated = [...categoryRatings];
    updated[index].rating = newRating;
    setCategoryRatings(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please provide an overall rating');
      return;
    }

    // Simulate API call
    console.log({
      lessontId: lesson.id,
      teacherId: lesson.teacher.id,
      overallRating: rating,
      categoryRatings,
      review,
    });

    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">Your feedback has been submitted.</p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-primary-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Rate Your Lesson</h1>
            <p className="text-gray-600">Share your experience to help others and improve the platform</p>
          </div>

          {/* Teacher Info */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-8">
            <img
              src={lesson.teacher.avatar || `https://ui-avatars.com/api/?name=${lesson.teacher.name}&size=60`}
              alt={lesson.teacher.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{lesson.teacher.name}</h3>
              <p className="text-sm text-gray-600">{lesson.teacher.subject} • {lesson.date}</p>
              <p className="text-sm text-gray-500">{lesson.topic}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Overall Rating */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Experience</h3>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-2 transition hover:scale-110"
                  >
                    <Star
                      size={48}
                      className={`${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-gray-600">
                {rating === 0 && 'Click to rate'}
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            </div>

            {/* Category Ratings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Specific Areas</h3>
              <div className="space-y-4">
                {categoryRatings.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{category.label}</span>
                    <RatingStars
                      rating={category.rating}
                      interactive={true}
                      onRate={(newRating) => handleCategoryRating(index, newRating)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Written Review */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Write a Review (Optional)
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Share details about your experience to help other students
              </p>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="What did you like about the lesson? What could be improved?"
                className="input min-h-[120px] resize-none"
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-1 text-right">
                {review.length}/500 characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn btn-secondary flex-1"
              >
                Skip for Now
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Submit Rating</span>
              </button>
            </div>
          </form>
        </div>

        {/* Why Rate Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Why your rating matters</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• Helps other students find great teachers</li>
            <li>• Provides valuable feedback to teachers</li>
            <li>• Improves the overall quality of the platform</li>
            <li>• Your ratings are always anonymous unless you choose to write a review</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
