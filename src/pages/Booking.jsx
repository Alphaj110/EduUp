import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, DollarSign, CheckCircle } from 'lucide-react';
import BookingCalendar from '../components/BookingCalendar';
import { teachers } from '../data/mockData';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const teacher = teachers.find((t) => t.id === parseInt(id));

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');

  const availableSlots = [
    { date: '2026-03-08', time: '10:00 AM' },
    { date: '2026-03-08', time: '2:00 PM' },
    { date: '2026-03-09', time: '11:00 AM' },
    { date: '2026-03-09', time: '3:00 PM' },
    { date: '2026-03-10', time: '9:00 AM' },
    { date: '2026-03-10', time: '4:00 PM' },
    { date: '2026-03-11', time: '1:00 PM' },
    { date: '2026-03-12', time: '10:00 AM' },
  ];

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

  const totalPrice = (teacher.hourlyRate * duration) / 60;

  const handleConfirmBooking = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    // Navigate to payment page with booking details
    navigate('/payment', { state: { teacher, selectedSlot, duration, totalPrice, notes } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/teacher/${teacher.id}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back to Profile</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book a Lesson</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teacher Info */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Teacher</h2>
              <div className="flex items-center space-x-4">
                <img
                  src={teacher.avatar || `https://ui-avatars.com/api/?name=${teacher.name}&size=60`}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                  <p className="text-sm text-gray-600">{teacher.subjects.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h2>
              <BookingCalendar
                availableSlots={availableSlots}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />
            </div>

            {/* Duration */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lesson Duration</h2>
              <div className="grid grid-cols-3 gap-4">
                {[30, 60, 90].map((min) => (
                  <button
                    key={min}
                    onClick={() => setDuration(min)}
                    className={`p-4 border-2 rounded-lg transition ${
                      duration === min
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Clock className="mx-auto mb-2" size={24} />
                    <p className="font-semibold">{min} minutes</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes (Optional)</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell the teacher what you'd like to focus on..."
                className="input min-h-[100px] resize-none"
              />
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>

              <div className="space-y-4 mb-6">
                {selectedSlot ? (
                  <>
                    <div className="flex items-start space-x-3">
                      <Calendar className="text-primary-600 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Date & Time</p>
                        <p className="font-semibold">
                          {typeof selectedSlot === 'object' && selectedSlot.date
                            ? `${selectedSlot.date} at ${selectedSlot.time}`
                            : new Date(selectedSlot).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="text-primary-600 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold">{duration} minutes</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar size={48} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">Select a date and time</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Hourly Rate</span>
                  <span className="font-semibold">${teacher.hourlyRate}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{duration} min</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={!selectedSlot}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span>Free cancellation up to 24h before</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span>Instant booking confirmation</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-600 mt-0.5" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
