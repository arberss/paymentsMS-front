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
import { IPagination } from '@/types/pagination/pagination';

interface PaymentsProps {
  loading: boolean;
  payments: IPaymentsUser[];
  pagination: IPagination;
}

const initialState: PaymentsProps = {
  loading: false,
  payments: [],
  pagination: {
    page: 1,
    size: 10,
    totalPages: 10,
  },
};

export const getPayments = createAsyncThunk(
  'payments/get',
  async (
    data: { pagination: { page: number; size: number } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<{
        data: IPaymentsUser[];
        pagination: IPagination;
      }>(`/payments?page=${data.pagination.page}&size=${data.pagination.size}`);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.pagination.size = +action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getPayments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getPayments.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: { data: IPaymentsUser[]; pagination: IPagination };
        }>
      ) => {
        const initState = current(state);

        state.loading = false;
        state.payments = action.payload.data.data;
        state.pagination = action.payload.data?.pagination
          ? {
              page: action.payload.data.pagination.page,
              size: action.payload.data.pagination.size,
              totalPages: action.payload.data?.pagination.totalPages,
            }
          : initState.pagination;
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
          const filteredValue = initState.payments[
            userPaymentsIndex
          ].payments.filter((userPayment: IPayment) => {
            return userPayment._id !== action.payload.paymentId;
          });
          state.payments[userPaymentsIndex].payments = filteredValue;
        }
      }
    );
  },
});

export const { setPage, setSize } = paymentsSlice.actions;
export default paymentsSlice.reducer;
