import { typeEnum } from '@/types/enums/typeEnum';
import * as Yup from 'yup';

export const typeSelector = [
  {
    value: typeEnum.income,
    label: 'Hyrje',
  },
  {
    value: typeEnum.expense,
    label: 'Dalje',
  },
];

export const usersOptions = (users: {}[]) => {
  return users.map((user: { [key: string]: any }) => {
    return {
      value: user._id,
      label: `${user.firstName} ${user.lastName} - ${user.personalNumber}`,
    };
  });
};

export const validationSchema = Yup.object({
  userId: Yup.string().required('Ploteso fushen'),
  reason: Yup.string().required('Ploteso fushen'),
  paymentDate: Yup.string().required('Ploteso fushen'),
  payedForYear: Yup.number()
    .min(1900, 'Ploteso fushen')
    .required('Ploteso fushen'),
  exchange: Yup.string().required('Ploteso fushen'),
  amount: Yup.number()
    .nullable()
    .min(1, 'Ploteso fushen')
    .required('Ploteso fushen'),
  payer: Yup.string().required('Ploteso fushen'),
  paymentReceiver: Yup.string().required('Ploteso fushen'),
});
