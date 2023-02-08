import { toast as cToas, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
  title?: string;
  status: 'info' | 'success' | 'warning' | 'error';
}

const options = {
  position: 'top-right' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

const toast = ({ title, status }: ToastProps) => {
  const generateToast = () => {
    switch (status) {
      case 'info':
        return cToas.info(title, options);
      case 'success':
        return cToas.success(title, options);
      case 'warning':
        return cToas.warning(title, options);
      case 'error':
        return cToas.error(title, options);
    }
  };

  return generateToast();
};

export default toast;
