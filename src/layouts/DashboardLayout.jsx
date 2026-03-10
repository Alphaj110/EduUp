import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ userRole }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
