import toast from '@/shared-components/toast/toast';
import { IAction } from '@/types/actions/actions';
import { returnError } from '@/utils/reduxAsyncError';
import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { addAction } from './addActionSlice';

interface StatusesProps {
  loading: boolean;
  actions: IAction[];
}

export const getActions = createAsyncThunk(
  'actions/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/actions');
      return response;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

const initialState: StatusesProps = {
  loading: false,
  actions: [],
};

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getActions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getActions.fulfilled,
      (state, action: PayloadAction<{ data: IAction[] }>) => {
        state.loading = false;
        state.actions = action.payload.data;
      }
    );
    builder.addCase(getActions.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(
      addAction.fulfilled,
      (state, action: PayloadAction<{ data: IAction }>) => {
        const initState = current(state);
        state.actions = [action.payload.data, ...initState.actions];
        toast({ title: 'Veprimi u shtua me sukses', status: 'success' });
      }
    );
  },
});

export default actionsSlice.reducer;
