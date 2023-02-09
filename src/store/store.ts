import statusesSlice from './slices/statuses/statusesSlice';
import addPaymentSlice from './slices/payments/addPaymentSlice';
import paymentsSlice from './slices/payments/paymentsSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/auth/loginSlice';
import registerSlice from './slices/auth/registerSlice';
import usersSlice from './slices/user/usersSlice';
import userPaymentsSlice from './slices/payments/userPaymentsSlice';
import deletePaymentSlice from './slices/payments/deletePaymentSlice';

export const store = configureStore({
  reducer: {
    auth: combineReducers({
      login: loginSlice,
      register: registerSlice,
    }),
    payments: combineReducers({
      payments: paymentsSlice,
      addPayment: addPaymentSlice,
      userPayments: userPaymentsSlice,
      deletePayment: deletePaymentSlice,
    }),
    users: combineReducers({
      users: usersSlice,
    }),
    statuses: combineReducers({
      statuses: statusesSlice,
    }),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
