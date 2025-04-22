import type { Filters } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

type FilterState = {
  filters: Filters;
};

const initialState: FilterState = {
  filters: {
    characterName: '',
    locationName: '',
    episodeName: '',
    gender: '',
    status: '',
    species: '',
    characterType: '',
    locationType: '',
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
        key: keyof Filters;
        value: Filters[keyof Filters];
      }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    removeOneFilter: (
      state,
      action: PayloadAction<keyof Filters>
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
