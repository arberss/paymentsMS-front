import { LoginFormData } from '@/pages/Auth/Login/Login';
import toast from '@/shared-components/toast/toast';
import axios from '@/utils/axios';
import { returnError } from '@/utils/reduxAsyncError';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AuthSlice {
  isAuth: boolean;
  token: string | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: AuthSlice = {
  isAuth: false,
  token: null,
  loading: false,
};

export const loginUser = createAsyncThunk(
  'login/loginApi',
  async (payload: { values: LoginFormData }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/signin', payload.values);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    checkLogin: (
      state,
      { payload }: PayloadAction<{ token: string | null }>
    ) => {
      state.isAuth = true;
      state.token = payload.token ? payload.token : null;
    },
    logout: (state) => {
      localStorage.removeItem('token');

      state.isAuth = false;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<{
          data: { id: string; token: string };
        }>
      ) => {
        localStorage.setItem('token', payload.data.token);

        state.loading = false;
        state.isAuth = true;
        state.token = payload.data.token;
      }
    );
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      toast({ title: action.payload, status: 'error' });
      state.loading = false;
      state.isAuth = false;
      state.token = null;
    });
  },
});

export const { checkLogin, logout } = loginSlice.actions;
export default loginSlice.reducer;
