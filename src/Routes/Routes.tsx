import Actions from '@/pages/Actions/Actions';
import Register from '@/pages/Auth/Register/Register';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Payments from '@/pages/Payments';
import Statuses from '@/pages/Statuses/Statuses';
import { decodeToken } from '@/utils/decodeToken';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Auth/Login/Login';
import ProtectedRoute from './ProtectedRoute';

const RoutesComponent = () => {
  const decodedToken: { [key: string]: any } | null = decodeToken();

  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute redirectPath='/auth/login'>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path='payments' element={<Payments />} />
        <Route path='statuses' element={<Statuses />} />
        <Route path='actions' element={<Actions />} />
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
