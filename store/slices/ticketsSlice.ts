import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAdminTickets, getAdminTicketStats, Ticket, TicketStats } from '@/lib/client-api';

interface TicketsState {
  items: Ticket[];
  stats: TicketStats | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

const initialState: TicketsState = {
  items: [],
  stats: null,
  status: 'idle',
  error: null,
};

export const fetchAdminTickets = createAsyncThunk(
  'tickets/fetchAll',
  async (params: { status?: string; clientId?: string } | undefined, { rejectWithValue }) => {
    try {
      return await getAdminTickets(params);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to load tickets');
    }
  }
);

export const fetchTicketStats = createAsyncThunk('tickets/fetchStats', async (_, { rejectWithValue }) => {
  try {
    return await getAdminTicketStats();
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'Failed to load stats');
  }
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminTickets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminTickets.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchAdminTickets.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      })
      .addCase(fetchTicketStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export default ticketsSlice.reducer;
