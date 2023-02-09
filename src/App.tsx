import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeProvider';
import { useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { decodeToken } from './utils/decodeToken';
import { checkLogin, logout } from '@/store/slices/auth/loginSlice';
import { ToastContainer } from 'react-toastify';
import RoutesComponent from './Routes/Routes';
import { getStatuses } from './store/slices/statuses/statusesSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStatuses());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken: { [key: string]: any } | null = decodeToken();

    if (!decodedToken) {
      dispatch(logout());
    }
    dispatch(checkLogin({ token }));
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
