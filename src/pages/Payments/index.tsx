import { PaymentsContextProvider } from '@/context/paymentsContext';
import PaymentsPage from './Payments';

const Payments = () => {
  return (
    <PaymentsContextProvider>
      <PaymentsPage />
    </PaymentsContextProvider>
  );
};

export default Payments;
