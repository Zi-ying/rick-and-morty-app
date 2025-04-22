export type PaginationParams = {
  count: number;
  pages: number;
  next: string;
  prev: null | string;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Filters = {
  characterName: string;
  locationName: string;
  episodeName: string;
  status: string;
  species: string;
  characterType: string;
  locationType: string;
  gender: string;
  dimension: string;
  episode: string;
};

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type CharacterFilterParams = {
  name: string;
  gender: string;
  status: string;
  species: string;
  type: string;
}

export type LocationFilterParams = {
  name: string;
  dimension: string;
  type: string;
}

export type EpisodeFilterParams = {
  name: string;
  episode: string;
}
