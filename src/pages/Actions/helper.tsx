import { currencyEnums } from '@/types/enums/typeEnum';
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  user: Yup.string().required('Ploteso fushen'),
  type: Yup.string().required('Ploteso fushen'),
  reason: Yup.string().required('Ploteso fushen'),
  description: Yup.string().required('Ploteso fushen'),
  paymentDate: Yup.string().required('Ploteso fushen'),
  payedForYear: Yup.number()
    .min(1900, 'Ploteso fushen')
    .required('Ploteso fushen'),
  payedForMonth: Yup.number().required('Ploteso fushen'),
  exchange: Yup.string().required('Ploteso fushen'),
  otherCurrency: Yup.string().test(
    'checkOtherValue',
    'Ploteso fushen',
    (value, ctx) => {
      if (
        currencyEnums[
          ctx.parent.currency as unknown as keyof typeof currencyEnums
        ] === currencyEnums.other &&
        !value?.trim()
      )
        return false;

      return true;
    }
  ),
  currency: Yup.string().required('Ploteso fushen'),
  invoiceNr: Yup.string().required('Ploteso fushen'),
  amount: Yup.number()
    .nullable()
    .min(1, 'Ploteso fushen')
    .required('Ploteso fushen'),
  payer: Yup.string().required('Ploteso fushen'),
  paymentReceiver: Yup.string().required('Ploteso fushen'),
  nrOfPersons: Yup.number().min(1, 'Ploteso fushen').required('Ploteso fushen'),
});
