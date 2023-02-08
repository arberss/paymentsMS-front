import { decodeToken } from '@/utils/decodeToken';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteTypes {
  children: JSX.Element;
  redirectPath: string;
}

const ProtectedRoute = ({
  children,
  redirectPath = '/',
}: ProtectedRouteTypes) => {
  const decodedToken: { [key: string]: any } | null = decodeToken();

  if (!decodedToken) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
