import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Video, 
  Star, 
  Shield, 
  Clock,
  ChevronRight,
  Users,
  BookOpen,
  Award
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Learn From The Best Teachers Online
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Connect with qualified teachers for personalized one-on-one lessons. 
                Learn at your own pace, anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
                >
                  Get Started
                </button>
                <button 
                  onClick={() => navigate('/teachers')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition"
                >
                  Find a Teacher
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
                <Video size={100} className="mx-auto mb-4" />
                <p className="text-lg">Join 10,000+ students learning online</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How EduConnect Works</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Start learning in three simple steps
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Find Your Teacher</h3>
              <p className="text-gray-600">
                Browse qualified teachers by subject, availability, and ratings
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Book a Lesson</h3>
              <p className="text-gray-600">
                Choose a convenient time slot and make a secure payment
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Start Learning</h3>
              <p className="text-gray-600">
                Join your online lesson and learn from anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose EduConnect?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Star className="text-primary-600 mb-3" size={32} />
              <h3 className="text-lg font-semibold mb-2">Top-Rated Teachers</h3>
              <p className="text-gray-600 text-sm">
                Learn from experienced and verified educators
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="text-primary-600 mb-3" size={32} />
              <h3 className="text-lg font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-gray-600 text-sm">
                Book lessons at times that work for you
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="text-primary-600 mb-3" size={32} />
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">
                Safe and encrypted payment processing
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Video className="text-primary-600 mb-3" size={32} />
              <h3 className="text-lg font-semibold mb-2">HD Video Lessons</h3>
              <p className="text-gray-600 text-sm">
                Crystal clear video and audio quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Users size={40} className="mx-auto mb-3" />
              <p className="text-4xl font-bold mb-2">10,000+</p>
              <p className="text-primary-100">Active Students</p>
            </div>
            <div>
              <BookOpen size={40} className="mx-auto mb-3" />
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-primary-100">Expert Teachers</p>
            </div>
            <div>
              <Award size={40} className="mx-auto mb-3" />
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-primary-100">Subjects Available</p>
            </div>
            <div>
              <Star size={40} className="mx-auto mb-3" />
              <p className="text-4xl font-bold mb-2">4.8/5</p>
              <p className="text-primary-100">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students achieving their goals with EduConnect
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-primary-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition inline-flex items-center space-x-2"
          >
            <span>Sign Up Now</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
