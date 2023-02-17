import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeProvider';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { decodeToken } from './utils/decodeToken';
import { checkLogin, logout } from '@/store/slices/auth/loginSlice';
import { ToastContainer } from 'react-toastify';
import RoutesComponent from './routes/Routes';
import { getStatuses } from './store/slices/statuses/statusesSlice';
import moment from 'moment';
import 'moment/dist/locale/sq';
moment.locale('sq');

function App() {
  const dispatch = useAppDispatch();
  const {
    login: { isAuth },
  } = useAppSelector((state) => state.auth);

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
  }, [isAuth]);

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
