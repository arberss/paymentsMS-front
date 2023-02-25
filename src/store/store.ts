import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/auth/loginSlice';
import registerSlice from './slices/auth/registerSlice';
import usersSlice from './slices/user/usersSlice';
import actionsSlice from './slices/actions/actionsSlice';
import addActionSlice from './slices/actions/addActionSlice';

export const store = configureStore({
  reducer: {
    auth: combineReducers({
      login: loginSlice,
      register: registerSlice,
    }),
    users: combineReducers({
      users: usersSlice,
    }),
    actions: combineReducers({
      actions: actionsSlice,
      addAction: addActionSlice,
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
