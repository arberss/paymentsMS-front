import DatePicker from '@/shared-components/Form/DatePicker/DatePicker';
import Input from '@/shared-components/Form/Input/Input';
import NumberInput from '@/shared-components/Form/Input/NumberInput';
import Select from '@/shared-components/Form/Select/Select';
import { Button, Grid, Modal } from '@mantine/core';
import { FormikValues, useFormik } from 'formik';
import moment from 'moment';
import {
  getYears,
  typeSelector,
  usersOptions,
  validationSchema,
} from './helper';
import { actionsEnum, typeEnum } from '@/types/enums/typeEnum';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addPayment,
  editPayment,
} from '@/store/slices/payments/addPaymentSlice';
import { IPayment } from '@/types/payments/payments';

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
  type: typeEnum.income,
  reason: '',
  paymentDate: moment().toDate(),
  payedForYear: Number(moment().year()),
  exchange: '',
  amount: undefined,
  payer: '',
  paymentReceiver: '',
  nrOfPersons: 1,
};

const AddPayment = ({
  title,
  isOpen,
  onClose,
  action,
  selectedPayment,
}: AddPaymentProps) => {
  const dispatch = useAppDispatch();
  const {
    users: { users },
  } = useAppSelector((state) => state.users);
  const {
    addPayment: { loading },
  } = useAppSelector((state) => state.payments);

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

  const formik = useFormik({
    initialValues: actionValues[action].initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if ([actionsEnum.add, actionsEnum.emptyEdit].includes(action)) {
        dispatch(addPayment({ values, userId: formik.values.userId }));
      } else {
        dispatch(editPayment({ values, userId: formik.values.userId }));
      }
    },
  });

  return (
    <Modal
      opened={isOpen}
      size='lg'
      onClose={onClose}
      title={title}
      closeOnClickOutside={false}
      centered
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid sx={{ margin: '10px 0' }} gutter='md'>
          <Grid.Col xs={12} sm={12} md={12}>
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
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            <Select
              name='type'
              label='Tipi'
              data={typeSelector}
              onChange={(value: string) => formik.setFieldValue('type', value)}
              value={formik.values.type}
              error={formik.errors.type as string}
              disabled={true}
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
          <Grid.Col xs={12} sm={6} md={6}>
            <NumberInput
              name='nrOfPersons'
              label='Numri i personave'
              onChange={(value: number) =>
                formik.setFieldValue('nrOfPersons', value)
              }
              value={formik.values.nrOfPersons}
              error={formik.errors.nrOfPersons as string}
              hideControls={false}
            />
          </Grid.Col>
        </Grid>
        {action === actionsEnum.edit && (
          <Button
            sx={{ width: '100%', marginTop: 10, fontSize: 16 }}
            variant='outline'
            color='red'
          >
            Fshij
          </Button>
        )}
        <Button
          type='submit'
          sx={{ width: '100%', marginTop: 10, fontSize: 16 }}
          loading={loading}
        >
          {action === actionsEnum.add ? 'Shto' : 'Ndrysho'}
        </Button>
      </form>
    </Modal>
  );
};

export default AddPayment;
