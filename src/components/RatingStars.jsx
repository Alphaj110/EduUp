import { Star } from 'lucide-react';

const RatingStars = ({ rating = 0, maxRating = 5, size = 20, interactive = false, onRate }) => {
  const handleClick = (index) => {
    if (interactive && onRate) {
      onRate(index + 1);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:scale-110 transition' : ''}`}
          onClick={() => handleClick(index)}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
};

export default RatingStars;
