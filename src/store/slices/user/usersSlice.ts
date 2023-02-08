import toast from '@/shared-components/toast/toast';
import axios from '@/utils/axios';
import { returnError } from '@/utils/reduxAsyncError';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UsersSliceTypes {
  loading: boolean;
  users: {}[];
}

// Define the initial state using that type
const initialState: UsersSliceTypes = {
  loading: false,
  users: [],
};

export const getUsers = createAsyncThunk(
  'users/all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/user/all');
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
      toast({ title: action.payload, status: 'error' });
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
