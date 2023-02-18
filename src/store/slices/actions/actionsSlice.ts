import toast from '@/shared-components/toast/toast';
import { IAction } from '@/types/actions/actions';
import { IPagination } from '@/types/pagination/pagination';
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
  pagination: IPagination;
}

export const getActions = createAsyncThunk(
  'actions/get',
  async (
    data: { pagination: { page: number; size: number } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `/actions?page=${data.pagination.page}&size=${data.pagination.size}`
      );
      return response;
    } catch (error: unknown) {
      return rejectWithValue(returnError(error as { [key: string]: any }));
    }
  }
);

const initialState: StatusesProps = {
  loading: false,
  actions: [],
  pagination: {
    page: 1,
    size: 10,
    totalPages: 10,
  },
};

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getActions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getActions.fulfilled,
      (
        state,
        action: PayloadAction<{
          data: { data: IAction[]; pagination: IPagination };
        }>
      ) => {
        state.loading = false;
        state.actions = action.payload.data.data;
        state.pagination = {
          page: action.payload.data.pagination.page,
          size: action.payload.data.pagination.size,
          totalPages: action.payload.data.pagination.totalPages,
        };
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

export const { setPage } = actionsSlice.actions;
export default actionsSlice.reducer;
