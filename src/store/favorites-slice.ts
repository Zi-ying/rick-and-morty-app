import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

type FavoriteState = {
  favorites: string[];
};

const initialState: FavoriteState = {
  favorites: Object.keys(localStorage),
};

const FavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (
      state,
      action: PayloadAction<{key: string; value: string}>
    ) => {
      state.favorites.push(action.payload.key);
      localStorage.setItem(action.payload.key, action.payload.value);
    },
    removeFavorite: (
      state,
      action: PayloadAction<string>
    ) => {
      state.favorites = state.favorites.filter(favorite => favorite !== action.payload );
      localStorage.removeItem(action.payload);
    },
  },
});

export const allFavorites = (state: RootState) => state.favorites.favorites;

export const { addFavorite, removeFavorite } =
  FavoritesSlice.actions;

export default FavoritesSlice.reducer;
