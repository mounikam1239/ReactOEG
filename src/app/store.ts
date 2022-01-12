/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/semi */
import { configureStore } from '@reduxjs/toolkit';
import metricSliceReducer from '../feature/metricSlice';
import measurementReducer from '../feature/measurementSlice';

export const store = configureStore({
  reducer: {
    metrics: metricSliceReducer,
    measurements: measurementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
