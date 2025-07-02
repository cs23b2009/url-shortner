
import { Dashboard } from '@/components/Dashboard';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-6">
        <Dashboard />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
