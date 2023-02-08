import { RegisterFormData } from '@/pages/Auth/Register/Register';
import toast from '@/shared-components/toast/toast';
import axios from '@/utils/axios';
import { returnError } from '@/utils/reduxAsyncError';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface RegisterSlice {
  loading: boolean;
}

// Define the initial state using that type
const initialState: RegisterSlice = {
  loading: false,
};

export const registerUser = createAsyncThunk(
  'register/registerApi',
  async (
    payload: { values: RegisterFormData; [key: string]: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/auth/signup', payload.values);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      action.payload.data.navigate('/auth/login');
      state.loading = false;
    });
    builder.addCase(
      registerUser.rejected,
      (state, action: PayloadAction<any>) => {
        toast({ title: action.payload, status: 'error' });
        state.loading = false;
      }
    );
  },
});

export default registerSlice.reducer;
