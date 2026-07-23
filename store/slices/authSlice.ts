import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminLogin, adminLogout } from '@/lib/admin-api';
import { setTokens, clearTokens, isAuthenticated, hasValidRefreshToken } from '@/lib/admin-auth';

interface AuthState {
  authenticated: boolean;
  hydrated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  authenticated: false,
  hydrated: false,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { accessToken, refreshToken } = await adminLogin(email, password);
      setTokens(accessToken, refreshToken);
      return true;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Login failed');
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await adminLogout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initAuth(state) {
      // Authenticated if access token is valid, OR refresh token can recover the session
      state.authenticated = isAuthenticated() || hasValidRefreshToken();
      state.hydrated = true;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Login failed';
      })
      // logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.authenticated = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        // clear local state even if the API call failed
        state.authenticated = false;
        clearTokens();
      });
  },
});

export const { initAuth, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
