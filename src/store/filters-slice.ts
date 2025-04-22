import type { FilterParams } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

type FilterParamsState = {
  filters: FilterParams;
};

const initialState: FilterParamsState = {
  filters: {
    name: '',
    gender: '',
    status: '',
    species: '',
    type: '',
    dimension: '',
    episode: '',
  },
};

const FiltersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: (
      state,
      action: PayloadAction<{
        key: keyof FilterParams;
        value: FilterParams[keyof FilterParams];
      }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    removeOneFilter: (
      state,
      action: PayloadAction<keyof FilterParams>
    ) => {
      state.filters[action.payload] = "";
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const allFilters = (state: RootState) => state.filters.filters;

export const { addFilter, removeOneFilter, resetFilters } =
  FiltersSlice.actions;

export default FiltersSlice.reducer;
