import { IPaymentsUser } from '@/types/payments/payments';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PaymentsType = IPaymentsUser & { _id: string };

interface UserPaymentsProps {
  loading: boolean;
  userPayments: PaymentsType | null;
  isModalOpen: boolean;
}

const initialState: UserPaymentsProps = {
  loading: false,
  userPayments: null,
  isModalOpen: false,
};

export const userPaymentsSlice = createSlice({
  name: 'userPayments',
  initialState,
  reducers: {
    setModalOpen: (state, actions: PayloadAction<boolean>) => {
      state.isModalOpen = actions.payload;
    },
    setUserPayments: (state, actions: PayloadAction<PaymentsType | null>) => {
      state.userPayments = actions.payload;
    },
  },
});

export const { setUserPayments, setModalOpen } = userPaymentsSlice.actions;
export default userPaymentsSlice.reducer;
