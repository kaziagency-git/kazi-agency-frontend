import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AccAccount, AccCategory, accountsApi, categoriesApi } from '@/lib/accounting/api';
import { getAdminClients } from '@/lib/client-api';

/**
 * Dropdown data shared by every accounting form: active categories, active
 * payment accounts and the client list. Fetched once and held in the store so
 * eight pages do not each re-request it.
 *
 * Clients come from the EXISTING admin endpoint and are read-only here — the
 * accounting module never writes to the Client collection.
 */

export interface ClientOption {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

interface ReferenceState {
  categories: AccCategory[];
  accounts: AccAccount[];
  clients: ClientOption[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

const initialState: ReferenceState = {
  categories: [],
  accounts: [],
  clients: [],
  status: 'idle',
  error: null,
};

export const fetchAccReference = createAsyncThunk(
  'accounting/reference/fetch',
  async (_: void, { rejectWithValue }) => {
    try {
      // limit=200 matches the API's ceiling; the agency is far below it.
      const [categories, accounts, clients] = await Promise.all([
        categoriesApi.list({ limit: 200, sortBy: 'name', sortDir: 'asc' }),
        accountsApi.list({ limit: 200, sortBy: 'name', sortDir: 'asc' }),
        getAdminClients({ limit: 200 }),
      ]);

      return {
        categories: categories.items,
        accounts: accounts.items,
        clients: clients.clients.map((c) => ({
          _id: c._id,
          name: c.name,
          email: c.email,
          company: c.company,
          status: c.status,
        })),
      };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to load reference data');
    }
  }
);

const referenceSlice = createSlice({
  name: 'accounting/reference',
  initialState,
  reducers: {
    /** Call after editing categories or accounts so open forms pick it up. */
    invalidate: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccReference.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAccReference.fulfilled, (state, action) => {
        state.status = 'success';
        state.categories = action.payload.categories;
        state.accounts = action.payload.accounts;
        state.clients = action.payload.clients;
      })
      .addCase(fetchAccReference.rejected, (state, action) => {
        state.status = 'error';
        state.error = (action.payload as string) ?? 'Request failed';
      });
  },
});

export const { invalidate: invalidateAccReference } = referenceSlice.actions;
export default referenceSlice.reducer;
