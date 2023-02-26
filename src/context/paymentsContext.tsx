import { actionsEnum } from '@/types/enums/typeEnum';
import { IPagination } from '@/types/pagination/pagination';
import { IPayment, IPaymentsUser } from '@/types/payments/payments';
import { createContext, useState } from 'react';

const PaymentsContext = createContext({
  payment: null,
  setPayment: (
    value: IPayment | { userId: string; payedForYear: string } | null
  ) => {},
  paymentModal: null,
  setPaymentModal: (value: actionsEnum | null) => {},
  userPaymentModal: false,
  setUserPaymentModal: (value: boolean) => {},
  selectedUser: null,
  setSelectedUser: (value: (IPaymentsUser & { _id: string }) | null) => {},
  paginations: {
    page: 1,
    size: 10,
    totalPages: 10,
  },
  setPaginations: (value: IPagination) => {},
});

export const PaymentsContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [selectedUser, setSelectedUser] = useState<
    (IPaymentsUser & { _id: string }) | null
  >(null);
  const [payment, setPayment] = useState<IPayment | null>(null);
  const [paymentModal, setPaymentModal] = useState<actionsEnum | null>(null);
  const [userPaymentModal, setUserPaymentModal] = useState<boolean>(false);
  const [paginations, setPaginations] = useState<IPagination>({
    page: 1,
    size: 10,
    totalPages: 10,
  });

  return (
    <PaymentsContext.Provider
      value={
        {
          payment,
          setPayment,
          paymentModal,
          setPaymentModal,
          userPaymentModal,
          setUserPaymentModal,
          selectedUser,
          setSelectedUser,
          paginations,
          setPaginations,
        } as any
      }
    >
      {children}
    </PaymentsContext.Provider>
  );
};

export default PaymentsContext;
