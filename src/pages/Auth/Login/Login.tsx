import Input from '@/shared-components/Form/Input/Input';
import { Button, Flex, PasswordInput, Text } from '@mantine/core';
import AuthLayout from '@/shared-components/Layouts/Auth/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAppDispatch } from '@/store/hooks';
import { loginUser } from '@/store/slices/auth/loginSlice';
import { validationSchema } from './helper';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';

export interface LoginFormData {
  emailOrPersonalNumber: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues: LoginFormData = {
    emailOrPersonalNumber: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        const result: { [key: string]: any } = await dispatch(
          loginUser({ values })
        );

        if (!result?.error) {
          formikHelpers.resetForm();
          navigate('/dashboard/payments');
        }
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <>
      <AuthLayout title='Kyqu'>
        <>
          <form onSubmit={formik.handleSubmit}>
            <Flex gap='md' direction='column'>
              <Input
                name='emailOrPersonalNumber'
                label='Email ose numri personal'
                onChange={formik.handleChange}
                value={formik.values.emailOrPersonalNumber}
                error={formik.errors.emailOrPersonalNumber}
              />
              <PasswordInput
                name='password'
                label='Password'
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
                visibilityToggleIcon={({ reveal, size }) =>
                  reveal ? (
                    <IconEyeOff size={size} />
                  ) : (
                    <IconEyeCheck size={size} />
                  )
                }
              />
              <Button type='submit'>Kyqu</Button>
            </Flex>
          </form>
          <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <Text c='dark'>Nuk keni llogari?</Text>
            <Link to='/auth/register'>
              <Text c='blue'>Regjistrohu</Text>
            </Link>
          </div>
        </>
      </AuthLayout>
    </>
  );
};

export default Login;
