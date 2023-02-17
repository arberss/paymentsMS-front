import Table from '@/components/Table/Table';
import { PaymentsMapper } from '@/mappers/PaymentsMapper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setModalOpen,
  setUserPayments,
} from '@/store/slices/payments/userPaymentsSlice';
import { Modal } from '@mantine/core';

const UserPayments = () => {
  const dispatch = useAppDispatch();

  const {
    userPayments: { isModalOpen, userPayments },
  } = useAppSelector((state) => state.payments);

  const { columns, rows } = PaymentsMapper({
    data: userPayments ? [userPayments] : [],
  });

  const handleClose = () => {
    dispatch(setModalOpen(false));
    dispatch(setUserPayments(null));
  };

  return (
    <Modal
      opened={isModalOpen}
      size='80%'
      title={`${userPayments?.user?.firstName} ${userPayments?.user?.lastName}`}
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
