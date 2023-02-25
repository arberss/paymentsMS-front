import { useContext, useEffect, useState } from 'react';
import NavbarHeader from '@/components/Navbar/NavbarHeader';
import Table, { columnRowType } from '@/components/Table/Table';
import { PaymentsMapper } from '@/mappers/PaymentsMapper';
import AddPayment from './create/AddPayment';
import TableTopActions from '@/components/TableTopActions/TableTopActions';
import moment from 'moment';
import { actionsEnum } from '@/types/enums/typeEnum';
import { IPayment, IPaymentsUser } from '@/types/payments/payments';
import { IUser } from '@/types/user/user';
import { Actions } from '@/components/Table/actions/TableActions';
import { IconEye } from '@tabler/icons-react';
import UserPayments from './userPayments/UserPayments';
import Loader from '@/components/Loader/Loader';
import { endpoints } from '@/config/endpoints';
import { usePagination } from '@/hooks/usePagination';
import { useQuery } from '@/hooks/useQuery';
import PaymentsContext from '@/context/paymentsContext';

const Payments = () => {
  const paymentsContext = useContext(PaymentsContext);

  const {
    data: payments = { data: [], pagination: {} },
    isLoading: loading,
    isSuccess,
    isFetching,
  } = usePagination<any>(endpoints.payments, {
    page: paymentsContext.paginations.page,
    size: paymentsContext.paginations.size,
  });

  useQuery(endpoints.users);

  useEffect(() => {
    if (isSuccess) {
      paymentsContext.setPaginations(payments.pagination);
    }
  }, [isSuccess]);

  const [clickedRowId, setClickedRowId] = useState<string | undefined>(
    undefined
  );

  const { columns, rows, bottomRows } = PaymentsMapper({
    data: payments.data,
    clickedRowId,
  });

  const tableActions = [
    ({ rowData }: { rowData?: { [key: string]: any } }): Actions => ({
      type: 'detail',
      text: 'Edit',
      svgComponent: <IconEye size={18} />,
      action: (): void => {
        const getUserPayments = payments.data.find(
          (payment: IPaymentsUser) =>
            payment.user.personalNumber === rowData?.key
        );
        paymentsContext.setSelectedUser(getUserPayments);
        paymentsContext.setUserPaymentModal(true);
      },
    }),
  ];

  const options = {
    actionColumn: {
      frozen: true,
      width: 20,
    },
    pagination: {
      activePage: paymentsContext.paginations.page,
      size: paymentsContext.paginations.size,
      totalPages: paymentsContext.paginations.totalPages,
      onChange: (selectedNumber: number) => {
        paymentsContext.setPaginations({
          ...paymentsContext.paginations,
          page: selectedNumber,
        });
      },
      onSizeChange: (selectedNumber: string) => {
        paymentsContext.setPaginations({
          ...paymentsContext.paginations,
          page: 1,
          size: +selectedNumber,
        });
      },
    },
  };

  const onRowClick = (column: columnRowType, row: columnRowType) => {
    setClickedRowId(column.userPaymentsId);
  };

  const onRowDoubleClick = (column: columnRowType, row: columnRowType) => {
    if (row.key === 'actions') {
      return;
    }

    if (isNaN(Number(row.key))) {
      handleAddPayment(actionsEnum.add);
      return;
    }

    const userPayments = payments.data.find(
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

    paymentsContext.setPayment(data);
    handleAddPayment(payment ? actionsEnum.edit : actionsEnum.emptyEdit);
  };

  const handleAddPayment = (value: actionsEnum | null) => {
    paymentsContext.setPaymentModal(value);
  };

  const handleCloseModal = () => {
    handleAddPayment(null);
    paymentsContext.setPayment(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='relative'>
      <NavbarHeader title='Pagesat' color='dark' />
      <TableTopActions
        title='Shto pagesë'
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
        options={options}
        bottomRows={
          [bottomRows] as { [key: string]: string | number; key: string }[]
        }
        style={{ blockSize: 'unset' }}
      />
      <AddPayment
        title={
          paymentsContext.paymentModal === actionsEnum.add
            ? 'Shto pagesë'
            : 'Ndrysho pagesën'
        }
        isOpen={Boolean(paymentsContext.paymentModal)}
        onClose={handleCloseModal}
        action={paymentsContext.paymentModal ?? actionsEnum.add}
        selectedPayment={paymentsContext.payment}
      />
      <UserPayments />
      {isFetching && <Loader position='absolute' />}
    </div>
  );
};

export default Payments;
