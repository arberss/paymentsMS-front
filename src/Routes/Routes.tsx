import Register from '@/pages/Auth/Register/Register';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Payments from '@/pages/Payments/Payments';
import { decodeToken } from '@/utils/decodeToken';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login/Login';
import ProtectedRoute from './ProtectedRoute';

const RoutesComponent = () => {
  const decodedToken: { [key: string]: any } | null = decodeToken();

  return (
    <Routes>
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute redirectPath='/auth/login'>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path='payments' element={<Payments />} />
      </Route>

      {!decodedToken && (
        <>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesComponent;