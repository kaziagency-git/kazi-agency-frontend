import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAdminJobs,
  togglePublish,
  deleteJob,
  type Job,
} from '@/lib/admin-api';

interface JobsState {
  items: Job[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  togglingIds: string[];
}

const initialState: JobsState = {
  items: [],
  status: 'idle',
  togglingIds: [],
};

export const fetchJobs = createAsyncThunk('jobs/fetchAll', async () => getAdminJobs());

export const toggleJobPublish = createAsyncThunk(
  'jobs/togglePublish',
  async ({ id, isPublished }: { id: string; isPublished: boolean }) =>
    togglePublish(id, isPublished)
);

export const deleteJobById = createAsyncThunk(
  'jobs/delete',
  async (id: string) => {
    await deleteJob(id);
    return id;
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    invalidateJobs(state) {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.status = 'failed';
      })

      // toggleJobPublish — optimistic update
      .addCase(toggleJobPublish.pending, (state, action) => {
        const { id, isPublished } = action.meta.arg;
        state.togglingIds.push(id);
        const job = state.items.find((j) => j._id === id);
        if (job) job.isPublished = isPublished;
      })
      .addCase(toggleJobPublish.fulfilled, (state, action) => {
        const updated = action.payload;
        state.togglingIds = state.togglingIds.filter((id) => id !== updated._id);
        const idx = state.items.findIndex((j) => j._id === updated._id);
        if (idx !== -1) state.items[idx] = updated;
      })
      .addCase(toggleJobPublish.rejected, (state, action) => {
        const { id, isPublished } = action.meta.arg;
        state.togglingIds = state.togglingIds.filter((tid) => tid !== id);
        // revert optimistic update
        const job = state.items.find((j) => j._id === id);
        if (job) job.isPublished = !isPublished;
      })

      // deleteJobById — optimistic removal
      .addCase(deleteJobById.pending, (state, action) => {
        state.items = state.items.filter((j) => j._id !== action.meta.arg);
      })
      .addCase(deleteJobById.rejected, (state) => {
        state.status = 'idle'; // trigger refetch to restore the list
      });
  },
});

export const { invalidateJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
