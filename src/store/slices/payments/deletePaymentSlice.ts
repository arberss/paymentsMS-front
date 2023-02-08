import { IPayment } from '@/types/payments/payments';
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
  async (payload: { paymentId: string }, { rejectWithValue }) => {
    try {
      await axios.put(`/payments/delete/${payload.paymentId}`);
      return payload.paymentId;
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
  extraReducers(builder) {},
});

export const { setConfirmModal } = deletePaymentSlice.actions;
export default deletePaymentSlice.reducer;
