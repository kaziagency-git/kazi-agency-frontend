import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import {
  getApplications,
  getApplicationStats,
  updateApplicationStatus,
  updateApplicationNotes,
  type Application,
  type ApplicationStats,
} from '@/lib/admin-api';

interface ApplicationsState {
  items: Application[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  search: string;
  statusFilter: string;
  stats: ApplicationStats | null;
  statsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ApplicationsState = {
  items: [],
  status: 'idle',
  search: '',
  statusFilter: 'all',
  stats: null,
  statsStatus: 'idle',
};

export const fetchApplications = createAsyncThunk(
  'applications/fetchAll',
  async (_, { getState }) => {
    const { search, statusFilter } = (getState() as RootState).applications;
    const params: Record<string, string> = {};
    if (statusFilter !== 'all') params.status = statusFilter;
    if (search.trim()) params.search = search.trim();
    return getApplications(params);
  }
);

export const fetchApplicationStats = createAsyncThunk(
  'applications/fetchStats',
  async () => getApplicationStats()
);

export const setApplicationStatus = createAsyncThunk(
  'applications/setStatus',
  async ({ id, status }: { id: string; status: Application['status'] }) =>
    updateApplicationStatus(id, status)
);

export const saveApplicationNotes = createAsyncThunk(
  'applications/saveNotes',
  async ({ id, notes }: { id: string; notes: string }) =>
    updateApplicationNotes(id, notes)
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
    invalidateApplications(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchApplications.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(fetchApplicationStats.pending, (state) => {
        state.statsStatus = 'loading';
      })
      .addCase(fetchApplicationStats.fulfilled, (state, action) => {
        state.statsStatus = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchApplicationStats.rejected, (state) => {
        state.statsStatus = 'failed';
      })

      // Instant update in the list when status/notes change from detail page
      .addCase(setApplicationStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((a) => a._id === updated._id);
        if (idx !== -1) state.items[idx] = updated;
      })
      .addCase(saveApplicationNotes.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((a) => a._id === updated._id);
        if (idx !== -1) state.items[idx] = updated;
      });
  },
});

export const { setSearch, setStatusFilter, invalidateApplications } = applicationsSlice.actions;
export default applicationsSlice.reducer;
