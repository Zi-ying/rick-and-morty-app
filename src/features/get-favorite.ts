import type { Character } from './characters/types';

export const getFavorite = (keys: string[], item: Character) => {
  return keys.includes(item.id.toString());
};
