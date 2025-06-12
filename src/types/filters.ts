import { CharacterFilters } from '@/features/characters/types';
import { EpisodeFilters } from '@/features/episodes/types';
import { LocationFilters } from '@/features/locations/types';

export type FilterCategory = keyof Filters;

export type Filters = {
  character: CharacterFilters;
  location: LocationFilters;
  episode: EpisodeFilters;
};
