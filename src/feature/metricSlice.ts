/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/semi */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MetricState {
  value: string[];
}

const initialState: MetricState = {
  value: [],
};

export const metricSlice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    addMetrics: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
  },
});

export const { addMetrics } = metricSlice.actions;

export default metricSlice.reducer;
