import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeProvider';
import { useContext, useEffect } from 'react';
import { decodeToken } from './utils/decodeToken';
import { ToastContainer } from 'react-toastify';
import RoutesComponent from './routes/Routes';
import moment from 'moment';
import 'moment/dist/locale/sq';
import AuthContext from './context/authContext';
moment.locale('sq');

function App() {
  const { isAuth, handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const decodedToken: { [key: string]: any } | null = decodeToken();

    if (!decodedToken) {
      handleLogout();
    }
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
