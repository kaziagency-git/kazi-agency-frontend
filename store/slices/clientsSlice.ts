import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAdminClients,
  getAdminClientStats,
  AdminClient,
  ClientListParams,
  ClientListResponse,
  ClientStats,
} from '@/lib/client-api';

interface ClientsState {
  items: AdminClient[];
  total: number;
  page: number;
  totalPages: number;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  stats: ClientStats | null;
  statsStatus: 'idle' | 'loading' | 'success' | 'error';
}

const initialState: ClientsState = {
  items: [],
  total: 0,
  page: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
  stats: null,
  statsStatus: 'idle',
};

export const fetchClients = createAsyncThunk(
  'clients/fetchAll',
  async (params: ClientListParams | undefined = undefined, { rejectWithValue }) => {
    try {
      return await getAdminClients(params);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to load clients');
    }
  }
);

export const fetchClientStats = createAsyncThunk(
  'clients/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminClientStats();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to load client stats');
    }
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'success';
        // Handle both old array response and new paginated response
        const payload = action.payload as ClientListResponse | AdminClient[];
        if (Array.isArray(payload)) {
          state.items = payload;
          state.total = payload.length;
          state.page = 1;
          state.totalPages = 1;
        } else {
          state.items = payload.clients ?? [];
          state.total = payload.total ?? 0;
          state.page = payload.page ?? 1;
          state.totalPages = payload.totalPages ?? 1;
        }
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      })

      .addCase(fetchClientStats.pending, (state) => {
        state.statsStatus = 'loading';
      })
      .addCase(fetchClientStats.fulfilled, (state, action) => {
        state.statsStatus = 'success';
        state.stats = action.payload;
      })
      .addCase(fetchClientStats.rejected, (state) => {
        state.statsStatus = 'error';
      });
  },
});

export default clientsSlice.reducer;
