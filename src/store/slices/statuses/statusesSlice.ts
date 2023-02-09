import { IStatus } from '@/types/statuses/statuses';
import { returnError } from '@/utils/reduxAsyncError';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface StatusesProps {
  loading: boolean;
  statuses: IStatus[];
}

export const getStatuses = createAsyncThunk(
  'statuses/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/statuses');
      return response;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

const initialState: StatusesProps = {
  loading: false,
  statuses: [],
};

export const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getStatuses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStatuses.fulfilled, (state, action: PayloadAction<{data: IStatus[]}>) => {
      state.loading = false;
      state.statuses = action.payload.data;
    });
    builder.addCase(getStatuses.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default statusesSlice.reducer;
