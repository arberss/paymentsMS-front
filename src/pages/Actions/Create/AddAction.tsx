import DatePicker from '@/shared-components/Form/DatePicker/DatePicker';
import Input from '@/shared-components/Form/Input/Input';
import NumberInput from '@/shared-components/Form/Input/NumberInput';
import Select from '@/shared-components/Form/Select/Select';
import { Button, Flex, Grid, Modal } from '@mantine/core';
import { useFormik } from 'formik';
import moment from 'moment';
import { actionsEnum, currencyEnums, typeEnum } from '@/types/enums/typeEnum';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Loader from '@/components/Loader/Loader';
import { IAction } from '@/types/actions/actions';
import { validationSchema } from '../helper';
import { typeSelector } from '@/pages/Payments/create/helper';
import { getCurrencies, getMonths, getYears } from '@/utils/general';
import { addAction } from '@/store/slices/actions/addActionSlice';

interface AddActionProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  action: actionsEnum;
}

const initialValues: IAction = {
  user: '',
  type: typeEnum.income,
  reason: '',
  description: '',
  paymentDate: moment().toDate(),
  payedForYear: Number(moment().year()),
  payedForMonth: Number(moment().month() + 1),
  exchange: '',
  currency: currencyEnums.euro,
  otherCurrency: '',
  amount: 0,
  invoiceNr: '',
  payer: '',
  paymentReceiver: '',
  nrOfPersons: 1,
};

const AddAction = ({ title, isOpen, onClose, action }: AddActionProps) => {
  const dispatch = useAppDispatch();
  const {
    addAction: { loading },
  } = useAppSelector((state) => state.actions);

  const actionValues = {
    [actionsEnum.add]: {
      initialValues,
    },
    [actionsEnum.edit]: {
      initialValues,
    },
    [actionsEnum.emptyEdit]: {
      initialValues,
    },
  };

  const formik = useFormik({
    initialValues: actionValues[action].initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result: { [key: string]: any } = await dispatch(
          addAction({ values })
        );

        if (!result?.error) {
          onClose();
        }
      } catch (error) {
        return error;
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
      closeOnEscape
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid sx={{ margin: '10px 0' }} gutter='md'>
          <Grid.Col xs={12} sm={6} md={6}>
            <Input
              name='user'
              label='Personi/Kompania/Tjeter'
              onChange={formik.handleChange}
              value={formik.values.user}
              error={formik.errors.user as string}
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
            <Input
              name='description'
              label='Pershkrimi'
              onChange={formik.handleChange}
              value={formik.values.description}
              error={formik.errors.description as string}
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
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={6}>
            <Select
              name='payedForMonth'
              label='Paguaj për muajin'
              placeholder='Paguaj për muajin'
              data={getMonths()}
              onChange={(value: string) =>
                formik.setFieldValue('payedForMonth', Number(value))
              }
              value={String(formik.values.payedForMonth)}
              error={formik.errors.payedForMonth as string}
              searchable
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
            <Flex direction='row' gap='xs'>
              <Select
                name='currency'
                label='Monedha'
                data={getCurrencies()}
                onChange={(value: string) =>
                  formik.setFieldValue('currency', value)
                }
                value={formik.values.currency}
                error={formik.errors.currency as string}
                sx={{ flex: 1 }}
              />
              {currencyEnums[
                formik.values.currency as unknown as keyof typeof currencyEnums
              ] === currencyEnums.other && (
                <Input
                  name='otherCurrency'
                  label='Shkruaj monedhën'
                  onChange={formik.handleChange}
                  value={formik.values.otherCurrency}
                  error={formik.errors.otherCurrency as string}
                  sx={{ flex: 1 }}
                />
              )}
            </Flex>
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
            <Input
              name='invoiceNr'
              label='Nr.i fakturës'
              onChange={formik.handleChange}
              value={formik.values.invoiceNr}
              error={formik.errors.invoiceNr as string}
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
        <Button
          type='submit'
          sx={{ width: '100%', marginTop: 10, fontSize: 16 }}
        >
          {action === actionsEnum.add ? 'Shto' : 'Ndrysho'}
        </Button>
      </form>
      {loading && <Loader position='absolute' backdrop />}
    </Modal>
  );
};

export default AddAction;
