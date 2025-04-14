import { FilterParams } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

type FilterParamsState = {
  filters: FilterParams
}

const initialState: FilterParamsState = {
  filters: {
    name: '',
    gender: '',
    status: '',
    species: '',
    type: '',
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
    removeOneFilter: (state, action: PayloadAction<keyof FilterParams> )=> {
      state.filters[action.payload] = '';
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const allFilters = (state: RootState) => state.filters.filters;

export const { addFilters, removeOneFilter, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
