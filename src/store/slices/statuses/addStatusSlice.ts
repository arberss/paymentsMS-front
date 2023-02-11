import { IStatus } from '@/types/statuses/statuses';
import { returnError } from '@/utils/reduxAsyncError';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface AddStatusesProps {
  loading: boolean;
}

export const addStatus = createAsyncThunk(
  'statuses/add',
  async (payload: IStatus, { rejectWithValue }) => {
    try {
      const response = await axios.post('/statuses', { name: payload.name });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

const initialState: AddStatusesProps = {
  loading: false,
};

export const statusesSlice = createSlice({
  name: 'addStatuses',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addStatus.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addStatus.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default statusesSlice.reducer;
