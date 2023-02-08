import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string().required('Ploteso fushen'),
  lastName: Yup.string().required('Ploteso fushen'),
  email: Yup.string()
    .email('Fusha e kerkuar duhet te jete email adrese')
    .required('Ploteso fushen'),
  password: Yup.string().required('Ploteso fushen'),
  confirmPassword: Yup.string().test(
    'konfirmimPasswordi',
    'Passwordi nuk eshte i njejte',
    (value, ctx) => {
      return value === ctx.parent.password;
    }
  ),
  personalNumber: Yup.string().required('Ploteso fushen'),
});
