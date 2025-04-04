import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterParams } from '../types';
import { RootState } from './store';

type FilterParamsState = {
  filters: FilterParams
}

const initialState: FilterParamsState = {
  filters: {
    name: undefined,
    gender: undefined,
    status: undefined,
    species: undefined,
    type: undefined,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction<FilterParams>) => {
      state.filters.name =  action.payload.name;
      state.filters.gender =  action.payload.gender;
      state.filters.status =  action.payload.status;
      state.filters.species =  action.payload.species;
      state.filters.type =  action.payload.type;
    },
  },
});

export const filtersList = (state: RootState) => state.filters;

export const { addFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
