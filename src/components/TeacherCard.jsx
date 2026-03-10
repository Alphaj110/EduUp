import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';
import { MapPin, BookOpen, DollarSign } from 'lucide-react';

const TeacherCard = ({ teacher }) => {
  const navigate = useNavigate();

  return (
    <div className="card hover:shadow-lg transition cursor-pointer" onClick={() => navigate(`/teacher/${teacher.id}`)}>
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <img
          src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.name}&size=80`}
          alt={teacher.name}
          className="w-20 h-20 rounded-full object-cover"
        />

        {/* Details */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900">{teacher.name}</h3>
          
          <div className="flex items-center space-x-2 mt-1 text-gray-600 text-sm">
            <MapPin size={14} />
            <span>{teacher.location}</span>
          </div>

          <div className="mt-2">
            <RatingStars rating={teacher.rating} />
          </div>

          <div className="flex items-center space-x-2 mt-2 text-gray-600 text-sm">
            <BookOpen size={14} />
            <span>{teacher.subjects.join(', ')}</span>
          </div>

          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {teacher.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-1 text-primary-600 font-semibold">
              <DollarSign size={18} />
              <span>{teacher.hourlyRate}/hour</span>
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/book/${teacher.id}`);
              }}
            >
              Book Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
