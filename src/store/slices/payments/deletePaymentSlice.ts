import toast from '@/shared-components/toast/toast';
import axios from '@/utils/axios';
import { returnError } from '@/utils/reduxAsyncError';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeletePaymentProps {
  loading: boolean;
  confirmModal: boolean;
}

const initialState: DeletePaymentProps = {
  loading: false,
  confirmModal: false,
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
  reducers: {
    setConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.confirmModal = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(deletePayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePayment.fulfilled, (state) => {
      state.loading = false;
      state.confirmModal = false;
      toast({ title: 'Pagesa u fshi', status: 'success' });
    });
    builder.addCase(deletePayment.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setConfirmModal } = deletePaymentSlice.actions;
export default deletePaymentSlice.reducer;
