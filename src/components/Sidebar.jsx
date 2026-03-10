import { Link } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Calendar, 
  History, 
  MessageSquare, 
  User, 
  Settings,
  DollarSign,
  Clock
} from 'lucide-react';

const Sidebar = ({ userRole }) => {
  const studentLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/teachers', icon: Search, label: 'Find Teachers' },
    { to: '/lessons', icon: Calendar, label: 'Upcoming Lessons' },
    { to: '/history', icon: History, label: 'Lesson History' },
    { to: '/chatbot', icon: MessageSquare, label: 'AI Assistant' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const teacherLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/availability', icon: Clock, label: 'Manage Availability' },
    { to: '/lessons', icon: Calendar, label: 'Upcoming Lessons' },
    { to: '/earnings', icon: DollarSign, label: 'Earnings' },
    { to: '/chatbot', icon: MessageSquare, label: 'AI Assistant' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const links = userRole === 'teacher' ? teacherLinks : studentLinks;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition"
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
