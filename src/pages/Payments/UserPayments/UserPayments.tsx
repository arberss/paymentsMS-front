import Table from '@/components/Table/Table';
import PaymentsContext from '@/context/paymentsContext';
import { PaymentsMapper } from '@/mappers/PaymentsMapper';
import { IPaymentsUser } from '@/types/payments/payments';
import { Modal } from '@mantine/core';
import { useContext } from 'react';

const UserPayments = () => {
  const {
    selectedUser,
    setSelectedUser,
    userPaymentModal,
    setUserPaymentModal,
  } = useContext(PaymentsContext);

  const { columns, rows } = PaymentsMapper({
    data: selectedUser ? [selectedUser] : [],
  });

  const handleClose = () => {
    setUserPaymentModal(false);
    setSelectedUser(null);
  };

  return (
    <Modal
      opened={userPaymentModal}
      size='80%'
      title={`${(selectedUser as IPaymentsUser | null)?.user?.firstName} ${
        (selectedUser as IPaymentsUser | null)?.user?.lastName
      }`}
      onClose={handleClose}
      closeOnClickOutside={true}
      styles={(theme) => ({
        modal: {
          [theme.fn.smallerThan('sm')]: { width: '100%' },
        },
      })}
    >
      <Table
        columns={columns}
        rows={rows}
        exports={{ excel: true, pdf: true }}
      />
    </Modal>
  );
};

export default UserPayments;
