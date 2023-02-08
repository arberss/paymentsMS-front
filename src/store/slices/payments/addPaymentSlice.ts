import { IPayment } from '@/types/payments/payments';
import { actionsEnum } from '@/types/enums/typeEnum';
import axios from '@/utils/axios';
import { returnError } from '@/utils/reduxAsyncError';
import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

interface AddPaymentProps {
  loading: boolean;
  payment: IPayment | null;
  openPaymentModal: actionsEnum | null;
}

const initialState: AddPaymentProps = {
  loading: false,
  payment: null,
  openPaymentModal: null,
};

export const addPayment = createAsyncThunk(
  'addPayment/add',
  async (
    payload: { values: IPayment; userId: string },
    { rejectWithValue }
  ) => {
    const data = {
      ...payload.values,
      exchange: payload.values.exchange.toString(),
      payedForYear: Number(payload.values.payedForYear),
    };
    try {
      const response = await axios.put(`/payments/${payload.userId}`, data);
      return { data: response.data, userId: payload.userId };
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

export const editPayment = createAsyncThunk(
  'addPayment/edit',
  async (
    payload: { values: IPayment; userId: string },
    { rejectWithValue }
  ) => {
    const data = {
      ...payload.values,
      exchange: payload.values.exchange.toString(),
      payedForYear: Number(payload.values.payedForYear),
    };
    try {
      const response = await axios.put(
        `/payments/${payload.userId}/${payload.values._id}`,
        data
      );
      return { data: response.data, userId: payload.userId };
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

export const addPaymentSlice = createSlice({
  name: 'addPayment',
  initialState,
  reducers: {
    setPaymentModalValue: (
      state,
      action: PayloadAction<actionsEnum | null>
    ) => {
      state.openPaymentModal = action.payload;
    },
    setPayment: (state, action: PayloadAction<IPayment | null>) => {
      state.payment = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(editPayment.pending, addPayment.pending),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(editPayment.fulfilled, addPayment.fulfilled),
      (state) => {
        state.loading = false;
        state.openPaymentModal = null;
        state.payment = null;
      }
    );
    builder.addMatcher(
      isAnyOf(editPayment.rejected, addPayment.rejected),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export const { setPaymentModalValue, setPayment } = addPaymentSlice.actions;
export default addPaymentSlice.reducer;
