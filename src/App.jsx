import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import TeacherSearch from './pages/TeacherSearch';
import TeacherProfile from './pages/TeacherProfile';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import OnlineLesson from './pages/OnlineLesson';
import ChatbotPage from './pages/ChatbotPage';
import Ratings from './pages/Ratings';
import TeacherMap from './pages/TeacherMap';

function App() {
  const { user, login, logout } = useAuth();

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route element={<MainLayout user={user} onLogout={logout} />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/signup" element={<SignUp onSignUp={login} />} />
          <Route path="/teachers" element={<TeacherSearch />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/map" element={<TeacherMap />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Route>

        {/* Protected Routes - Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout userRole={user?.role} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard user={user} />} />
        </Route>

        {/* Protected Routes - Booking Flow */}
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <MainLayout user={user} onLogout={logout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Booking />} />
        </Route>

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <MainLayout user={user} onLogout={logout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Payment />} />
        </Route>

        {/* Protected Routes - Lesson & Rating */}
        <Route
          path="/lesson/:id"
          element={
            <ProtectedRoute>
              <OnlineLesson />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rate/:lessonId"
          element={
            <ProtectedRoute>
              <MainLayout user={user} onLogout={logout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Ratings />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
