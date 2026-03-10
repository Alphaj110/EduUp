import { useState } from 'react';
import { MapPin, Search, X, DollarSign, Star } from 'lucide-react';
import { teachers } from '../data/mockData';

const TeacherMap = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter teachers based on search
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
    teacher.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock map coordinates for teachers
  const teacherMarkers = filteredTeachers.map((teacher, index) => ({
    ...teacher,
    lat: 40.7128 + (Math.random() - 0.5) * 0.5, // Mock NYC coordinates with variance
    lng: -74.0060 + (Math.random() - 0.5) * 0.5,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-md p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Teachers Near You</h1>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, subject, or location..."
                className="input pl-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-grow relative">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100">
            {/* Map Placeholder */}
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="text-center">
                <MapPin size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 text-lg mb-2">Interactive Map Placeholder</p>
                <p className="text-gray-500 text-sm">
                  In production, integrate with Google Maps, Mapbox, or Leaflet
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Showing {teacherMarkers.length} teachers
                </p>
              </div>

              {/* Mock Markers */}
              {teacherMarkers.map((teacher, index) => (
                <button
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className="absolute w-10 h-10 bg-primary-600 rounded-full border-4 border-white shadow-lg hover:scale-110 transition flex items-center justify-center"
                  style={{
                    left: `${(teacher.lng + 74.0060) * 100 + 30}%`,
                    top: `${(40.7128 - teacher.lat) * 100 + 30}%`,
                  }}
                >
                  <MapPin className="text-white" size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Teacher Info Card (when selected) */}
          {selectedTeacher && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
              <div className="card relative">
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>

                <div className="flex items-start space-x-4">
                  <img
                    src={selectedTeacher.avatar || `https://ui-avatars.com/api/?name=${selectedTeacher.name}&size=80`}
                    alt={selectedTeacher.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />

                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {selectedTeacher.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-2 text-gray-600 text-sm">
                      <MapPin size={14} />
                      <span>{selectedTeacher.location}</span>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400 fill-yellow-400" size={16} />
                        <span className="text-sm font-medium">{selectedTeacher.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-primary-600">
                        <DollarSign size={16} />
                        <span className="text-sm font-semibold">{selectedTeacher.hourlyRate}/hr</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedTeacher.subjects.slice(0, 3).map((subject, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {selectedTeacher.description}
                    </p>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.location.href = `/teacher/${selectedTeacher.id}`}
                        className="btn btn-outline flex-1 text-sm py-2"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => window.location.href = `/book/${selectedTeacher.id}`}
                        className="btn btn-primary flex-1 text-sm py-2"
                      >
                        Book Lesson
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <button className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition">
              <span className="text-xl font-bold text-gray-700">+</span>
            </button>
            <button className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition block">
              <span className="text-xl font-bold text-gray-700">−</span>
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-4 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <MapPin className="text-primary-600" size={20} />
              <span>Map Legend</span>
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• Blue markers = Available teachers</p>
              <p>• Click marker to view details</p>
              <p>• {filteredTeachers.length} teachers shown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherMap;
