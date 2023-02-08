import * as Yup from 'yup';

export const validationSchema = Yup.object({
  emailOrPersonalNumber: Yup.string().required('Ploteso fushen'),
  password: Yup.string().required('Ploteso fushen'),
});
