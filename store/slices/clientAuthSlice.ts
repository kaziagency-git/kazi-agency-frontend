import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clientLogin, clientLogout } from '@/lib/client-api';
import { setClientTokens, clearClientTokens, isClientAuthenticated, hasValidClientRefreshToken } from '@/lib/client-auth';

interface ClientAuthState {
  authenticated: boolean;
  hydrated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ClientAuthState = {
  authenticated: false,
  hydrated: false,
  loading: false,
  error: null,
};

export const clientLoginThunk = createAsyncThunk(
  'clientAuth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { accessToken, refreshToken } = await clientLogin(email, password);
      setClientTokens(accessToken, refreshToken);
      return true;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Login failed');
    }
  }
);

export const clientLogoutThunk = createAsyncThunk('clientAuth/logout', async () => {
  await clientLogout();
});

const clientAuthSlice = createSlice({
  name: 'clientAuth',
  initialState,
  reducers: {
    initClientAuth(state) {
      state.authenticated = isClientAuthenticated() || hasValidClientRefreshToken();
      state.hydrated = true;
    },
    clearClientAuthError(state) {
      state.error = null;
    },
    setClientAuthenticated(state) {
      state.authenticated = true;
      state.hydrated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clientLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clientLoginThunk.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(clientLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Login failed';
      })
      .addCase(clientLogoutThunk.fulfilled, (state) => {
        state.authenticated = false;
        clearClientTokens();
      });
  },
});

export const { initClientAuth, clearClientAuthError, setClientAuthenticated } = clientAuthSlice.actions;
export default clientAuthSlice.reducer;
