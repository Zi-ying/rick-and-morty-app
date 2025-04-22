import { CharacaterFilterParams } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

type CharacterFilterParamsState = {
  filters: CharacaterFilterParams;
};

const initialState: CharacterFilterParamsState = {
  filters: {
    name: '',
    gender: '',
    status: '',
    species: '',
    type: '',
  },
};

const characterFiltersSlice = createSlice({
  name: "character-filters",
  initialState,
  reducers: {
    addFilter: (
      state,
      action: PayloadAction<{
        key: keyof CharacaterFilterParams;
        value: CharacaterFilterParams[keyof CharacaterFilterParams];
      }>
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    removeOneFilter: (
      state,
      action: PayloadAction<keyof CharacaterFilterParams>
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
  characterFiltersSlice.actions;

export default characterFiltersSlice.reducer;
