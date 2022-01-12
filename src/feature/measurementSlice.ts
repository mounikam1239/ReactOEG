/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/semi */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Measurement {
  at: number;
  metric: string;
  unit: string;
  value: number;
}
export interface MultipleMeasurement {
  measurements: Measurement[];
  metric: string,
  __typename: string
}
export interface MeasurementState {
  value: MultipleMeasurement[];
}

const initialState: MeasurementState = {
  value: [],
};

export const measurementSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    addMeasurement: (state, action: PayloadAction<MultipleMeasurement[]>) => {
      state.value = action.payload;
    },
    getSubscriptionMeasurement: (state, action: any) => {
      if (state.value.length > 0) {
        for (let i = 0; i < Object.keys(state.value).length; i += 1) {
          if (
            state.value[i].metric
            === action.payload.metric
          ) {
            state.value[i].measurements.push(action.payload);
            state.value[i].measurements.shift()
          }
        }
      }
    },
  },
});

export const { addMeasurement, getSubscriptionMeasurement } = measurementSlice.actions;

export default measurementSlice.reducer;
