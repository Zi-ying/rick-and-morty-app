import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from './favorites-slice';
import filtersReducer from './filters-slice';

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Same for the `RootState` type
export type RootState = ReturnType<AppStore['getState']>

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    filters: filtersReducer,
  }
})
