import { createSlice, createAsyncThunk, Draft } from '@reduxjs/toolkit';
import { ListParams, Paged } from '@/lib/accounting/api';

/**
 * Every accounting table loads the same way — page, total, status, error — so
 * the slice is generated once per resource instead of being written out nine
 * times. Each generated slice keeps the params of its last fetch, which is
 * what a `refresh()` after a create/edit replays.
 */

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ListState<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  status: LoadStatus;
  error: string | null;
  lastParams: ListParams;
}

export function createListSlice<T>(name: string, fetcher: (params: ListParams) => Promise<Paged<T>>) {
  const initialState: ListState<T> = {
    items: [],
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
    status: 'idle',
    error: null,
    lastParams: {},
  };

  const fetchList = createAsyncThunk(
    `accounting/${name}/fetch`,
    async (params: ListParams = {}, { rejectWithValue }) => {
      try {
        return { params, result: await fetcher(params) };
      } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : `Failed to load ${name}`);
      }
    }
  );

  const slice = createSlice({
    name: `accounting/${name}`,
    initialState,
    reducers: {
      reset: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchList.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchList.fulfilled, (state, action) => {
          const { params, result } = action.payload;
          state.status = 'success';
          state.items = result.items as Draft<T>[];
          state.total = result.total;
          state.page = result.page;
          state.limit = result.limit;
          state.totalPages = result.totalPages;
          state.lastParams = params;
        })
        .addCase(fetchList.rejected, (state, action) => {
          state.status = 'error';
          state.error = (action.payload as string) ?? 'Request failed';
        });
    },
  });

  return { reducer: slice.reducer, actions: slice.actions, fetchList };
}
