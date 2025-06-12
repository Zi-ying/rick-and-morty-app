import type { Filters, FilterCategory } from "@/types/filters";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { EpisodeFilters } from "@/features/episodes/types";
import type { CharacterFilters } from "@/features/characters/types";
import type { LocationFilters } from "@/features/locations/types";
import type { RootState } from "./store";

type FilterState = {
  filters: Filters;
};

const initialCharacterFilters: CharacterFilters = {
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
};

const initialLocationFilters: LocationFilters = {
  name: "",
  type: "",
  dimension: "",
};

const initialEpisodeFilters: EpisodeFilters = {
  name: "",
  episode: "",
};

const initialState: FilterState = {
  filters: {
    character: initialCharacterFilters,
    location: initialLocationFilters,
    episode: initialEpisodeFilters,
  },
};

export type FilterKey<T extends FilterCategory> = T extends "character"
  ? keyof CharacterFilters
  : T extends "location"
  ? keyof LocationFilters
  : T extends "episode"
  ? keyof EpisodeFilters
  : never;

const FiltersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: <T extends FilterCategory>(
      state: FilterState,
      action: PayloadAction<{
        category: T;
        key: FilterKey<T>;
        value: string;
      }>
    ) => {
      const { category, key, value } = action.payload;
      if (category === "character") {
        (state.filters.character[key as keyof CharacterFilters] as string) =
          value;
      } else if (category === "location") {
        (state.filters.location[key as keyof LocationFilters] as string) =
          value;
      } else if (category === "episode") {
        (state.filters.episode[key as keyof EpisodeFilters] as string) = value;
      }
    },
    removeOneFilter: <T extends FilterCategory>(
      state: FilterState,
      action: PayloadAction<{
        category: T;
        key: FilterKey<T>;
      }>
    ) => {
      const { category, key } = action.payload;
      if (category === "character") {
        (state.filters.character[key as keyof CharacterFilters] as string) = "";
      } else if (category === "location") {
        (state.filters.location[key as keyof LocationFilters] as string) = "";
      } else if (category === "episode") {
        (state.filters.episode[key as keyof EpisodeFilters] as string) = "";
      }
    },
    resetFilters: (state: FilterState) => {
      state.filters = initialState.filters;
    },
  },
});

export const allFilters = (state: RootState) => state.filters.filters;

export const { addFilter, removeOneFilter, resetFilters } =
  FiltersSlice.actions;

export default FiltersSlice.reducer;
