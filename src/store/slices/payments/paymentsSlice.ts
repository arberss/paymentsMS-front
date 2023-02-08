import { IPayment } from './../../../types/payments/payments';
import toast from '@/shared-components/toast/toast';
import { IPaymentsUser } from '@/types/payments/payments';
import axios from '@/utils/axios';
import { returnError } from '@/utils/reduxAsyncError';
import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import { addPayment, editPayment } from './addPaymentSlice';
import { deletePayment } from './deletePaymentSlice';
import { paymentUpdater } from './helper';

interface PaymentsProps {
  loading: boolean;
  payments: IPaymentsUser[];
}

const initialState: PaymentsProps = {
  loading: false,
  payments: [],
};

export const getPayments = createAsyncThunk(
  'payments/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<IPaymentsUser[]>('/payments');
      return response;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPayments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getPayments.fulfilled,
      (state, action: PayloadAction<{ data: IPaymentsUser[] }>) => {
        state.loading = false;
        state.payments = action.payload.data;
      }
    );
    builder.addCase(
      getPayments.rejected,
      (state, action: PayloadAction<any>) => {
        toast({ title: action.payload, status: 'error' });
        state.loading = false;
        state.payments = [];
      }
    );

    builder.addCase(
      editPayment.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: IPaymentsUser;
          userId: string;
        }>
      ) => {
        const initState = current(state);

        const updatedPayments: IPaymentsUser[] = paymentUpdater(
          initState.payments,
          action.payload
        );

        toast({ title: 'Pagesa u ndryshua me sukses', status: 'success' });
        state.payments = updatedPayments;
      }
    );

    builder.addCase(
      addPayment.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: IPaymentsUser;
          userId: string;
        }>
      ) => {
        const initState = current(state);

        const newPaymentData: IPaymentsUser[] = paymentUpdater(
          initState.payments,
          action.payload
        );

        toast({ title: 'Pagesa u shtua me sukses', status: 'success' });
        state.payments = newPaymentData;
      }
    );

    builder.addCase(
      deletePayment.fulfilled,
      (
        state,
        action: PayloadAction<{
          userId: string;
          paymentId: string;
        }>
      ) => {
        const initState = current(state);
        const userPaymentsIndex = initState.payments.findIndex(
          (payment: IPaymentsUser) => payment.user._id === action.payload.userId
        );

        if (userPaymentsIndex !== -1) {
          const filteredValue = initState.payments[userPaymentsIndex].payments.filter(
            (userPayment: IPayment) => {
              return userPayment._id !== action.payload.paymentId;
            }
          );
          state.payments[userPaymentsIndex].payments = filteredValue;
        }
      }
    );
  },
});

export default paymentsSlice.reducer;
