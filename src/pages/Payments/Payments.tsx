import { useEffect, useState } from 'react';
import NavbarHeader from '@/components/Navbar/NavbarHeader';
import Table, { columnRowType } from '@/components/Table/Table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getPayments } from '@/store/slices/payments/paymentsSlice';
import {
  setPayment,
  setPaymentModalValue,
} from '@/store/slices/payments/addPaymentSlice';
import { PaymentsMapper } from '@/mappers/Payments/PaymentsMapper';
import AddPayment from './Create/AddPayment';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import moment from 'moment';
import { getUsers } from '@/store/slices/user/usersSlice';
import { actionsEnum } from '@/types/enums/typeEnum';
import { IPayment, IPaymentsUser } from '@/types/payments/payments';
import { IUser } from '@/types/user/user';
import { Actions } from '@/components/Table/Actions/TableActions';
import { IconEye } from '@tabler/icons-react';
import UserPayments from './UserPayments/UserPayments';
import {
  setModalOpen,
  setUserPayments,
} from '@/store/slices/payments/userPaymentsSlice';
import Loader from '@/components/Loader/Loader';

const Payments = () => {
  const dispatch = useAppDispatch();
  const {
    payments: { payments, loading },
    addPayment: { openPaymentModal, payment },
  } = useAppSelector((state) => state.payments);

  const [clickedRowId, setClickedRowId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    dispatch(getPayments());
    dispatch(getUsers());
  }, []);

  const { columns, rows } = PaymentsMapper({ payments, clickedRowId });

  const tableActions = [
    ({ rowData }: { rowData?: { [key: string]: any } }): Actions => ({
      type: 'detail',
      text: 'Edit',
      svgComponent: <IconEye size={18} />,
      action: (): void => {
        const getUserPayments = payments.find(
          (payment: IPaymentsUser) =>
            payment.user.personalNumber === rowData?.key
        );
        dispatch(setUserPayments(getUserPayments));
        dispatch(setModalOpen(true));
      },
    }),
  ];

  const onRowClick = (column: columnRowType, row: columnRowType) => {
    if (row.key === 'name') {
      setClickedRowId(column.userPaymentsId);
    }
  };

  const onRowDoubleClick = (column: columnRowType, row: columnRowType) => {
    if (row.key === 'actions') {
      return;
    }

    if (isNaN(Number(row.key))) {
      handleAddPayment(actionsEnum.add);
      return;
    }

    const userPayments = payments.find(
      (payment: { payments: IPayment[]; user: IUser }) =>
        payment.user.personalNumber === column.key
    );
    const payment = userPayments.payments.find(
      (payment: IPayment) => payment._id === column.paymentIds[row.key]
    );

    const data = payment
      ? {
          ...payment,
          userId: userPayments.user._id,
          exchange: Number(payment.exchange),
          payedForYear: String(payment.payedForYear),
          paymentDate: moment(payment.paymentDate).toDate(),
        }
      : {
          userId: userPayments.user._id,
          payedForYear: String(row.key),
        };

    dispatch(setPayment(data));
    handleAddPayment(payment ? actionsEnum.edit : actionsEnum.emptyEdit);
  };

  const handleAddPayment = (value: actionsEnum | null) => {
    dispatch(setPaymentModalValue(value));
  };

  const handleCloseModal = () => {
    handleAddPayment(null);
    dispatch(setPayment(null));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <NavbarHeader title='Pagesat' color='dark' />
      <TableTopActions
        title='Shto Pagesë'
        onClick={() => handleAddPayment(actionsEnum.add)}
        sx={{ marginBottom: 10 }}
      />
      <Table
        columns={columns}
        rows={rows}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
        exports={{ excel: true, pdf: true }}
        actions={tableActions}
        options={{
          actionColumn: {
            frozen: true,
            width: 20,
          },
        }}
      />
      <AddPayment
        title={
          openPaymentModal === actionsEnum.add
            ? 'Shto Pagesë'
            : 'Ndrysho Pagesën'
        }
        isOpen={Boolean(openPaymentModal)}
        onClose={handleCloseModal}
        action={openPaymentModal ?? actionsEnum.add}
        selectedPayment={payment}
      />
      <UserPayments />
    </>
  );
};

export default Payments;
