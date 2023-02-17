import axios from '@/utils/axios';
import { returnError } from '@/utils/reduxAsyncError';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { IAction } from '@/types/actions/actions';

interface AddActionProps {
  loading: boolean;
}

const initialState: AddActionProps = {
  loading: false,
};

export const addAction = createAsyncThunk(
  'addAction/add',
  async (payload: { values: IAction }, { rejectWithValue }) => {
    const data = {
      ...payload.values,
      exchange: payload.values.exchange.toString(),
      payedForYear: Number(payload.values.payedForYear),
      payedForMonth: Number(payload.values.payedForMonth),
    };
    try {
      const response = await axios.post('/actions', data);
      return { data: response.data };
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

export const addActionSlice = createSlice({
  name: 'addAction',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(isAnyOf(addAction.pending), (state) => {
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(addAction.fulfilled), (state) => {
      state.loading = false;
    });
    builder.addMatcher(isAnyOf(addAction.rejected), (state) => {
      state.loading = false;
    });
  },
});

export default addActionSlice.reducer;
