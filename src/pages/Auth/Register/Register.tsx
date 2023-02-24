import Input from '@/shared-components/Form/Input/Input';
import { Button, Grid, PasswordInput, Text } from '@mantine/core';
import AuthLayout from '@/shared-components/Layouts/Auth/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import NumberInput from '@/shared-components/Form/Input/NumberInput';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser } from '@/store/slices/auth/registerSlice';
import { validationSchema } from './helper';
import { useState } from 'react';
import Select from '@/shared-components/Form/Select/Select';
import { IStatus } from '@/types/statuses/statuses';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  personalNumber: string;
  status: string;
  role?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    statuses: { statuses },
  } = useAppSelector((state) => state.statuses);
  const statusesSelectData = statuses?.map((status: IStatus) => {
    return {
      label: status.name,
      value: status._id,
    };
  });

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const initialValues: RegisterFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    personalNumber: '',
    status: '',
    role: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        const result: { [key: string]: any } = await dispatch(
          registerUser({ values })
        );
        
        if (!result?.error) {
          formikHelpers.resetForm();
          navigate('/auth/login');
        }
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <AuthLayout title='Regjistrohu'>
      <>
        <form onSubmit={formik.handleSubmit}>
          <Grid sx={{ margin: '10px 0' }}>
            <Grid.Col xs={12} sm={6} md={6}>
              <Input
                name='firstName'
                label='Emri'
                onChange={formik.handleChange}
                value={formik.values.firstName}
                error={formik.errors.firstName}
              />
            </Grid.Col>
            <Grid.Col xs={12} sm={6} md={6}>
              <Input
                name='lastName'
                label='Mbiemri'
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={formik.errors.lastName}
              />
            </Grid.Col>
            <Grid.Col xs={12} sm={6} md={6}>
              <NumberInput
                name='personalNumber'
                label='Numri personal'
                onChange={(value: number) =>
                  formik.setFieldValue('personalNumber', value)
                }
                value={Number(formik.values.personalNumber)}
                error={formik.errors.personalNumber}
                type='text'
              />
            </Grid.Col>
            <Grid.Col xs={12} sm={6} md={6}>
              <Select
                name='status'
                label='Lagja'
                data={statusesSelectData}
                onChange={(value: string) =>
                  formik.setFieldValue('status', value)
                }
                value={formik.values.status}
                error={formik.errors.status}
              />
            </Grid.Col>
            <Grid.Col xs={12} sm={12} md={12}>
              <Input
                name='email'
                label='Email'
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
            </Grid.Col>
            <Grid.Col xs={12} sm={6} md={6}>
              <PasswordInput
                name='password'
                label='Password'
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
                onVisibilityChange={setPasswordVisibility}
                visible={passwordVisibility}
              />
            </Grid.Col>
            <Grid.Col xs={12} sm={6} md={6}>
              <PasswordInput
                name='confirmPassword'
                label='Konfirmo Passwordin'
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={formik.errors.confirmPassword}
                onVisibilityChange={setPasswordVisibility}
                visible={passwordVisibility}
              />
            </Grid.Col>
          </Grid>
          <Button type='submit' sx={{ width: '100%' }}>
            Regjistrohu
          </Button>
        </form>
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <Text c='dark'>Jeni te regjistruar?</Text>
          <Link to='/auth/login'>
            <Text c='blue'>Kyqu</Text>
          </Link>
        </div>
      </>
    </AuthLayout>
  );
};

export default Register;
