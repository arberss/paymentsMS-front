import AppShellLayout from '@/components/AppShell/AppShell';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <AppShellLayout>
      <Outlet />
    </AppShellLayout>
  );
};

export default Dashboard;
