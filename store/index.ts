import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobsReducer from './slices/jobsSlice';
import applicationsReducer from './slices/applicationsSlice';
import clientAuthReducer from './slices/clientAuthSlice';
import clientsReducer from './slices/clientsSlice';
import ticketsReducer from './slices/ticketsSlice';
import accountingReducer from './slices/accounting';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      jobs: jobsReducer,
      applications: applicationsReducer,
      clientAuth: clientAuthReducer,
      clients: clientsReducer,
      tickets: ticketsReducer,
      accounting: accountingReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
