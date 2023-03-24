import DatePicker from '@/shared-components/Form/DatePicker/DatePicker';
import Input from '@/shared-components/Form/Input/Input';
import NumberInput from '@/shared-components/Form/Input/NumberInput';
import Select from '@/shared-components/Form/Select/Select';
import { Button, Grid, Modal } from '@mantine/core';
import { FormikValues, useFormik } from 'formik';
import moment from 'moment';
import { usersOptions, validationSchema } from './helper';
import { actionsEnum } from '@/types/enums/typeEnum';
import { IPayment } from '@/types/payments/payments';
import Loader from '@/components/Loader/Loader';
import { useContext, useState } from 'react';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { getYears } from '@/utils/general';
import { useQuery } from '@/hooks/useQuery';
import { endpoints } from '@/config/endpoints';
import { IUser } from '@/types/user/user';
import { usePutMutation } from '@/hooks/useMutation';
import { useQueryClient } from 'react-query';
import PaymentsContext from '@/context/paymentsContext';

interface AddPaymentProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  action: actionsEnum;
  selectedPayment: FormikValues | null;
}

type InitialValuesType = IPayment & {
  userId: string;
};

const initialValues: InitialValuesType = {
  userId: '',
  reason: '',
  paymentDate: moment().toDate(),
  payedForYear: Number(moment().year()),
  exchange: '',
  amount: 0,
  payer: '',
  paymentReceiver: '',
};

const AddPayment = ({
  title,
  isOpen,
  onClose,
  action,
  selectedPayment,
}: AddPaymentProps) => {
  const paymentsContext = useContext(PaymentsContext);

  const [confirmDeleteModal, setConfirmDeleteModal] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { data: users = [] } = useQuery<IUser[]>(endpoints.users);
  const deleteMutation = usePutMutation(
    endpoints.deletePayment.replace('::paymentId', selectedPayment?._id)
  );

  const actionValues = {
    [actionsEnum.add]: {
      initialValues,
    },
    [actionsEnum.edit]: {
      initialValues: { ...initialValues, ...selectedPayment },
    },
    [actionsEnum.emptyEdit]: {
      initialValues: { ...initialValues, ...selectedPayment },
    },
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries(endpoints.payments);
    paymentsContext.setPaymentModal(null);
  };

  const formik = useFormik({
    initialValues: actionValues[action].initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        ...values,
        exchange: values.exchange.toString(),
        payedForYear: Number(values.payedForYear),
      };
      if ([actionsEnum.add, actionsEnum.emptyEdit].includes(action)) {
        putMutation.mutate(data, {
          onSuccess() {
            handleSuccess();
          },
        });
      } else {
        putEditMutation.mutate(data, {
          onSuccess() {
            handleSuccess();
          },
        });
      }
    },
  });

  const putMutation = usePutMutation(
    endpoints.addPayment.replace('::userId', formik.values.userId)
  );
  const putEditMutation = usePutMutation(
    endpoints.editPayment
      .replace('::userId', formik.values.userId)
      .replace('::paymentId', formik.values._id ? formik.values._id : '')
  );

  const handleDelete = () => {
    deleteMutation.mutate(
      {},
      {
        onSuccess() {
          handleSuccess();
        },
      }
    );
    setConfirmDeleteModal(false);
  };

  const handleCloseModal = () => {
    onClose();
    formik.resetForm();
  }

  return (
    <Modal
      opened={isOpen}
      size='lg'
      onClose={handleCloseModal}
      title={title}
      closeOnClickOutside={false}
      centered
      closeOnEscape
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid sx={{ margin: '10px 0' }} gutter='md'>
          <Grid.Col xs={12} sm={6} md={6}>
            <Select
              name='userId'
              label='Zgjedh personin'
              data={usersOptions(users)}
              onChange={(value: string) =>
                formik.setFieldValue('userId', value)
              }
              value={formik.values.userId}
              error={formik.errors.userId as string}
              disabled={[actionsEnum.edit, actionsEnum.emptyEdit].includes(
                action
              )}
              sx={{
                '& :disabled': {
                  color: '#000 !important',
                  opacity: '0.8 !important',
                },
              }}
              searchable
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            <Input
              name='reason'
              label='Arsyja'
              onChange={formik.handleChange}
              value={formik.values.reason}
              error={formik.errors.reason as string}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            <DatePicker
              name='paymentDate'
              label='Data e pagesës'
              placeholder='Selekto datën e pagesës'
              onChange={(value: Date) =>
                formik.setFieldValue('paymentDate', value)
              }
              clearable={false}
              value={formik.values.paymentDate}
              error={formik.errors.paymentDate as string}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            <Select
              name='payedForYear'
              label='Paguaj për vitin'
              placeholder='Paguaj për vitin'
              data={getYears()}
              onChange={(value: string) =>
                formik.setFieldValue('payedForYear', Number(value))
              }
              value={String(formik.values.payedForYear)}
              error={formik.errors.payedForYear as string}
              searchable
              disabled={[actionsEnum.emptyEdit].includes(action)}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            <NumberInput
              name='exchange'
              label='Kursi valutor (din)'
              onChange={(value: number) =>
                formik.setFieldValue('exchange', value)
              }
              value={Number(formik.values.exchange)}
              error={formik.errors.exchange as string}
              type='text'
              precision={2}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            <NumberInput
              name='amount'
              label='Shuma'
              onChange={(value: number) =>
                formik.setFieldValue('amount', value)
              }
              value={formik.values.amount}
              error={formik.errors.amount as string}
              type='text'
              precision={2}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            <Input
              name='payer'
              label='Paguesi'
              onChange={formik.handleChange}
              value={formik.values.payer}
              error={formik.errors.payer as string}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            <Input
              name='paymentReceiver'
              label='Pranuesi i pagesës'
              onChange={formik.handleChange}
              value={formik.values.paymentReceiver}
              error={formik.errors.paymentReceiver as string}
            />
          </Grid.Col>
        </Grid>
        {action === actionsEnum.edit && (
          <Button
            sx={{ width: '100%', marginTop: 10, fontSize: 16 }}
            variant='outline'
            color='red'
            onClick={() => setConfirmDeleteModal(true)}
          >
            Fshij
          </Button>
        )}
        <Button
          type='submit'
          sx={{ width: '100%', marginTop: 10, fontSize: 16 }}
        >
          {action === actionsEnum.add ? 'Shto' : 'Ndrysho'}
        </Button>
      </form>
      <ConfirmModal
        isOpen={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal(false)}
        onConfirm={() => handleDelete()}
        description={`A jeni i sigurt qe deshironi ta fshini pagesen per vitin ${formik.values.payedForYear}?`}
      />
      {(putMutation.isLoading ||
        putEditMutation.isLoading ||
        deleteMutation.isLoading) && <Loader position='absolute' backdrop />}
    </Modal>
  );
};

export default AddPayment;
