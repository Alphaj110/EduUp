import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookingCalendar = ({ availableSlots = [], onSelectSlot, selectedSlot }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate calendar days for the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    return availableSlots.some(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.toDateString() === date.toDateString();
    });
  };

  const handleDateClick = (date) => {
    if (isDateAvailable(date) && onSelectSlot) {
      onSelectSlot(date);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isAvailable = isDateAvailable(day);
          const isSelected = selectedSlot && day && 
            new Date(selectedSlot).toDateString() === day.toDateString();
          const isPast = day && day < new Date().setHours(0, 0, 0, 0);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={!day || !isAvailable || isPast}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm
                ${!day ? 'invisible' : ''}
                ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                ${isAvailable && !isPast ? 'bg-primary-50 text-primary-600 hover:bg-primary-100 cursor-pointer' : ''}
                ${!isAvailable && !isPast && day ? 'text-gray-400' : ''}
                ${isSelected ? 'bg-primary-600 text-white' : ''}
              `}
            >
              {day ? day.getDate() : ''}
            </button>
          );
        })}
      </div>

      {/* Time Slots (if a date is selected) */}
      {selectedSlot && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Available Times:</h4>
          <div className="grid grid-cols-3 gap-2">
            {availableSlots
              .filter(slot => new Date(slot.date).toDateString() === new Date(selectedSlot).toDateString())
              .map((slot, index) => (
                <button
                  key={index}
                  onClick={() => onSelectSlot && onSelectSlot(slot)}
                  className="py-2 px-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition text-sm"
                >
                  {slot.time}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
