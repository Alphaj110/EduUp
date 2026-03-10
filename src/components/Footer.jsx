import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold text-white">EduConnect</span>
            </div>
            <p className="text-sm text-gray-400">
              Connecting students with qualified teachers for personalized online learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/teachers" className="hover:text-primary-400 transition">Find Teachers</Link></li>
              <li><Link to="/signup" className="hover:text-primary-400 transition">Become a Teacher</Link></li>
              <li><Link to="/map" className="hover:text-primary-400 transition">Teacher Map</Link></li>
              <li><Link to="/chatbot" className="hover:text-primary-400 transition">AI Assistant</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>support@educonnect.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>123 Education St, NY</span>
              </li>
            </ul>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} EduConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
