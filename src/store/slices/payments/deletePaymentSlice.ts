import toast from '@/shared-components/toast/toast';
import axios from '@/utils/axios';
import { returnError } from '@/utils/reduxAsyncError';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface DeletePaymentProps {
  loading: boolean;
}

const initialState: DeletePaymentProps = {
  loading: false,
};

export const deletePayment = createAsyncThunk(
  'payment/delete',
  async (
    payload: { paymentId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.put(`/payments/delete/${payload.paymentId}`);
      return payload;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

export const deletePaymentSlice = createSlice({
  name: 'deletePayment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(deletePayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePayment.fulfilled, (state) => {
      state.loading = false;
      toast({ title: 'Pagesa u fshi', status: 'success' });
    });
    builder.addCase(deletePayment.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default deletePaymentSlice.reducer;
